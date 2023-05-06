const { validationResult } = require("express-validator");
const Chats = require("../models/Chats");

// GET : retrieve all chats from the DB
const getChats = async (req, res) => {
  const allChats = await Chats.find();
  res.json(allChats);
};

// POST : retrieve one contact from the DB, based on a criteria
const postChats = async (req, res) => {
  const contact = await Chats.findById(req.body.id);
  res.json(contact);
};

// PUT : add a contact record to the DB
const putChats = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const createdChat = new Chats({
    chat_id: req.body.chat_id,
    msg_senderId: req.body.msg_senderId,
    msg_fromNurse: req.body.msg_fromNurse,
    msg_isRead: req.body.msg_isRead,
    msg_timeSent: req.body.msg_timeSent,
    msg_content: req.body.msg_content,
  });

  await createdChat.save();

  res.json({ status: "ok", msg: "created" });
};

// this section needs to be updated to seed our chats DB for example
const seedData = async (req, res) => {
  try {
    await Chats.deleteMany();

    await Chats.create([
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

const deleteChats = async (req, res) => {
  //   await Chats.findByIdAndDelete(req.body.id);

  const { id } = req.body;
  await Chats.deleteOne({ _id: id });

  res.json({ status: "ok", msg: "deleted" });
};

const patchChats = async (req, res) => {
  await Chats.updateOne(
    { _id: req.body.id },
    {
      chat_id: req.body.chat_id,
      msg_senderId: req.body.msg_senderId,
      msg_fromNurse: req.body.msg_fromNurse,
      msg_isRead: req.body.msg_isRead,
      msg_timeSent: req.body.msg_timeSent,
      msg_content: req.body.msg_content,
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
  getChats,
  postChats,
  putChats,
  deleteChats,
  patchChats,
  seedData,
};
