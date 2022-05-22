const appointmentModel = require("../models/appointment");

exports.create = async (req, res) => {
  try {
    req.body.createdBy = req.user._id;
    const appointment = await appointmentModel.create(req.body);

    res.status(201).json({
      success: true,
      data: appointment,
      message: "Appointment Scheduled Successfully",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.get = async (req, res) => {
  try {
    const appointments = await appointmentModel
      .find({
        createdBy: req.user._id,
      })
      .sort({ datetime: -1 });

    res.status(200).json({
      success: true,
      data: appointments,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
