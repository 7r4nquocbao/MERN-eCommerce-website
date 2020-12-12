import mongoose from 'mongoose';

const commentSchema = mongoose.Schema({
    idProduct: String,
    star: Number,
    content: String,
    createAt : {
        type: Date,
        default: new Date()
    },
    idUser : String
});

const Comment = mongoose.model('Comment', commentSchema, 'comments');
export default Comment;