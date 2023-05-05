const mongoose = require("mongoose");

const ContactsSchema = new mongoose.Schema(
  {
    contact_id: { type: String, require: true },
    contact_firstName: { type: String, require: true },
    contact_lastName: { type: String, require: true },
    contact_gender: { type: String, require: true },
    contact_phoneNumber: { type: Number, require: true },
    contact_order: { type: Number, require: true },
    patient_id: { type: String, require: true },
  },
  { collection: "contacts" }
);

module.exports = mongoose.model("Contacts", ContactsSchema);
