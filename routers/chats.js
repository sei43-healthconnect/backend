const express = require("express");
const router = express.Router();
const {
  getChats,
  postChats,
  putChats,
  deleteChats,
  patchChats,
  seedData,
} = require("../controllers/chats");
const { check } = require("express-validator");
const auth = require("../middleware/auth");

router.get("/chats", getChats);
router.post("/chats", postChats);

router.put(
  "/chats",
  [
    check("chat_id", "chat_id is required").not().isEmpty(),
    check("msg_senderId", "msg_senderId  is required").not().isEmpty(),
    check("msg_fromNurse", "msg_fromNurse is required").not().isEmpty(),
    check("msg_isRead", "msg_isRead is required").not().isEmpty(),
    check("msg_timeSent", "msg_timeSent is required").not().isEmpty(),

    check(
      "msg_fromNurse",
      "A boolean confirming whether the message is from a nurse or not is required"
    ).isBoolean(),
    check(
      "msg_isRead",
      "A boolean confirming whether the message has been read is required"
    ).isBoolean(),
    check(
      "msg_timeSent",
      "msg_timeSent has to be in strict isodate format"
    ).isISO8601({ strict: false, strictSeparator: false }),
  ],
  putChats
);
router.delete("/chats", deleteChats);
router.patch("/chats/:id", patchChats);
router.get("/seed", seedData);

module.exports = router;
