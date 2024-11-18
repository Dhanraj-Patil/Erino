require("dotenv").config();
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const cors = require("cors");

const Controller = require("./src/controller/controller");

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);
app.use(express.json());
app.use(Controller);

app.get("/", (req, res) => {
  res.send("Hello world!");
});

server.listen(process.env.PORT, (error) => {
  if (error) console.error(error);
  console.log("Server listening on port 3050.");
});
