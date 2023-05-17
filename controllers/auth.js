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
    if (req.body.role == "staff") {
      console.log("something random");
      const userDetails = await Staff.findOne({ staff_nric: req.body.user });
      if (!userDetails) {
        return res.status(400).json({ status: "error", msg: "not authorised" });
      }
      const result = await bcrypt.compare(
        req.body.password,
        userDetails.staff_password
      );
      if (!result) {
        return res.status(401).json({ status: "error", message: "login fail" });
      } else {
        res.json(userDetails);
      }
    } else {
      console.log("another random thinggy");
      const userDetails2 = await Contacts.findOne({
        contact_phoneNumber: req.body.user,
      });
      console.log(userDetails2);
      if (!userDetails2) {
        return res.status(400).json({ status: "error", msg: "not authorised" });
      }

      const result2 = await bcrypt.compare(
        req.body.password,
        userDetails2.contact_password
      );
      if (!result2) {
        return res.status(401).json({ status: "error", message: "login fail" });
      } else {
        res.json(userDetails2);
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
