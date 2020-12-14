import mongoose from 'mongoose';
import Comment from '../models/comment-model.js';

export const createComment = async (req, res) => {
    const data = req.body;
    const checkExists = await Comment.find({ idProduct: data.idProduct, idUser: data.idUser });
    try {
        if(checkExists) {
            await Comment.findByIdAndUpdate(checkExists._id, data, { new: true })
        } else {
            const newComment = new Comment(data);
            await newComment.save();
        }
        res.status(200).json('added');
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}