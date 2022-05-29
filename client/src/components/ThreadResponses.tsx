import React from "react";
import { useThreadResponses } from "../api/useAPI";
import { LoadingIndicator } from "./LoadingIndicator";
import Response from "./Response";

type Props = {
  threadId: number;
  responseQuery?: string;
};

export default function ThreadResponses(props: Props) {
  const {responses, loading} = useThreadResponses(props.threadId);
  const responseFilter = parseResponseQuery(props.responseQuery, responses?.length ?? 0);
  return (
    <div className="m-3">
      {responses?.filter(response => responseFilter(response.number)).map(response => {
        return (
          <Response
            key={response.number}
            number={response.number}
            name={response.name}
            mail={response.mail}
            timestamp={new Date(response.postedAt)}
            hashId={response.hashId}
            content={response.content}
            threadId={props.threadId}
          />
        );
      })}
      {loading ? <LoadingIndicator /> : null}
    </div>
  );
}

function parseResponseQuery(responseQuery: string | undefined, responseCount: number): (responseNumber: number) => boolean {
  if (!responseQuery) {
    return () => true;
  }
  const lastXMatch = responseQuery.match(/l(\d+)/)
  if (lastXMatch) {
    const length = parseInt(lastXMatch[1], 10);
    return responseNumber => responseNumber > responseCount - length;
  }
  const rangeMatch = responseQuery.match(/(\d*)-(\d*)/)
  if (rangeMatch) {
    const fromString = rangeMatch[1];
    const toString = rangeMatch[2];
    const from = fromString.length > 0 ? parseInt(fromString, 10) : -1;
    const to = toString.length > 0 ? parseInt(toString, 10) : responseCount;
    return responseNumber => from <= responseNumber && responseNumber <= to;
  }
  const singleMatch = responseQuery.match(/\d+/);
  if (singleMatch) {
    const index = parseInt(singleMatch[0], 10);
    return responseNumber => responseNumber === index;
  }

  return () => true;
}