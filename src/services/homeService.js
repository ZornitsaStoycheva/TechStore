const Device = require('../models/Device');

exports.home = () => Device.find().sort({ _id: -1}).limit(3);
