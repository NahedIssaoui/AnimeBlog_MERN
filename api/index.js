const express = require("express");
const app = express();
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const multer = require("multer");
const connect = require('./helpers/dbConnect')

const path=require('path')
require('dotenv').config()
connect()

const cors=require('cors');

app.use(cors())
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images"))); 



const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
}); 

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);


app.listen("5000", () => {
  console.log("Backend is running.");
});
