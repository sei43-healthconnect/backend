const express = require("express");
const router = express.Router();
const {
  getContacts,
  postContactByPhoneNumber,
  postContactById,
  putContacts,
  deleteContacts,
  patchContacts,
} = require("../controllers/contacts");
const { check } = require("express-validator");
const auth = require("../middleware/auth");

router.get("/contacts", getContacts);
router.post("/contacts/id", postContactById);
router.post("/contacts/phone", postContactByPhoneNumber);
router.put(
  "/contacts",
  [
    check("firstName", "First name is required").not().isEmpty(),
    check("lastName", "Last Name is required").not().isEmpty(),
  ],
  putContacts
);
router.delete("/contacts", deleteContacts);
router.patch("/contacts/:id", patchContacts);

module.exports = router;
