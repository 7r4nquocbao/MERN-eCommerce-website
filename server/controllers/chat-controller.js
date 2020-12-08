import Message from '../models/message-model.js';
import mongoose from 'mongoose';
import Room from '../models/room-model.js';
import Product from '../models/product-model.js';

export const getMessage = async (req, res) => {
    const { roomId } = req.params;
    console.log(roomId);
    try {
        const messages = await Message.find({ roomId: roomId });
        res.status(200).json(messages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createMessage = async (req, res) => {
    const message = req.body;
    console.log(message);
    const newMessage = new Message(message);
    try {
        await newMessage.save();
        res.status(201).json(message);   
    } catch (error) {
        console.log(error.message);
        res.status(409).json({ message: error.message });
    }
}

export const createRoom = async (req, res) => {
    const { roomId, name } = req.body;
    const newRoom = new Room({ roomId, name });
    try {
        await newRoom.save();
        res.status(201).json({ roomId, name });   
    } catch (error) {
        console.log(error.message);
        res.status(409).json({ message: error.message });
    }
}

export const getRooms = async (req, res) => {
    try {
        const rooms = await Room.find();
        res.status(200).json(rooms);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

