const Auth = require("../models/Auth");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

const register = async (req, res) => {
  try {
    const auth = await Auth.findOne({ username: req.body.username });
    if (auth) {
      return res
        .status(400)
        .json({ status: "error", msg: "duplicate username" });
    }

    const hash = await bcrypt.hash(req.body.password, 12);

    await Auth.create({
      username: req.body.username,
      hash,
    });

    res.json({ status: "ok", msg: "user registered" });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ status: "error", msg: "registration error" });
  }
};

const login = async (req, res) => {
  try {
    const auth = await Auth.findOne({ username: req.body.username });
    if (!auth) {
      return res.status(400).json({ status: "error", msg: "not authorised" });
    }

    const result = await bcrypt.compare(req.body.password, auth.hash);
    if (!result) {
      return res.status(401).json({ status: "error", message: "login fail" });
    }

    const payload = {
      username: auth.username,
    };

    const access = jwt.sign(payload, process.env.ACCESS_SECRET, {
      expiresIn: "20m",
      jwtid: uuidv4(),
    });

    const refresh = jwt.sign(payload, process.env.REFRESH_SECRET, {
      expiresIn: "30D",
      jwtid: uuidv4(),
    });

    res.json({ access, refresh });
  } catch (error) {
    return res.status(400).json({ status: "error", msg: "login failed" });
  }
};

const refresh = async (req, res) => {
  try {
    const decoded = jwt.verify(req.body.refresh, process.env.REFRESH_SECRET);

    const payload = { username: decoded.username };

    const access = jwt.sign(payload, process.env.ACCESS_SECRET, {
      expiresIn: "20m",
      jwtid: uuidv4(),
    });

    res.json({ access });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ status: "error", msg: "unable to refresh token" });
  }
};

module.exports = {
  register,
  login,
  refresh,
};
