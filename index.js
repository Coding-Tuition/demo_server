import express from "express";
import mongoose from "mongoose";
import { router } from "./router.js";
import cors from "cors";

const app = express();
app.use(cors({ origin: "https://demo-app-five-phi.vercel.app" }));
app.use(express.json());

app.listen(5080);

mongoose
  .connect(
    "mongodb+srv://CodingTuitionAdmin:KzvGYKotIofxU3Qy@ct-cluster0.eosnd.mongodb.net/?retryWrites=true&w=majority&appName=CT-Cluster0",
    { dbName: "auth" }
  )
  .then(() => console.log("Server connected with MongoDB"));

app.use("/", router);
