const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required!'],
        minLength: [2, 'Name should be 2 characters!'],
        maxLength: [20, 'Name should be 20 characters!']
    },
    email: {
        type: String,
        required: [true, 'Email is required!'],
        unique: true,
        minLength: [10, 'Email should be 10 characters!']
    },
    password: {
        type: String,
        required: [true, 'Password is required!'],
        minLength: [4, 'Password should be 4 characters!']
    }
})

userSchema.pre('save', async function() {
    const hash = await bcrypt.hash(this.password, 12);

    this.password = hash;
})

const User = mongoose.model('User', userSchema);


module.exports = User;