import React from "react";
import { Link } from "react-router-dom";
import { useThreads } from "../api/useAPI";

type Props = {
    maxThreadCount?: number;
};

export default function ThreadList(props: Props) {
  const {threads} = useThreads();
  return <div>
    {threads?.map(thread => {
      return <Link to={`/threads/${thread.id}`} className='ms-3' key={thread.id}>{thread.title}</Link>
    })}
  </div>
}