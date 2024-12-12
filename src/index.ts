import express from "express"
import { StatusCodes } from "http-status-codes";
import { PORT } from "./configs/severConfig";
import connectDB from "./configs/dbConfig";
import apiRouter from "./routes/apiRouter";


const app = express();

app.use(express.json());
app.use('/api',apiRouter)


app.get('/ping',async(req,res)=>{
    res.status(StatusCodes.OK).json({
        message:'pong'
    })
});

app.listen(PORT, ()=>{
    connectDB();
    console.log("server is up on port", PORT)
})