import React from "react";
import { useThreads } from "../api/useAPI";

type Props = {
    maxThreadCount?: number;
};

export default function ThreadList(props: Props) {
  const {threads} = useThreads();
  return <div>
    {threads?.map(thread => {
      return <div>{thread.title}</div>
    })}
  </div>
}