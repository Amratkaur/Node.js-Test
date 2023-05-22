const express = require("express");
const app = express();
require("./config/db")
const path = require("path")
const port = process.env.PORT;


app.use(express.json());


const regRouter = require("./routes/reg_routes");
app.use(regRouter);

app.listen(port, () => {
  console.log(`port is running on ${port}`);
});
