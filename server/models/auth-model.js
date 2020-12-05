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
    _password: {
        type: String,
        required: true
    },
    hashedPassword: {
        type: String,
        required: true
    },
    salt: String,
    role: {
        type: String,
        default: 'Customer'
    },
    resetPasswordLink: {
        data: String,
        default: ''
    },
    createAt: {
        type: Date,
        default: new Date()
    },
    updateAt: {
        type: Date,
        default: new Date()
    }
});

userSchema.virtual('password')
    .set(function(password) {
        this._password = password;
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
        return this.encryptPassword(plainPassword).toString(CryptoJS.enc.Hex) === this.hashedPassword;
    }
};

const Auth = mongoose.model('User', userSchema, 'users');
export default Auth;