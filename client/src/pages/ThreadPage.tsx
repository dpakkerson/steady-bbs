import React from "react";
import { Link, useParams } from "react-router-dom";
import { useThread } from "../api/useAPI";
import { NewResponseForm } from "../components/NewResponseForm";
import ThreadResponses from "../components/ThreadResponses";
import ThreadTitle from "../components/ThreadTitle";
import "./ThreadPage.css";

function Operations(props: {threadId: number}) {
  return (
    <div>
      <Link className="me-2" to="/">掲示板に戻る</Link>
      <Link className="me-2" to={`/threads/${props.threadId}`}>全部</Link>
      <Link className="me-2" to={`/threads/${props.threadId}/l50`}>最新50</Link>

    </div>
  );
}

function ThreadPage() {
  const { threadId: threadIdString, responseQuery } = useParams();
  const threadId = parseInt(threadIdString as string, 10);
  const { thread } = useThread(threadId);

  return (
    <div className="p-3 thread-page">
      <Operations threadId={threadId}/>
      {thread ? <ThreadTitle title={thread.title} /> : null}
      <ThreadResponses threadId={threadId} responseQuery={responseQuery} />
      <Operations threadId={threadId}/>
      <NewResponseForm threadId={threadId} />
    </div>
  );
}

export default ThreadPage;
