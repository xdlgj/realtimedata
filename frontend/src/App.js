import React from 'react';
import './App.css';
import Common from './components/common';
import Poll from './components/poll';
import LongPoll from './components/long_poll';
import WebSocket from './components/ws';

const App = () => (
  <div className="App">
    <Common />
    <Poll />
    <LongPoll />
    <WebSocket />
  </div>
);

export default App;
