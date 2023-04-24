import express from 'express';
import { connect } from 'mongoose';
import cors from 'cors';
import { createServer } from 'http';
import * as dotenv from 'dotenv';
import * as path from 'path';

import { socketServer, authSocket} from "./socketServer.js";
import { Server } from 'socket.io';

dotenv.config();

import users from './routes/users.js'
import ments from './routes/ments.js'
import chats from './routes/chats.js'

const app = express();

const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: [
            "http://localhost:3000",
            "https://mentor-me-client.vercel.app/"
        ]
    }
});

io.use(authSocket);
io.on("connection", (socket) => socketServer(socket));

const PORT = 8000;


connect(
    process.env.MONGO_URI,
    { useNewUrlParser: true, useUnifiedTopology: true },
);

app.get('/', (req, res) => {
    res.send("Hello!");
})
app.use(express.json());
app.use(cors());
app.use("/api/ments", ments);
app.use("/api/users", users);
app.use("/api/chats", chats);

app.listen(PORT, () => {
    console.log("server is listening on port " + PORT)
})

export default app;