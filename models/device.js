const Joi = require("joi");
const mongoose = require("mongoose");
const userSchema = require("../models/user");
const autoIncrement = require("mongoose-auto-increment");
Joi.objectId = require('joi-objectid')(Joi)

const deviceSchema = new mongoose.Schema({
  device: {
    type: String,
    required: true,
  },
  os: {
    type: String,
    required: true,
  },
  manufacturer: {
    type: String,
    required: true,
  },
  lastCheckedOutDate: {
    type: Date,
  },
  lastCheckedOutBy: {
    type: userSchema,
  },
  isCheckedOut: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
autoIncrement.initialize(mongoose.connection);
deviceSchema.plugin(autoIncrement.plugin, {
  model: "Device",
  field: "id",
  startAt: 1,
  incrementBy: 1,
});
const Device = mongoose.model("Device", deviceSchema);



function validateDevice(device) {
  const schema = Joi.object({
    device: Joi.string().required(),
    os: Joi.string().required(),
    manufacturer: Joi.string().required(),
    lastCheckedOutDate: Joi.string(),
    lastCheckedOutBy: Joi.objectId(),
    isCheckedOut: Joi.boolean(),
  });
  const validation = schema.validate(device);
  return validation;
}

exports.Device = Device;
exports.validateDevice = validateDevice;
