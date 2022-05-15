import React from 'react';
import logo from './logo.svg';
import './App.css';
import { NewResponseForm } from './components/NewResponseForm';
import ThreadList from './components/ThreadList';
import { useThreads } from './api/useAPI';
import ThreadResponses from './components/ThreadResponses';

function App() {
  const {threads} = useThreads();
  
  return (
    <div className="toppage">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Welcome to {appConfig.bbsName}
        </p>
      </header>
      <div className='toppage-component p-3'>
        <ThreadList />
      </div>
      {threads?.map(thread => {
        return <div className='toppage-thread' key={thread.id}>
          <div className='ms-3 mt-3'>
            <span className='toppage-thread-title'>{thread.title}</span>
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

export default App;
