const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const workingList = new mongoose.Schema({
  name: {
    type: String,
  },
  age: {
    type: String,
  },
  workPlace: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

workingList.methods.generateAuthToken = async function () {
  try {
    const data = await userSchema.findById(this._id);
    const token = jwt.sign({ data }, process.env.SECRET_KEY);
    // this.tokens = this.tokens.concat({token})   add this line when you want to store or show token in db
    await this.save();
    console.log("my token", token);
    return token;
  } catch (error) {
    res.send("the error part" + error);
  }
};

workingList.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const userSchema = new mongoose.model("userSchema", workingList);
module.exports = userSchema;
