import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import {CookiesProvider} from 'react-cookie';

import ChatRoom from './components/ChatRoom';
import Chat from './components/Chat';
import History from './components/History';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


function Router(){

  return (

  <CookiesProvider>

  <BrowserRouter>
    <Routes>
      <Route path = "/" element = {<App/>}/>
      <Route path = "/chat" element = {<Chat/>}/>
      <Route path = "/Room" element = {<ChatRoom/>}/>
      <Route path = "/History" element = {<History/>}/>
    </Routes>
  </BrowserRouter>

  </CookiesProvider> 

  )
}


ReactDOM.render(
  <React.StrictMode>
    <Router/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
