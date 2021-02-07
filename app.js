const express = require("express")
const morgan = require("morgan")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const app = express();

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

const routePath = require("./api/routes/user")
app.use("/api/v0", routePath)

app.use((req, res, next) => {
  let error = new Error("404 page not found")
  error.status = 404
  next(error);
})

app.use((res, error) => {
  if (error === 404) return res.status(404).json({ message: error.message })
  if (error === 400) return res.status(400).json({ message:  error.message })
  return res.status(500).json({ message:  error.message })
})



mongoose.connect('mongodb://localhost:27017/social', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

const db = mongoose.connection
db.on('error', (err) => console.log(err.message))
db.once("open", () => console.log("DB Connection Successful"))
const port = process.env.port || 3000;

app.listen(port, () => {
  console.log("app is running")
})
