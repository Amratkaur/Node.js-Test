const jwt = require("jsonwebtoken");
const register = require("../model/model");

const verifytoken = async function checkUserOrAdmin(req, res, next) {
  try {
    const token = req.header("Authorization");
    const verifyUser = jwt.verify(token, process.env.SECRET_KEY);
    const user = await register.findOne({ _id: verifyUser.data._id });
    req.user = user;
    next();
  } catch (error) {
    res.send({ message: "Invalid Token", isSuccess: false });
  }
};

module.exports = verifytoken;