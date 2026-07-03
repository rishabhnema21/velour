import express from "express";
import cors from "cors";
import config from "./config/config";
import { clerkMiddleware } from "@clerk/express";
import authRoutes from "./routes/authRoutes";
import bookRoutes from "./routes/book.routes";
import libraryRoutes from "./routes/library.route";
import shelvesRoutes from "./routes/shelves.route";
import highlightRoutes from "./routes/highlight.route";
import uploadRoutes from "./routes/upload.route";

const app = express();
app.use(cors({
    origin: process.env.CORS_ORIGIN,
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
app.use("/api/shelves", shelvesRoutes);
app.use("/api/highlights", highlightRoutes);
app.use("/api/upload", uploadRoutes);


app.listen(config.port, () => {
    console.log("App is running in port : ",config.port);
})