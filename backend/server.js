import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import express from "express";
import path from "path";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/users.routes.js";

import connectToMongoDB from "./db/connectToMongoDB.js";
import { app, server } from "./socket/socket.js";

const __dirname = path.resolve();
const PORT = process.env.PORT || 5000;

dotenv.config();

app.use(express.json()); // parsing incoming requests with JSON payloads (from re.body)
app.use(cookieParser()); // call the cookie-parser before accessing the routes

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

//middleware
app.use(express.static(path.join(__dirname, "/frontend/dist")));
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"))
})


/*app.get("/", (req,res) => {
    //root route http:loacalhost:5000/
    res.send("Hello Thulani! Have a good time coding");
});*/



server.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server is Running on this port ${PORT}`)
});