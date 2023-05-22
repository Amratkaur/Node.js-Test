const express = require("express");
const auth = require("../middleware/auth");
const upload = require("../middleware/upload");
const {
  registerValidation,
  loginValidation,
} = require("../middleware/validation");
const {
  registerSignup,
  userlogin,
  homePage,
  getPeople,
  getById,
  getId,
  getWhoLogined,
  getAlldeveloper,
  patchIt,
  deleteId,
} = require("../controller/reg_controller");

const router = new express.Router();

router.post(
  "/register",
  [upload.array("file"), registerValidation],
  registerSignup
);

router.post("/login", loginValidation, userlogin);

router.get("/home", auth, homePage);

router.get("/get", getPeople);

router.get("/getbyid/:id", getById);

router.get("/getthem", auth, getId);

router.get("/getLoginedUser", getWhoLogined);

router.post("/list",  getAlldeveloper);

router.patch("/patch/:id", patchIt);

router.delete("/delete/:id", deleteId);

module.exports = router;
