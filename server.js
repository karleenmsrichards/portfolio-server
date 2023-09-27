import express from "express";
import dotenv, { config } from "dotenv";
dotenv.config();
config();
import cors from "cors";
import router from "./router.js";

const { PORT } = process.env;

const app = express();
const port = PORT || 5555;

async function startServer() {
  app.use(cors());
  app.use(express.json());

  app.use((req, res, next) => {
    console.log(` 🚦 Request incoming: ${req.method} - ${req.url}✅`);
    next();
  });

  app.use("/", router);
}

const listener = app.listen(port, function () {
  console.log("Your app is listening on port " + listener.address().port);
});

startServer();
