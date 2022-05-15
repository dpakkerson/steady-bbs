import React from "react";
import { useThread } from "../api/useAPI";
import { NewResponseForm } from "./NewResponseForm";
import './Thread.css';
import ThreadResponses from "./ThreadResponses";

type Props = {
    threadId: number;
};

export default function Thread(props: Props) {
  const {threadId} = props;
  const {thread} = useThread(threadId);

  return <div>
    {thread && (
      <span className='thread-title ms-3 mt-3'>{thread.title}</span>
    )}
    <ThreadResponses threadId={threadId} />
    <NewResponseForm threadId={threadId} />
  </div>
}