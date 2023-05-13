const { validationResult } = require("express-validator");
const Contacts = require("../models/Contacts");

// GET : retrieve all contacts from the DB
const getContacts = async (req, res) => {
  const allContacts = await Contacts.find();
  res.json(allContacts);
};

// POST : retrieve one contact from the DB, based on a criteria
const postContactById = async (req, res) => {
  const contact = await Contacts.findById(req.body.id);
  res.json(contact);
};

// POST : retrieve one contact from the DB, based on his phone number
const postContactByPhoneNumber = async (req, res) => {
  const contact = await Contacts.findOne({
    contact_phoneNumber: req.body.contact_phoneNumber,
  });
  res.json(contact);
};

// PUT : add a contact record to the DB
const putContacts = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const createdContact = new Contacts({
    contact_firstName: req.body.contact_firstName,
    contact_lastName: req.body.contact_lastName,
    contact_gender: req.body.contact_gender,
    contact_phoneNumber: req.body.contact_phoneNumber,
    contact_order: req.body.contact_order,
    contact_password: req.body.contact_password,
    contact_patientNric: req.body.contact_patientNric,
  });

  await createdContact.save();

  res.json({ status: "ok", msg: "created" });
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
      contact_gender: req.body.contact_gender,
      contact_lastName: req.body.contact_lastName,
      contact_phoneNumber: req.body.contact_phoneNumber,
      contact_order: req.body.contact_order,
      patient_id: req.body.patient_id,
    }
  );

  res.json({ status: "ok", msg: "updated" });
};

module.exports = {
  getContacts,
  postContactById,
  postContactByPhoneNumber,
  putContacts,
  deleteContacts,
  patchContacts,
};
