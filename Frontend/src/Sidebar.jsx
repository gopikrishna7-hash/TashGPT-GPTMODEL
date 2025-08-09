import "./Sidebar.css"

import { useContext,useEffect } from "react";
import {MyContext} from "./MyContext.jsx";
import {v1 as uuidv1} from "uuid";



function Sidebar(){
    const {allThreads,setallThreads,currThreadId,setChat,setPrompt,setReply,setCurrThreadId,setprevChats}=useContext(MyContext);
    const API_BASE=process.env.REACT_APP_API_URL;
    const getallThreads=async ()=>{
        try{
            const response =await fetch(`${API_BASE}/api/thread`);
            const res=await response.json();
            const filterData=res.map(thread=>({threadId:thread.threadId,title:thread.title}));
            // console.log(res);
            setallThreads(filterData);
        }catch(err){
            console.log(err);
        }

    };
    useEffect(()=>{
        getallThreads();
        
    },[currThreadId]);
    const createNewchat=()=>{
        setChat(true);
        setPrompt("");
        setReply(null);
        setCurrThreadId(uuidv1);
        setprevChats([]);
    }

    const changeThread=async(newThreadId)=>{
        setCurrThreadId(newThreadId);
        try{
                const response=await fetch(`${API_BASE}/api/thread/${newThreadId}`);
                const res=await response.json();
                // console.log(res);
                setprevChats(res);
                setChat(false);
                setReply(null);
        }catch(err){
            console.log(err);
        }
    }
     const deleteThread=async(threadId)=>{
            try{
                const response=await fetch(`${API_BASE}/${threadId}`,{method:"DELETE"});
                const res=await response.json();
                console.log(res);
                setallThreads(prev=>prev.filter(thread=>thread.threadId!==threadId));

                if(threadId===currThreadId){
                    createNewchat();
                }
            }catch(err){
                    console.log(err);
            }
    }

    return (
    
        <section className="sidebar">
            <button onClick={createNewchat}>
                <img src="src/assets/blacklogo.png" alt="gpt logo" className="logo"/>
                <span><i><i className="fa-regular fa-pen-to-square"></i></i>
                    </span>
            </button>

            <ul className="history">
                {
                    allThreads?.map((thread,idx)=>(
                        <li key={idx}
                         onClick={(e)=>changeThread(thread.threadId)}
                          className={thread.threadId===currThreadId?"highlighted":""}>
                            {thread.title}
                            <i className="fa-regular fa-trash-can"
                                onClick={(e)=>{
                                    e.stopPropagation();//event bubling
                                    deleteThread(thread.threadId);
                                }}
                                ></i>
                        </li>
                    ))
                }
                  
            </ul>

            <div className="sign">
                    <p>Sign Up &hearts;</p>
            </div>
        </section>

    
    )

}

export default Sidebar;
