import mongoose from 'mongoose';
import Comment from '../models/comment-model.js';

export const createComment = async (req, res) => {
    const comment = req.body;
    console.log(comment);
    const newComment = new Comment(comment);
    const checkComment = await Comment.findOne({ idProduct: comment.idProduct, idUser: comment.idUser });
    try {
        if (checkComment) {
            await Comment.findByIdAndUpdate( checkComment._id , comment, { new: true } );
            res.status(201).json(await Comment.find());
        }
        else {
            await newComment.save();
            res.status(201).json(await Comment.find());
        }        
    } catch (error) {
        console.log(error.message);
        res.status(409).json({ message: error.message });
    }
}

export const getCommments = async (req, res) => {
    const {id} = req.params;
    console.log(id);
    await Comment.find({ idProduct: id }).exec((err, data) => {
        if(err || !data) {
            res.status(404).json(err);
        } else {
            res.status(200).json(data);
        }
    })

}