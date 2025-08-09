import {useState} from 'react';
import Sidebar from './Sidebar';
import ChatWindow from "./ChatWindow";
import Chat from "./Chat.jsx";
import { MyContext } from './MyContext.jsx';
import "./App.css";
import {v1 as uuidv1} from "uuid";

function App() {
    const [prompt,setPrompt]=useState("");
    const[reply,setReply]=useState(null);
    const [currThreadId,setCurrThreadId]=useState(uuidv1());
    const [prevChats,setprevChats]=useState([]); //stores all prev threads
    const [newChat,setChat]=useState(true);
    const [allThreads,setallThreads]=useState([]);
    
     const providerValues={
        prompt,setPrompt,
        reply,setReply,
        currThreadId,setCurrThreadId,
        newChat,setChat,
        prevChats,setprevChats,
        allThreads,setallThreads

     };

  return (
     
      <div className="app">
          <MyContext.Provider value={providerValues}>
                  <Sidebar></Sidebar>
                  <ChatWindow></ChatWindow>
          </MyContext.Provider>
      </div>
  )
}

export default App
