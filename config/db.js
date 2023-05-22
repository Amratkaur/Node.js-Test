require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGOOSE_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once("open", () => {
  console.log("database connected");
});
mongoose.connection.on("error", (e) => {
  console.log("database not connected");
});
