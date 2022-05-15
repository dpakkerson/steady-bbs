import React from "react";
import { Link, useParams } from "react-router-dom";
import { useThread } from "../api/useAPI";
import { NewResponseForm } from "../components/NewResponseForm";
import ThreadResponses from "../components/ThreadResponses";
import ThreadTitle from "../components/ThreadTitle";
import "./ThreadPage.css";

function Operations() {
  return (
    <div>
      <Link to="/">掲示板に戻る</Link>
    </div>
  );
}

function ThreadPage() {
  const { threadId: threadIdString } = useParams();
  const threadId = parseInt(threadIdString as string, 10);
  const { thread } = useThread(threadId);

  return (
    <div className="p-3 thread-page">
      <Operations />
      {thread ? <ThreadTitle title={thread.title} /> : null}
      <ThreadResponses threadId={threadId} />
      <Operations />
      <NewResponseForm threadId={threadId} />
    </div>
  );
}

export default ThreadPage;
