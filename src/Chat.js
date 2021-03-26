import { Avatar, IconButton } from '@material-ui/core'
import React, { useState , useEffect } from 'react'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import SearchIcon from '@material-ui/icons/Search';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicNoneIcon from '@material-ui/icons/MicNone';
import "./Chat.css"
import { useParams } from "react-router-dom";
import db from "./firebase";
import { useStateValue } from "./StateProvider";
import firebase from "firebase"
function Chat() {
     const [seed, setSeed] = useState("");
     const [input, setInput] = useState("");
     const {roomId} = useParams();
     const [roomName, setroomName] = useState("");
     const [messages,setMessages] = useState([]);
     const [{ user }, dispatch] = useStateValue();
     useEffect(() => {
           if(roomId){
                db.collection('rooms').doc(roomId).onSnapshot(snapshot => (
                    setroomName(snapshot.data().Name)
                ))   
                
                db.collection('rooms').doc(roomId).collection("Messages").orderBy("timestamp", "asc").onSnapshot(snapshot => (setMessages(snapshot.docs.map((doc) => doc.data()))
                ));
           } 
     }, [roomId])
     
     useEffect(() => {
        setSeed(Math.floor(Math.random()*5000));
    }, [roomId]);
     const sendMessage = (e) => {
         e.preventDefault();
         console.log("you Typed this >> " , input); 
         db.collection('rooms').doc(roomId).collection('Messages').add({
                message: input,
                Name: user.displayName,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
         })
         setInput("");
     };

    return (
        <div className="chat">
            <div className="chat__header">
            <IconButton>
               <Avatar src={`https://avatars.dicebear.com/api/avataaars/${seed}.svg`}/> 
            </IconButton>
                <div className="chat__headerInfo">
                <h3>{roomName}</h3>
                <p>
                    Last Seen{" "}{new Date(messages[messages.length-1]?.timestamp?.toDate()).toUTCString()}
                </p>
                </div>
                <div className="chat__headerRight">
                    <IconButton>
                     <SearchIcon />                   
                    </IconButton>
                    <IconButton>
                        <AttachFileIcon />
                    </IconButton> 
                    <IconButton>
                        <MoreVertIcon />     
                    </IconButton>           
                </div>
            </div>

            <div className="chat__body">
            {messages.map(message => (
              <p className={`chat__message ${message.Name === user.displayName && 'chat__reciever'}`}>
                    <span className="chat__name">{message.Name}</span>
                    {message.message}
                    <span className="chat__timestamp">
                    {new Date(message.timestamp?.toDate()).toUTCString()}
                    </span>
                </p>  
            ))}
            {/* we are going to use this from the database */}
                
            </div>
            <div className="chat__footer">
                <IconButton>
                    <InsertEmoticonIcon />
                </IconButton>
                <form >
                    <input value={input} onChange={e => setInput(e.target.value)} type="text" placeholder="Write a Message"/>
                    <button onClick={sendMessage} type="submit">Send a Message</button>
                </form>
                <IconButton>
                    <MicNoneIcon />
                </IconButton>
            </div>
        </div>
    )
}

export default Chat
