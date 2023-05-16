const Staff = require("../models/Staff");
const Contacts = require("../models/Contacts");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  try {
    const hash = await bcrypt.hash(req.body.password, 12);

    await Staff.updateOne(
    { staff_nric: req.body.user },
    { staff_password: hash }
    );

    res.json({ status: "ok", msg: "password updated" });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ status: "error", msg: "password updated" });
  }
};

const login = async (req, res) => {
  try {
    if (req.body.role == 'staff') {
      console.log('a')
      const userDetails = await Staff.findOne({ staff_nric: req.body.user });
      if (!userDetails) {
        return res.status(400).json({ status: "error", msg: "not authorised" });
      }
      const result = await bcrypt.compare(req.body.password, userDetails.staff_password);
      if (!result) {
        return res.status(401).json({ status: "error", message: "login fail" });
      } else {
        res.json(userDetails)
      }
    } else {
      const userDetails = await Contacts.findOne({ contact_patientNric: req.body.user });
      if (!auth) {
        return res.status(400).json({ status: "error", msg: "not authorised" });
      }
  
      const result = await bcrypt.compare(req.body.password, userDetails.contact_password);
      if (!result) {
        return res.status(401).json({ status: "error", message: "login fail" });
      } else {
        res.json(userDetails)
      }
    } 

  } catch (error) {
    return res.status(400).json({ status: "error", msg: "login fail" });
  }
};

module.exports = {
  register,
  login,
};
