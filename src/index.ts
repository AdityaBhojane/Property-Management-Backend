import express from "express"
import { StatusCodes } from "http-status-codes";
import { PORT } from "./configs/severConfig";
import connectDB from "./configs/dbConfig";
import apiRouter from "./routes/apiRouter";
import { createServer } from "http";
// import { mailer } from "./configs/mailerConfig";
import cors from 'cors'
import { Server } from "socket.io";
import { MessageSocketHandlers, RoomSocketHandlers } from "./controller/scoketControllers";


const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST'],
};

app.use(cors(corsOptions))
app.use(express.json());
app.use('/api', apiRouter);


app.get('/ping', async (req, res) => {
  res.status(StatusCodes.OK).json({
    message: 'pong'
  })
});

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);
  // Attach message and room handlers
  RoomSocketHandlers(io, socket);
  MessageSocketHandlers(io, socket);
});



server.listen(PORT, async () => {
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