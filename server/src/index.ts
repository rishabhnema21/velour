import express from "express";
import cors from "cors";
import config from "./config/config";
import { clerkMiddleware } from "@clerk/express";
import authRoutes from "./routes/authRoutes";
import bodyParser from "body-parser";

const app = express();

app.use("/api/webhooks", authRoutes);
app.use(express.json());
app.use(clerkMiddleware());

app.get("/", (req, res) => {
    res.send("App is running");
});

app.listen(config.port, () => {
    console.log("App is running in port : ",config.port);
})