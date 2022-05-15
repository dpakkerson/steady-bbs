import React from "react";
import { useThreadResponses } from "../api/useAPI";
import Response from "./Response";

type Props = {
  threadId: number;
};

export default function ThreadResponses(props: Props) {
  const { responses} = useThreadResponses(props.threadId);
  return (
    <div className="m-3">
      {responses?.map(response => {
        return (
          <Response
            key={response.number}
            number={response.number}
            name={response.name}
            mail={response.mail}
            timestamp={new Date(response.postedAt)}
            hashId={response.hashId}
            content={response.content}
          />
        );
      })}
    </div>
  );
}
