const mongoose = require('mongoose');

const deviceSchema = mongoose.Schema({
    brand: {
        type: String,
        required: [true, 'Brand is required!'],
        minLength: [2, 'Brand should be 2 characters!']
    },
    model: {
        type: String,
        required: [true, 'Model is required!'],
        minLength: [5, 'Model should be 5 characters!']
    },
    hardDisk: {
        type: String,
        required: [true, 'Hard disk is required!'],
        minLength: [5, 'Hard disk should be 5 characters!']
    },
    screenSize: {
        type: String,
        required: [true, 'Screen size is required!'],
        minLength: [1, 'Screen size should be 1 characters!']
    },
    ram: {
        type: String,
        required: [true, 'Ram is required!'],
        minLength: [2, 'Ram should be 2 characters!']
    },
    operatingSystem: {
        type: String,
        required: [true, 'Operating system is required!'],
        minLength: [5, 'Operating system should be 5 characters!'],
        maxLength: [50, 'Operating system should be 10 characters!']
    },
    cpu: {
        type: String,
        required: [true, 'Cpu is required!'],
        minLength: [5, 'Cpu should be 5 characters!'],
        maxLength: [50, 'Cpu should be 10 characters!']
    },
    gpu: {
        type: String,
        required: [true, 'Gpu is required!'],
        minLength: [5, 'Gpu should be 5 characters!'],
        maxLength: [10, 'Gpu should be 10 characters!']
    },
    price: {
        type: Number,
        required: true,
        minValue: 0
    },
    color: {
        type: String,
        required: [true, 'Color is required!'],
        minLength: [2, 'Color should be 2 characters!'],
        maxLength: [10, 'Color should be 10 characters!']
    },
    weight: {
        type: String,
        required: [true, 'Weight is required!'],
        minLength: [1, 'Weight should be 1 characters!'],
    },
    image: {
        type: String,
        required: true,
        validate: /^https?:\/\//i
    },
    preferredList: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
})

const Devices = mongoose.model('Devices', deviceSchema);

module.exports = Devices;