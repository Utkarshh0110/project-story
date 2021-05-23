require('dotenv').config()
const express = require("express")
const cors = require("cors")
const bodyparser = require("body-parser")
const mongoose = require('mongoose');
var cookieParser = require('cookie-parser')
const authRoutes = require("./routes/auth");
const forumRoutes = require("./routes/forum");
const projectRoutes = require("./routes/project");
const app = express();




app.use(cors());
app.use(bodyparser.json({limit: '50mb'}));
app.use(cookieParser());

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));


const PORT  = process.env.PORT || 8000;

mongoose.connect(process.env.CONNECTION_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(() => {
    console.log("DB CONNECTED")
})
app.get("/", (req, res) => {
  res.send("Hello to api")
})
app.use("/api", authRoutes)
app.use("/api", forumRoutes)
app.use("/api", projectRoutes)


app.listen(PORT, () => {
    console.log(`listening on PORT ${PORT}`)
})