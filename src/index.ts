const api = require("./routes/api");
const bodyParser = require("body-parser");
const express = require("express");
const http = require("node:http");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cron = require("node-cron");
const { publishScheduledArticles } = require("./models/articleModel");
const { publishScheduledEvents } = require("./models/eventModel");

require("dotenv").config();

const PORT = process.env.PORT || 8000;

const app = express();

const server = http.createServer(app);

app.use(morgan("combined"));
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "http://localhost:8000",
    ],
  }),
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.json());

app.use("/", api);

process.env.TZ = "Europe/Kiev";

cron.schedule("* * * * *", async () => {
  try {
    await publishScheduledArticles();
    await publishScheduledEvents();
    console.log("Scheduled articles published successfully.");
  } catch (error) {
    console.error("Error publishing scheduled articles:", error);
  }
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});

module.exports = server;
