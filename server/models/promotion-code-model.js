import mongoose from 'mongoose';

const promotionSchema = mongoose.Schema({
    code: {
        type: String,
        max: 6
    },
    startDate: Date,
    endDate: Date,
    description: String,
    discount: Number
});

const Promotion = mongoose.model('Promotion', promotionSchema, 'promotion-codes');
export default Promotion;