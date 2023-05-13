const express = require("express");
const router = express.Router();
const {
  getContacts,
  postContactByNric,
  putContact,
  deleteContact,
  patchContact,
} = require("../controllers/contacts");
const { check } = require("express-validator");
const auth = require("../middleware/auth");

router.get("/contacts", getContacts);
router.post("/contacts", postContactByNric);
router.put(
  "/contacts",
  [
    check("contact_firstName", "First name is required").not().isEmpty(),
    check("contact_lastName", "Last Name is required").not().isEmpty(),
  ],
  putContact
);
router.delete("/contacts", deleteContact);
router.patch("/contacts/:id", patchContact);

module.exports = router;
