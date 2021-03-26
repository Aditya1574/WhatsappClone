import React, {useState, useEffect} from "react"
import {Avatar, IconButton} from "@material-ui/core";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import SearchIcon from '@material-ui/icons/Search';
import "./Sidebar.css"
import SidebarChat from "./SidebarChat";
import { useStateValue } from "./StateProvider"
import db from "./firebase"
function Sidebar() {
    const [rooms, setRooms] = useState([]);

    const unsubscribe = useEffect(() => {
        db.collection('rooms').onSnapshot(snapshot => (
            setRooms(snapshot.docs.map(doc =>
            ({
                id: doc.id,
                data: doc.data(),
            })
            ))
        )
    );
    return () =>{
        unsubscribe();
    }

    }, []);
    const [{user} , dispatch]  = useStateValue();     
    return (
        <div className="sidebar">
        <div className="sidebar__header">
        <IconButton>
            <Avatar src = {user?.photoURL}/>
        </IconButton>
        <div className="sidebar__headerRight">
        <IconButton>
         <DonutLargeIcon />   
        </IconButton>
        <IconButton>
        <ChatIcon />   
        </IconButton>
        <IconButton>
        <MoreVertIcon />  
        </IconButton>
        </div>
        </div>
        <div className="sidebar__search">
        <div className="sidebar__searchContainer">
        <SearchIcon />
        <input placeholder="Search or start new Chat" type="text" />    
        </div>
        
        </div>
        <div className="sidebar__chats">
        <SidebarChat addNewChat />
        {rooms.map(room => (
            <SidebarChat key={room.id} id={room.id} 
            Name={room.data.Name} />
        ))}
        </div>
        </div>
    )
}

export default Sidebar
