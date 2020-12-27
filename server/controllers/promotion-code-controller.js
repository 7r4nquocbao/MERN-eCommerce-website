import Promotion from '../models/promotion-code-model.js';
import mongoose from 'mongoose';

export const getCodes = async (req, res) => {
    try {
        const codes = await Promotion.find();
        res.status(200).json(codes);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createUpdatePromotion = async (req, res) => {
    const code = req.body;
    const newCode = new Promotion({
        code: code.code,
        startDate: code.startDate,
        endDate: code.endDate,
        description: code.description,
        discount: code.discount
    });

    Promotion.findOne({code: code.code}).exec((err, data) => {
        if(err || !data) {
            Promotion.findByIdAndUpdate(code._id, code, { new: true }).exec((err, data) => {
                if(err || !data) {
                    newCode.save();
                    res.status(200).json(code);
                } else {
                    res.status(200).json(data);
                }
            })
        } else {

        }
    })

    // Promotion.findByIdAndUpdate(code._id, code, { new: true }).exec((err, data) => {
    //     if(err || !data) {
    //         try {
    //             Promotion.find({code: code.code}).exec((err,data) => {
    //                 if(data.length > 0) {
    //                     res.status(400).json('Code has existed');
    //                 } else {
    //                     newCode.save();
    //                     res.status(200).json(newCode);
    //                 }
    //             });
    //         } catch (error) {
    //             res.status(400).json(error);
    //         }
    //     } else {
    //         res.status(200).json(data);
    //     }
    // })
}
