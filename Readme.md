
packages :

```bash
npm i argon2 @types/argon2
npm i express @types/express
npm i jsonwebtoken @types/jsonwebtoken
npm i zod
```

add auto delete after 1 day 

io.on("connect", (socket) => {
    console.log("Socket connected:", socket.id);

    // Handle participant joining a room
    socket.on("joinRoom", (participantId) => {
        console.log(`Socket ${socket.id} joining room ${participantId}`);
        socket.join(participantId);
    });

    // Handle sending messages
    socket.on("NewMessageEvent", async function (data, cb) {
        try {
            console.log("New message received:", data);

            // Create the message using your service
            const messageResponse = await createMessageService(data);

            // Send the message to the participant's room
            io.to(data.participantId).emit("NewMessageReceivedEvent", messageResponse);

            // Acknowledge the client
            cb({
                success: true,
                data: messageResponse,
            });
        } catch (error) {
            console.error("ERROR", error);
            cb({ success: false, error: "Internal server error" });
        }
    });
});