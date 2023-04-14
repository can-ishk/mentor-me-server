import express from 'express';
import {connect} from 'mongoose';
import cors from 'cors';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config();

import users from './routes/users.js'
import ments from './routes/ments.js'
const PORT = 8000;

const app = express();

connect(
    process.env.MONGO_URI,
    { useNewUrlParser: true, useUnifiedTopology: true },
  );

app.get('/', (req, res)=>{
    res.send("Hello!");
})
app.use(express.json());
app.use(cors());
app.use("/api/ments", ments);
app.use("/api/users", users);

app.listen(PORT, ()=>{
    console.log("server is listening on port " + PORT)
})

export default app;