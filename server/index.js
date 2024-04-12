const express = require("express");
const cors = require("cors");
const axios = require("axios");
const morgan = require('morgan');
const dbConnect = require("./config/dbConnect");
require("dotenv").config();


const app = express();
app.use(express.json());
app.use(morgan('tiny'));
app.use(
  cors()
);


const userRoutes = require("./routes/userRoutes");

const PORT = process.env.PORT || 8000;
dbConnect();

app.get("/", async (req, res) => {
  res.redirect("http://localhost:5173/");
});

app.use("/users", userRoutes);

const server = app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
