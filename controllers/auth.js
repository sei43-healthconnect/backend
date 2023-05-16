const Staff = require("../models/Staff");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  try {
    const auth = await Staff.findOne({ staff_nric: req.body.user });
    if (auth) {
      return res
        .status(400)
        .json({ status: "error", msg: "duplicate staff Ic" });
    }

    const hash = await bcrypt.hash(req.body.password, 12);

    await Staff.create({
      staff_nric: req.body.staff_nric,
      hash,
    });

    res.json({ status: "ok", msg: "user registered" });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ status: "error", msg: "registration error" });
  }
};

const login = async (req, res) => {
  try {
    if (req.body.role == 'staff') {
      const userDetails = await Staff.findOne({ staff_nric: req.body.user });
      console.log(bcrypt.hash("password", 12))
      if (!auth) {
        return res.status(400).json({ status: "error", msg: "not authorised" });
      }
  
      const result = await bcrypt.compare(req.body.password, userDetails.password);
      if (!result) {
        return res.status(401).json({ status: "error", message: "login fail" });
      }
      res.json(userDetails)
    } else {
      const userDetails = await Contacts.findOne({ contact_patientNric: req.body.user });
      if (!auth) {
        return res.status(400).json({ status: "error", msg: "not authorised" });
      }
  
      const result = await bcrypt.compare(req.body.password, userDetails.password);
      if (!result) {
        return res.status(401).json({ status: "error", message: "login fail" });
      }
      res.json(userDetails)
    } 

  } catch (error) {
    return res.status(400).json({ status: "error", msg: "login failed" });
  }
};

module.exports = {
  // register,
  login,
};
