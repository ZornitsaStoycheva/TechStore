const Device = require('../models/Device');

//exports.getAll = () => Device.find().sort({ _id: -1}).limit(3);

exports.getAllDevices = () => Device.find();

exports.getOne = (deviceId) => Device.findById(deviceId);

exports.create = async (deviceData) => {
    const device = await Device.create({
        
        ...deviceData
    })

    return device;
}

exports.del = (deviceId) => Device.findByIdAndDelete(deviceId);
