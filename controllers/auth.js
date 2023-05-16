const Staff = require("../models/Staff");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  try {
    const auth = await Staff.findOne({ staff_nric: req.body.staff_nric });
    if (auth) {
      return res
        .status(400)
        .json({ status: "error", msg: "duplicate staff Ic" });
    }

    const hash = await bcrypt.hash(req.body.staff_password, 12);

    await Auth.create({
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
    const auth = await Auth.findOne({ staff_nric: req.body.staff_nric });
    if (!auth) {
      return res.status(400).json({ status: "error", msg: "not authorised" });
    }

    const result = await bcrypt.compare(req.body.staff_password, auth.hash);
    if (!result) {
      return res.status(401).json({ status: "error", message: "login fail" });
    }

    const payload = {
      staff_nric: auth.staff_nric,
    };
  } catch (error) {
    return res.status(400).json({ status: "error", msg: "login failed" });
  }
};

module.exports = {
  register,
  login,
};
