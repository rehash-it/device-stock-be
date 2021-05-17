const { User } = require("../models/user");
const { Device, validateDevice } = require("../models/device");

exports.getDevices = async (req, res) => {
  const devices = await Device.find().sort("id");
  res.send(devices);
};

exports.createDevice = (req, res) => {
  const { error } = validateDevice(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let device = new Device({
    device: req.body.device,
    os: req.body.os,
    manufacturer: req.body.manufacturer,
  });
  Device.nextCount(async function (err, count) {
    if (count < 11) {
      device = await device.save();
      res.send(device);
    } else {
      res.status(403).send("Maximum number of Device allowed is 10");
    }
  });
};
exports.checkDevice = async (req, res) => {
  let checkDevice = null;
  const toBeCheckedDevice = await Device.findById(req.params.id)
  if (!toBeCheckedDevice) return res.status(400).send("Device not found");

  if (req.body.isCheckedOut) {
    if (toBeCheckedDevice.isCheckedOut) return res.status(400).send("The Device has already been checked out");

    const checkedOutBy = await User.findById(req.user._id);
    if (!checkedOutBy) return res.status(400).send("Invalid User");

    const alreadyCheckedOutBy = await Device.find({ lastCheckedOutBy:checkedOutBy });
    if (alreadyCheckedOutBy) return res.status(400).send("You have already checked out another device");

    const now = new Date().getHours();
    if (now >= 3 && now <= 17) {
  
      checkDevice = {
        lastCheckedOutDate: Date.now(),
        lastCheckedOutBy: { _id: checkedOutBy._id, name: checkedOutBy.name },
        isCheckedOut: req.body.isCheckedOut,
      };
    } else {
      return res
        .status(403)
        .send(
          "You can not checkout devices other than between 9:00am and 5:00pm"
        );
    }
  } else {
    checkDevice = {
      isCheckedOut: req.body.isCheckedOut,
    };
  }

  const device = await Device.findByIdAndUpdate(req.params.id, checkDevice, {
    new: true,
  });

  if (!device)
    return res.status(404).send("The device with the given ID was not found.");

  res.send(device);
};

exports.deleteDevice = async function (req, res) {
  const device = await Device.findByIdAndRemove(req.params.id);

  if (!device)
    return res.status(404).send("The Device with the given ID was not found.");

  res.send(device);
};
