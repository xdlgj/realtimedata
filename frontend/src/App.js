import React from 'react';
import './App.css';
import Common from './components/common';
import Poll from './components/poll';
import LongPoll from './components/long_poll';
import WebSocket from './components/ws';
import SSE from './components/sse';

const App = () => (
  <div className="App">
        <SSE />
  </div>
);

export default App;
