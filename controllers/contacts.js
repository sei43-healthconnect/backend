const { validationResult } = require("express-validator");
const Contacts = require("../models/Contacts");

// GET : retrieve all contacts from the DB
const getContacts = async (req, res) => {
  const allContacts = await Contacts.find();
  res.json(allContacts);
};

// POST : retrieve one contact from the DB, based on a criteria
const postContacts = async (req, res) => {
  const contact = await Contacts.findById(req.body.id);
  res.json(contact);
};

// PUT : add a contact record to the DB
const putContacts = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const createdPatient = new Contacts({
    contact_id: req.body.contact_id,
    contact_firstName: req.body.contact_firstName,
    contact_lastName: req.body.contact_lastName,
    contact_gender: req.body.gender,
    contact_phoneNumber: req.body.contact_phoneNumber,
    contact_order: req.body.contact_order,
    patient_id: req.body.patient_id,
  });

  await createdPatient.save();

  res.json({ status: "ok", msg: "created" });
};

// this section needs to be updated to seed our contacts DB for example
const seedData = async (req, res) => {
  try {
    await Contacts.deleteMany();

    await Contacts.create([
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

const deleteContacts = async (req, res) => {
  //   await Contacts.findByIdAndDelete(req.body.id);

  const { id } = req.body;
  await Contacts.deleteOne({ _id: id });

  res.json({ status: "ok", msg: "deleted" });
};

const patchContacts = async (req, res) => {
  await Contacts.updateOne(
    { _id: req.body.id },
    {
      contact_id: req.body.contact_id,
      contact_firstName: req.body.contact_firstName,
      contact_gender: req.body.gender,
      contact_lastName: req.body.contact_lastName,
      contact_phoneNumber: req.body.contact_phoneNumber,
      contact_order: req.body.contact_order,
      patient_id: req.body.patient_id,
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
  getContacts,
  postContacts,
  putContacts,
  deleteContacts,
  patchContacts,
  seedData,
};
