import React, {useState, useEffect} from 'react'
import './SidebarChat.css'
import { Avatar } from "@material-ui/core"
import db from "./firebase"
import { Link } from 'react-router-dom';
function SidebarChat({id, Name, addNewChat }) {
    const [seed, setSeed] = useState('');
    const [message,setMessages] = useState(""); 
    useEffect(() => {
        setSeed(Math.floor(Math.random()*1000));
    }, [])

    const createChat = () => {
        const roomName = prompt("Please enter the Chat name 🙏");

        if(roomName){
            db.collection('rooms').add({
                Name: roomName,
            })
        }
    };
    useEffect(() => {
        if(id) {
            db.collection('rooms').doc(id).collection('Messages').orderBy('timestamp', 'desc').onSnapshot((snapshot) => (
            setMessages(snapshot.docs.map((doc) => doc.data()))
            ))
        }
    }, [id]);
    return !addNewChat ? (
        <Link to={`/rooms/${id}`}>
        <div className="sidebarChat">
                    <Avatar src={`https://avatars.dicebear.com/api/avataaars/${seed}.svg`} />
                    <div className="sidebarchat__info">
                    <h3>{Name}</h3>
                    <p>{message[0]?.message.slice(0,16)}</p>
                    </div>
                </div>  
        </Link> 
    ) : (
        <div onClick={createChat} className="sidebarChat">
            <h2>Add new Chat</h2>
        </div>
    )
}

export default SidebarChat
