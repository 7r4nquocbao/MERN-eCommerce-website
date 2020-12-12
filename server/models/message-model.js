import mongoose from 'mongoose';

const messageSchema = mongoose.Schema({
    roomId: String,
    content: String,
    role: {
        type: String,
        default: 'customer'
    },
    createAt : {
        type: Date,
        default: new Date()
    }
});

const Message = mongoose.model('Message', messageSchema, 'messages');
export default Message;