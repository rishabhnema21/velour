import express from "express";
import cors from "cors";
import config from "./config/config.js"

const app = express();

app.get("/", (req, res) => {
    res.send("App is running");
});

app.listen(config.port, () => {
    console.log("App is running in port : ",config.port);
})