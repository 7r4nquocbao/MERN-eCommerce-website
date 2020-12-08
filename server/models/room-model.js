import mongoose from 'mongoose';

const roomSchema = mongoose.Schema({
    roomId: String,
    name: String,
    createAt : {
        type: Date,
        default: new Date()
    }
});

const Room = mongoose.model('Room', roomSchema, 'rooms');
export default Room;