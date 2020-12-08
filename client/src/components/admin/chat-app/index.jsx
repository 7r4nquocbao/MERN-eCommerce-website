import { Button, Paper } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import io from 'socket.io-client';
import { createMessage, fetchChat, getRooms } from '../../../api';
import './style.scss';


const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
  }));

const socket = io.connect();
function ChatApp(props) {

    const classes = useStyles();
    const [selectedIndex, setSelectedIndex] = React.useState(null);
    const handleListItemClick = (event, index, id) => {
        getChat(id);
        setSelectedIndex(index);
    };

    const dispatch = useDispatch();

    const [rooms, setRooms] = useState([]);
    const [chat, setChat] = useState([]);
    const [message, setMessage] = useState({
        roomId: '',
        name: '',
        content: '',
        role: 'admin'
    })


    // useEffect(async () => {
    //     const result = await dispatch(fetchChatData(roomId));
    //     const data = unwrapResult(result);
    //     setChat(data);
    // }, [])

    useEffect(() => {
        getRooms().then(res => {
            setRooms(res.data);
        }).catch(err => {
            console.log(err);
        })
    }, [])

    useEffect(() => {
        socket.on('message', (message) => {
            setChat([...chat, message]);
        })
    })


    const getChat = (id) => {
        fetchChat(id).then(res => {
            setMessage({...message, roomId: id});
            setChat(res.data);
        }).catch(err => {
            console.log(err);
        })
    }

    const displayChat = () => {
       return rooms && rooms.map((item, index) => {
            return (
                <div>
                    <ListItem
                        key={index}
                        button
                        selected={selectedIndex === index+1}
                        onClick={(event) => handleListItemClick(event, index+1, item.roomId)}
                    >
                        <div className="pt-2 pl-4">
                            <h4>{item.name}</h4>
                        </div>
                       
                    </ListItem>
                    <Divider/>
                </div>
            )
       })
    }

    const sendMessage = () => {
        console.log(message);
        createMessage(message).then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err);
        })
        socket.emit('message', message);
        setMessage({...message, content: ''});
    }

    const displayMessages = () => {
        return chat && chat.map((item, index) => {
            return (
                <div key={index} className={`message-item ${item.role === 'admin' ? 'admin' : 'customer'}`}>
                    <p>{item.content}</p>
                </div>
            )
       })
    }

    const displayControl = () => {
        if(chat.length > 0) {
            return (
                <div className="input-group">
                    <input type="text" className="form-control" placeholder="Type your message" 
                        onChange={(e) => setMessage({...message, content: e.target.value})}
                        value={message.content}
                    />
                    <div className="input-group-prepend">
                        <Button variant="contained" color="secondary" onClick={() => sendMessage()}>Send</Button>
                    </div>
                </div>
            )
        } else {

        }      
    }

    return (
        <div className="container chat-container">
            <div className="row">
                <div className="col-4 chat-box overflow-auto p-0 m-0 pr-1 bg-light">
                    <List component="nav" className="p-0 m-0">
                        {displayChat()}
                    </List>
                </div>
                <div className="col-8 p-0 m-0">
                    <div className="chat-box overflow-auto pt-3 pl-3">
                        {displayMessages()}
                    </div>
                    {displayControl()}
                </div>
            </div>
        </div>
    );
}

export default ChatApp;