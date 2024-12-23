import express from "express"
import { StatusCodes } from "http-status-codes";
import { PORT } from "./configs/severConfig";
import connectDB from "./configs/dbConfig";
import apiRouter from "./routes/apiRouter";
import {createServer} from "http";
// import { mailer } from "./configs/mailerConfig";
import cors from 'cors'
import { Server } from "socket.io";
import { createMessageService } from "./service/messageService";


const app = express();
const server = createServer(app);
const io = new Server(server)

app.use(cors())
app.use(express.json());
app.use('/api',apiRouter);


app.get('/ping',async(req,res)=>{
    res.status(StatusCodes.OK).json({
        message:'pong'
    })
});


io.on("connect",(socket)=>{
    socket.on("NewMessageEvent", async function (data,cb) {
        const messageResponse = await createMessageService(data);
        socket.broadcast.emit("NewMessageReceivedEvent",messageResponse);
        cb({
            success:true,
            data:messageResponse
        })
    })
})

server.listen(PORT, async ()=>{
    connectDB();
    console.log("server is up on port", PORT);
    // const response =  await mailer.sendMail({
    //     from:'nestify.manager@gmail.com',
    //     to:"adityabhojane2001@gmail.com",
    //     subject:"sample email",
    //     text:"sample text",
    //     html:"<p> paragraph tag<p>"
    // });
    // console.log('email' , response)
})