const express = require("express");

const PORT = 8080;
const HOST = "0.0.0.0";

const app = express();
const connectDb = require("./src/connection");
const Name = require("./src/Name.model");
const cors = require("cors");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

app.use(cors());
app.use(jsonParser);

app.get("/", (req, res) => {
  res.send("Hello from Node.js app \n");
});

app.get("/names", async (req, res) => {
  try {
    const names = await Name.find();
    res.json(names);
  } catch (e) {
    console.log(JSON.stringify(e, null, 2));
  }
});

app.post("/name-post", async (req, res) => {
  const name = new Name({ name: req.body.name });

  await name.save().then(() => console.log("Name added"));

  res.send("Name added \n");
});

app.listen(PORT, HOST, () => {
  console.log(`Running on http://${HOST}:${PORT}`);
  connectDb().then(() => {
    console.log("MongoDb connected");
  });
});
