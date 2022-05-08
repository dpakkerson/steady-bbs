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
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Base URL: {appConfig.publicUrl}
        </p>
      </header>
      <NewResponseForm />
      <ThreadList />
      {threads?.map(thread => {
        return <div>
          <ThreadResponses threadId={thread.id} />
          <NewResponseForm threadId={thread.id} />
        </div>
      })}
    </div>
  );
}

export default App;
