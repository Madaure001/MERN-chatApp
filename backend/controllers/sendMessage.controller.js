import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js"
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
    try {
        const {message} = req.body;                     //getting message from user as input
        const {id: receiverId} = req.params;            //deconstructed receiver Id
        const senderId = req.user._id;     //user added as part of middleware

        //using let because it will change in a sec
        let conversation = await Conversation.findOne({        //find conversation between participants
            participants: { $all: [senderId, receiverId] }     //$aLL part of mongo
        });

        if(!conversation) {         //if there's no conversation then create a new one
            conversation = await Conversation.create({
                participants: [senderId, receiverId]
                //no need to create an empty messages because its default is empty array
            });
        };

        const newMessage = new Message({        //create a new message between participants
            senderId,
            receiverId,
            message
        });

        if(newMessage) {
            conversation.messages.push(newMessage._id);         //if message was sent, add to convesation array
        };
        // await conversation.save();
		// await newMessage.save();

        //running parallel
        await Promise.all([conversation.save(), newMessage.save()]);

        //SOCKET IO FUNCTIONALITY WILL GO IN HERE
        const receiverSocketId = getReceiverSocketId(receiverId);
		if (receiverSocketId) {
			// io.to(<socket_id>).emit() used to send events to specific client
			io.to(receiverSocketId).emit("newMessage", newMessage);
		}        

        res.status(201).json({newMessage});

    } catch (error) {
        console.log("Error in sendMessgae controller: ", error.message);
        res.status(500).json({ error: "Internal server error"});
    }
};

