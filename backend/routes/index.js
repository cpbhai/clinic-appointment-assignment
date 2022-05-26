const express = require("express");
const router = express.Router();
const sendEmail = require("../utils/email");

router.use("/send-email-meeting", (req, res) => {
  //   console.log(req.body.to, req.body.to.join(","));
  let mailOptions = {
    to: req.body.to.join(","),
    subject: "Upcoming meeting",
    html: `
        <h1>Dear ${req.body.user}<br></br>
        Meeting Link: ${req.body.meetingData.url}</h1>
      `,
  };
  sendEmail(mailOptions);
  res.status(200).json({ success: true });
});
router.use("/user", require("./user"));
router.use("/appointment", require("./appointment"));

module.exports = router;
