import { get, listen } from 'express';
const PORT = 3000;

get('/', ()=>{
    console.log('Hello World');
})

listen(PORT, ()=>{
    console.log("server is listening on port " + PORT)
})