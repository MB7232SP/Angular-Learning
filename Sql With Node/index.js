import express from 'express'
import { connectDb } from './db.js';

const app = express();
app.use(express.json());
app.get('/',async(req,res)=>{
     res.send({
        status:"success",
        msg:'hello to my express app'
     })
})
const port = 8080;
app.listen(port,async ()=>{
    await connectDb();
    console.log(`server is running on http://localhost:8080`);
})