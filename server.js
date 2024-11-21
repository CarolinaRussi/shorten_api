import express from "express";
import urlRoutes from "./routes/urls.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors()); 

app.use("/", urlRoutes);

app.listen(8800);