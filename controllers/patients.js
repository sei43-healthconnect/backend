const { validationResult } = require("express-validator");
const Patients = require("../models/Patients");

// GET : retrieve all patients from the DB
const getPatients = async (req, res) => {
  const allPatients = await Patients.find();

  console.log(allPatients);
  res.json(allPatients);
};

// POST : retrieve one patient from the DB, based on ID
const postPatientsById = async (req, res) => {
  const patient = await Patients.findById(req.body.id);
  res.json(patient);
};

// POST : retrieve one patient from the DB, based on his NRIC
const postPatientsByNric = async (req, res) => {
  const patient = await Patients.findOne({
    patient_nric: req.body.patient_nric,
  });
  res.json(patient);
};

// PUT : add a patient record to the DB
const putPatients = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const createdPatient = new Patients({
    patient_firstName: req.body.patient_firstName,
    patient_lastName: req.body.patient_lastName,
    patient_gender: req.body.patient_gender,
    patient_nric: req.body.patient_nric,
    patient_phoneNumber: req.body.patient_phoneNumber,
    patient_dateOfBirth: req.body.patient_dateOfBirth,
    patient_dateAdmitted: req.body.patient_dateAdmitted,
    patient_diet: req.body.patient_diet,
    patient_language: req.body.patient_language,
    patient_attention: req.body.patient_attention,
    patient_doctorRemark: req.body.patient_doctorRemark,
    patient_photo: req.body.patient_photo,
    patient_ward: req.body.patient_ward,
    patient_bed: req.body.patient_bed,
  });

  await createdPatient.save();

  res.json({ status: "ok", msg: "created" });
};

// this section needs to be updated to seed our patients DB for example
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

const deletePatients = async (req, res) => {
  //   await Patients.findByIdAndDelete(req.body.id);

  const { id } = req.body;
  await Patients.deleteOne({ _id: id });

  res.json({ status: "ok", msg: "deleted" });
};

const patchPatients = async (req, res) => {
  await Patients.updateOne(
    { _id: req.body.id },
    {
      patient_id: req.body.patient_id,
      patient_firstName: req.body.patient_firstName,
      patient_lastName: req.body.patient_lastName,
      patient_gender: req.body.patient_gender,
      patient_nric: req.body.patient_nric,
      patient_phoneNumber: req.body.patient_phoneNumber,
      patient_dateOfBirth: req.body.patient_dateOfBirth,
      patient_dateAdmitted: req.body.patient_dateAdmitted,
      patient_diet: req.body.patient_diet,
      patient_language: req.body.patient_language,
      patient_attention: req.body.patient_attention,
      patient_doctorRemark: req.body.patient_doctorRemark,
      patient_photo: req.body.patient_photo,
      patient_ward: req.body.patient_ward,
      patient_bed: req.body.patient_bed,
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
  getPatients,
  postPatientsById,
  postPatientsByNric,
  putPatients,
  deletePatients,
  patchPatients,
  seedData,
};
