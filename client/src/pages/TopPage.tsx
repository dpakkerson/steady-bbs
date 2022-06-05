import React from 'react';
import logo from '../logo.svg';
import './TopPage.css';
import { NewResponseForm } from '../components/NewResponseForm';
import ThreadList from '../components/ThreadList';
import { useLocalRule, useThreads } from '../api/useAPI';
import ThreadResponses from '../components/ThreadResponses';
import ThreadTitle from '../components/ThreadTitle';

function TopPage() {
  const {threads} = useThreads();
  const {localRule} = useLocalRule();
  
  return (
    <div className="toppage">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Welcome to {appConfig.bbsName}
        </p>
      </header>
      <div className='toppage-component p-3' dangerouslySetInnerHTML={{__html: localRule ?? ''}} />
      <div className='toppage-component p-3'>
        <ThreadList />
      </div>
      {threads?.map(thread => {
        return <div className='toppage-thread' key={thread.id}>
          <div className='m-3'>
            <ThreadTitle title={thread.title} />
          </div>
          <ThreadResponses threadId={thread.id} />
          <NewResponseForm threadId={thread.id} />
        </div>
      })}
      <div className="toppage-component">
        <NewResponseForm />
      </div>
    </div>
  );
}

export default TopPage;
