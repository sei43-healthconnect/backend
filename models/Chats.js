const mongoose = require("mongoose");

const ChatsSchema = new mongoose.Schema(
  {
    chat_id: { type: String, require: true },
    msg_senderId: { type: String, require: true },
    msg_fromNurse: { type: Boolean, require: true },
    msg_isRead: { type: Boolean, require: true },
    // timeSent has to be in ISO8601 date format
    msg_timeSent: { type: Date, require: true },
    msg_content: { type: String, require: true },
  },
  { collection: "chats" }
);

module.exports = mongoose.model("Chats", ChatsSchema);
