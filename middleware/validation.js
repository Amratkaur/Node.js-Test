const Joi = require("joi");
const registerValidation = async (req, res, next) => {
  const schema = Joi.object().keys({
    name: Joi.string().min(3).max(30).required(),
    age: Joi.number().integer().min(10).max(100),
    password: Joi.string().min(3).max(20).required().label("password"),
    email: Joi.string().email({ tlds: { allow: false } }),
    workPlace: Joi.string().min(3).max(30).required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    res.json({ message: error.message, isSucess: false });
  } else {
    next();
  }
};


const loginValidation = async (req, res, next) => {
  const loginschema = Joi.object().keys({
    
    email: Joi.string().email({ tlds: { allow: false } }),
    password: Joi.string().min(3).max(20).required().label("password"),
    
  });
  const { error } = loginschema.validate(req.body);
  if (error) {
    res.json({ message: error.message, isSucess: false });
  } else {
    next();
  }
};
module.exports = {registerValidation, loginValidation};