import express from "express";
import cors from "cors";
import config from "./config/config";
import { clerkMiddleware } from "@clerk/express";
import authRoutes from "./routes/authRoutes";
import bookRoutes from "./routes/book.routes";
import libraryRoutes from "./routes/library.route";

const app = express();
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}))

app.get("/", (req, res) => {
    res.send("App is running");
});

app.use(clerkMiddleware());
app.use("/api/webhooks", authRoutes);
app.use(express.json());
app.use("/api/books", bookRoutes);
app.use("/api/library", libraryRoutes);

app.listen(config.port, () => {
    console.log("App is running in port : ",config.port);
})