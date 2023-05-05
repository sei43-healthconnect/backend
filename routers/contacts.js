const express = require("express");
const router = express.Router();
const {
  getContacts,
  postContacts,
  putContacts,
  deleteContacts,
  patchContacts,
  seedData,
} = require("../controllers/contacts");
const { check } = require("express-validator");
const auth = require("../middleware/auth");

router.get("/contacts", getContacts);
router.post("/contacts", postContacts);
router.put(
  "/contacts",
  [
    check("contact_firstName", "First name is required").not().isEmpty(),
    check("contact_lastName", "Last Name is required").not().isEmpty(),
  ],
  putContacts
);
router.delete("/contacts", deleteContacts);
router.patch("/contacts/:id", patchContacts);
router.get("/seed", seedData);

module.exports = router;
