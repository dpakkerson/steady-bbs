import React from "react";
import { useThreadResponses } from "../api/useAPI";
import Response from "./Response";

type Props = {
  threadId: number;
};

export default function ThreadResponses(props: Props) {
  const { responses} = useThreadResponses(props.threadId);
  return (
    <div>
      {responses?.map(response => {
        return (
          <Response
            number={response.number}
            name={response.name}
            mail={response.mail}
            timestamp={response.postedAt}
            hashId={response.hashId}
            content={response.content}
          />
        );
      })}
    </div>
  );
}
