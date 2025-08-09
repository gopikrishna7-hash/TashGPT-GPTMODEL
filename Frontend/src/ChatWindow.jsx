import "./ChatWindow.css";

import Chat from "./Chat.jsx"
import { MyContext } from "./MyContext.jsx";
import {useContext,useState,useEffect} from 'react';
import {RingLoader} from 'react-spinners'


function ChatWindow(){

    const {prompt,setPrompt,reply,setReply ,currThreadId,prevChats,setprevChats,setChat}=useContext(MyContext);
    const [loading,setLoading]=useState(false);
     const [isOpen,setIsOpen]=useState(false);

    const getReply=async()=>{
        setLoading(true);
        setChat(false);
        // console.log("message:",prompt,"threadId:",currThreadId);
        const options={
             method:"POST",
             headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            message:prompt,
            threadId:currThreadId
        })
        };
        try{
            const response=await fetch(`${import.meta.env.VITE_API_URL}/api/chat`,options);
            const res=await response.json();
            // console.log(res);
            setReply(res.reply);
        }catch(err){
            req.flash("error",err.message)
        }
       setLoading(false);
    }

    //appneding new chat to prevchats
    useEffect(()=>{
        if(prompt && reply){
            setprevChats(prevChats=>(
                [...prevChats,{
                    role:"user",
                    content:prompt
                },{
                    role:"assistant",
                    content:reply
                }]
            ))
        }
        setPrompt("");
    },[reply]);

    const handleProfileclick=()=>{
        setIsOpen(!isOpen);
    }
    return (

        
        <div className="chatWindow">
            <div className="navbar">
              <span>TashGPT <i className="fa-solid fa-chevron-down"></i></span>  
              <div className="userIcon" onClick={handleProfileclick}
              >
                <span className="userIcons"><i className="fa-solid fa-user-tie"></i></span>
              </div>
            </div>
            {
                isOpen &&
                <div className="dropDown">
                    <div className="dropDown-item"><i className="fa-solid fa-gear"></i>settings</div>
                    <div className="dropDown-item"><i className="fa-solid fa-arrow-up-from-bracket"></i>Upgrade plan</div>
                    
                    <div className="dropDown-item"><i className="fa-solid fa-arrow-right-from-bracket"></i>Log out</div>
                    <div className="dropDown-item">About</div>
                </div>
            }
            <Chat></Chat>

            <RingLoader loading={loading} color="#90ee90">

            </RingLoader>
            <div className="chatInput">
                <div className="inputBox">
                    <input placeholder="Ask for anything" 
                    value={prompt}
                    onChange={(e)=> setPrompt(e.target.value)}
                    onKeyDown={(e)=>e.key==='Enter'? getReply() :''}
                     ></input>
                    <div className="submit" onClick={getReply}>
                            <i className="fa-solid fa-paper-plane"></i>
                    </div>
                </div>
                <p className="info">
                    TashGPT can also make mistake.Check important info.See Cookie Preferences.</p>
            </div>
        </div>
    
    )
}

export default ChatWindow;