const { validationResult } = require("express-validator");
const Staff = require("../models/Staff");

// GET : retrieve all staff from the DB
const getStaff = async (req, res) => {
  const allStaff = await Staff.find();
  res.json(allStaff);
};

// POST : retrieve one staff from the DB, based id
const postStaffById = async (req, res) => {
  const staff = await Staff.findById(req.body.id);
  res.json(staff);
};

// POST : retrieve one staff from the DB, based on his NRIC
const postStaffByNric = async (req, res) => {
  const patient = await Staff.findOne({
    staff_nric: req.body.staff_nric,
  });
  res.json(patient);
};

// PUT : add a staff record to the DB
const putStaff = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const createdStaff = new Staff({
    staff_id: req.body.staff_id,
    staff_firstName: req.body.staff_firstName,
    staff_lastName: req.body.staff_lastName,
    staff_hospitalId: req.body.staff_hospitalId,
    staff_gender: req.body.staff_gender,
    staff_nric: req.body.staff_nric,
    staff_photo: req.body.staff_photo,
    staff_ward: req.body.staff_ward,
    staff_password: req.body.staff_password,
  });

  await createdStaff.save();

  res.json({ status: "ok", msg: "created" });
};

const seedData = async (req, res) => {
  try {
    await Patients.deleteMany();

    await Patients.create([
      { name: "Rose", colour: "Red" },
      { name: "Lily", colour: "White" },
      { name: "Orchid", colour: "Pink" },
      { name: genRandomString(20), colour: genRandomString(5) },
    ]);

    res.json({ status: "ok", msg: "seeding successful" });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: " error", msg: "seeding error" });
  }
};

const deleteStaff = async (req, res) => {
  //   await Staff.findByIdAndDelete(req.body.id);

  const { id } = req.body;
  await Staff.deleteOne({ _id: id });

  res.json({ status: "ok", msg: "deleted" });
};

const patchStaff = async (req, res) => {
  await Staff.updateOne(
    { staff_nric: req.body.staff_nric },
    {
      staff_id: req.body.staff_id,
      staff_hospitalId: req.body.staff_hospitalId,
      staff_firstName: req.body.staff_firstName,
      staff_lastName: req.body.staff_lastName,
      staff_gender: req.body.staff_gender,
      staff_nric: req.body.staff_nric,
      staff_photo: req.body.staff_photo,
      staff_ward: req.body.staff_ward,
      staff_password: req.body.staff_password,
    }
  );

  res.json({ status: "ok", msg: "updated" });
};

const characters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcedfghijklmnopqrstuvwxyz1234567890";

const genRandomString = (length) => {
  let output = "";
  for (let i = 0; i < length; i++) {
    output += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return output;
};

module.exports = {
  getStaff,
  postStaffById,
  postStaffByNric,
  putStaff,
  deleteStaff,
  patchStaff,
  seedData,
};
