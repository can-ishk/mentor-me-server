import express, {Express, Request, Response} from 'express';

const PORT = 3000;

const app: Express = express();

app.get('/', (req:Request, res: Response)=>{
    res.send("Hello!");
})

app.listen(PORT, ()=>{
    console.log("server is listening on port " + PORT)
})