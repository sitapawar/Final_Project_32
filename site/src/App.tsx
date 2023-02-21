import React from 'react';
// import Terminal from './Terminal'
import './styles/App.css';
import ReactDOM from "react-dom";
import {NavBar} from './components/NavBar';
import MyRouter from './components/MyRouter';

function App() {
  return (
    <div className="App">
      <NavBar/>
      <MyRouter/>
    </div>
  );
}

export default App;

