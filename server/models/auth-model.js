import mongoose from 'mongoose';
import sha256 from 'crypto-js/sha256.js';
import CryptoJS from 'crypto-js';

const userSchema = mongoose.Schema({
    email: {
        type: String, 
        trim: true,
        required: true,
        unique: true,
        lowercase: true
    },
    name: {
        type: String,
        required: true
    },
    gender: String,
    hashedPassword: {
        type: String,
        required: true
    },
    birthday: Object,
    salt: String,
    role: {
        type: String,
        default: 'customer'
    },
    resetPasswordLink: {
        data: String,
        default: ''
    },
    address: String,
    phone: String,
    createAt: {
        type: Date,
        default: new Date()
    },
    updateAt: {
        type: Date,
        default: new Date()
    },
    point: {
        type: Number,
        default: 0
    },
    lastLogin: {
        type: Date,
        default: new Date()
    }
});

userSchema.virtual('password')
    .set(function(password) {
        this.salt = this.makeSalt();
        this.hashedPassword = this.encryptPassword(password);
    })
    .get(function() {
        return this.hashedPassword;
    });

userSchema.methods = {
    makeSalt: function() {
        return Math.round(new Date().valueOf() * Math.random()) + '';
    },
    encryptPassword: function(password) {
        if(!password) return '';
        try {
            return sha256(password + this.salt);
        } catch (error) {
            return '';
        }
    },
    authenticate: function(plainPassword) {
        console.log(this.hashedPassword);
        console.log(this.encryptPassword(plainPassword).toString(CryptoJS.enc.Hex));
        return this.encryptPassword(plainPassword).toString(CryptoJS.enc.Hex) === this.hashedPassword;
    }
};

const Auth = mongoose.model('User', userSchema, 'users');
export default Auth;