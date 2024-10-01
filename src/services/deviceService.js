const Device = require('../models/Device');
const User = require('../models/User');

//exports.getAll = () => Device.find().sort({ _id: -1}).limit(3);

exports.getAllDevices = () => Device.find();

exports.getOneById = (deviceId) => Device.findById(deviceId);

exports.getOne = (deviceId) => Device.findById(deviceId).populate('owner').populate('preferredList');

exports.getAllByPreferredList = () => Device.find().populate('preferredList');

exports.create = async (deviceData, userId) => {
    const device = await Device.create({
        owner: userId,
        ...deviceData
    })

    await User.findByIdAndUpdate(userId, {$push: { device: device._id}});

    return device;
}

exports.del = (deviceId) => Device.findByIdAndDelete(deviceId);

exports.edit = (deviceId, deviceData) => Device.findByIdAndUpdate(deviceId, deviceData, { runValidators: true });

exports.prefer = async (deviceId, userId) => {
    const device = await Device.findById(deviceId)
    const isValid = device.preferredList.some((pref) => pref?.toString() === userId);
    console.log(isValid)
    if(isValid) {
        return;
    }

    device.preferredList.push(userId);
    return device.save();
}
