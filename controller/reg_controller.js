const userSchema = require("../model/model");
const otherSchema = require("../model/loginModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerSignup = async (req, res) => {
  try {
    const email = req.body.email;
    const doubleCheck = await userSchema.find({ email });
    if (doubleCheck.length > 0) {
      res.json({ message: "you have already resgistered" });
    } else {
      const register = await new userSchema(req.body);
      await register.save();
      res.status(200).json({ message: "registration done, now do login " });
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

const userlogin = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const userGmail = await userSchema.findOne({ email });
    const isMatch = await bcrypt.compare(password, userGmail.password);
    const token = await userGmail.generateAuthToken();

    if (isMatch) {
      const register = await new otherSchema({ user_data: userGmail.id });
      await register.save();
      res.status(201).send({ token });
    } else {
      res.json("invaid name and password");
    }
  } catch (error) {
    res.send(error);
  }
};
// home page
const homePage = async (req, res) => {
  try {
    const studentReg = await new userSchema(req.body);
    await studentReg.save();
    res.send("welcome to homepage");
  } catch (error) {
    res.status(400).send(error);
  }
};

// to get who have register list
const getPeople = async (req, res) => {
  try {
    const get = await userSchema.find(req.body);
    res.send(get);
  } catch (error) {
    res.status(400).send(error);
  }
};

// to get them by id personally
const getById = async (req, res) => {
  try {
    const _id = req.params.id;
    const getId = await userSchema.findById({ _id });
    res.send(getId);
  } catch (error) {
    res.status(400).send(error);
  }
};
// get id who has token
const getId = async (req, res) => {
  try {
    const _id = req.user.id;
    const getId = await userSchema.find({ _id });
    res.send(getId);
  } catch (error) {
    res.status(400).send(error);
  }
};
// get data of person who has logined and have token
const getWhoLogined = async (req, res) => {
  try {
    const get = await otherSchema.find().populate("user_data");
    res.send(get);
  } catch (error) {
    res.status(400).send(error);
  }
};


// getfull list of getPeople
const getAlldeveloper = async (req, res) => {
  try {
  const { page = 1 } = req.body;
  let perPage = req.body.perPage ? req.body.perPage : 25;
  const data = await userSchema
  .find()
  .skip(perPage * page - perPage)
  .limit(perPage)
  .sort({ _id: -1 });
  const count = await userSchema.find().count();
  res.status(201).send({
  message: "List of DeveloperMaster",
  data,
  current: page,
  totalCount: count,
  pages: Math.ceil(count / perPage),
  });
  } catch (error) {
  res.send({ error, isSuccess: false });
  }
  };

// to update anydata
const patchIt = async (req, res) => {
  try {
    const _id = req.params.id;
    const update = await userSchema.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    res.send(update);
  } catch (error) {
    res.status(500).send(error);
  }
};

  const deleteId = async (req, res) => {
    try {
      const _id = req.params.id;
      const deleteUser = await userSchema.findByIdAndDelete({ _id });
      res.send(deleteUser);
    } catch (error) {
      res.status(400).send(error);
    }
  };

module.exports = {
  registerSignup,
  userlogin,
  homePage,
  getPeople,
  getById,
  getId,
  getWhoLogined,
  getAlldeveloper,
  patchIt,
  deleteId
};
