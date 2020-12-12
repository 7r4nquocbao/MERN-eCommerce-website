import { TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import { unwrapResult } from '@reduxjs/toolkit';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChatData } from '../../../slices/chatbox-slice';
import { v4 as uuidv4 } from 'uuid';
import './style.scss'
import { createMessage, createRoom } from '../../../api';
import io from 'socket.io-client';

const socket = io.connect();

function ChatBox(props) {

    const dispatch = useDispatch();

    const [chat, setChat] = useState([]);
    const [message, setMessage] = useState({
        roomId: '',
        name: '',
        content: '',
        role: 'customer'
    });

    useEffect(async () => {
        const roomId = localStorage.getItem('roomId');
        const chatName = localStorage.getItem('chatName');
        if(roomId && chatName) {
            const result = await dispatch(fetchChatData(roomId));
            const data = unwrapResult(result);
            setChat(data);
            setMessage({...message, roomId: roomId, name: chatName});
        } else {

        }
    }, []);

    useEffect(() => {
        socket.on('message', (message) => {
            setChat([...chat, message]);
            console.log("aaaaa");
        })
    })

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [open, setOpen] = React.useState(false);

    const handleClick = () => (event) => {
        setAnchorEl(event.currentTarget);
        console.log(event.currentTarget);
        setOpen(!open);
    };

    const createChatroom = () => {
        let roomId = uuidv4();
        localStorage.setItem('roomId', roomId);
        localStorage.setItem('chatName', message.name);
        setMessage({...message, roomId: roomId});
        createRoom({roomId: roomId, name: message.name});
    }

    const displayMessages = () => {
        const roomId = localStorage.getItem('roomId');
        const chatName = localStorage.getItem('chatName');
        if(roomId && chatName) {
            console.log(typeof(chat))
            return (
                chat && chat.map((item, index) => {
                    return (
                        <div key={index}>
                            <p><b>{chatName}</b>: {item.content}</p>
                        </div>
                    )
                })
            )
           
        } else {
            return (
                <div className="d-flex align-items-center pt-5 flex-column">
                    <div className="d-block">
                        <TextField label="Type your name" onChange={(e) => setMessage({...message, name: e.target.value})}/>
                    </div>
                    <div className="d-block pt-2">
                        <Button variant="contained" color="secondary" onClick={() => createChatroom()}>
                            Start conv.
                        </Button>
                    </div>
                </div>
            )
        }
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

    const clearChat = () => {
        localStorage.removeItem('roomId');
        localStorage.removeItem('chatName');
        setChat([]);
    }

    const displayTopNav = () => {
        if(chat === []) {
            return;
        } else {
            return (
                <div className="d-flex justify-content-between align-items-center bg-danger p-2">
                    <h5 className="pt-2 text-white">Online support</h5>
                    <a onClick={() => clearChat()} className="btn btn-sm btn-light">Delete conv.</a>
                </div>
            )
        }
    }

    const displayFormControl = () => {
        const roomId = localStorage.getItem('roomId');
        const chatName = localStorage.getItem('chatName');
        if(roomId, chatName) {
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
        <div className="message-popper">
            <Popper open={open} anchorEl={anchorEl} placement='left-end' transition>
                {({ TransitionProps }) => (
                <Fade {...TransitionProps} timeout={350}>
                    <Paper>
                        {displayTopNav()}
                        <div className="m-0 p-0" style={{width: '350px', height: '400px', overflow:'auto'}}>
                            {displayMessages()}
                        </div>
                        {displayFormControl()}
                    </Paper>
                </Fade>
                )}
            </Popper>
            <img onClick={handleClick()}
                style={{cursor: 'pointer', width: '4rem'}}
                src="https://facebookbrand.com/wp-content/uploads/2020/10/Logo_Messenger_NewBlurple-399x399-1.png?w=399&h=399"
            />
        </div>
    );
}

export default ChatBox;