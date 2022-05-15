import React from "react";
import { useThreads } from "../api/useAPI";

type Props = {
    maxThreadCount?: number;
};

export default function ThreadList(props: Props) {
  const {threads} = useThreads();
  return <div>
    {threads?.map(thread => {
      return <span className='ms-3' key={thread.id}>{thread.title}</span>
    })}
  </div>
}