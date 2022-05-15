import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Thread from '../components/Thread';
import './ThreadPage.css';

function Operations() {
  return <div>
      <Link to='/'>掲示板に戻る</Link>
  </div>
}

function ThreadPage() {
  const {threadId: threadIdString} = useParams();
  const threadId = parseInt(threadIdString as string, 10);
  
  return (
    <div className="p-3 thread-page">
      <Operations />
      <Thread threadId={threadId} />
      <Operations />
    </div>
  );
}

export default ThreadPage;
