import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js"

export const sendMessage = async (req, res) => {
    try {
        const {message} = req.body;                     //getting message from user as input
        const {id: recieverId} = req.params;            //deconstructed reciever Id
        const senderId = req.user._id;     //user added as part of middleware

        //using let because it will change in a sec
        let conversation = await Conversation.findOne({        //find conversation between participants
            participants: { $all: [senderId, recieverId] }     //$aLL part of mongo
        });

        if(!conversation) {         //if there's no conversation then create a new one
            conversation = await Conversation.create({
                participants: [senderId, recieverId]
                //no need to create an empty messages because its default is empty array
            });
        };

        const newMessage = new Message({        //create a new message between participants
            senderId,
            recieverId,
            message
        });

        if(newMessage) {
            conversation.messages.push(newMessage._id);         //if message was sent, add to convesation array
        };

        //SOCKET IO FUNCTIONALITY WILL GO IN HERE

       //running parallel
        await Promise.all([conversation.save(), newMessage.save()]);

        res.status(201).json({newMessage});

    } catch (error) {
        console.log("Error in sendMessgae controller: ", error.message);
        res.status(500).json({ error: "Internal server error"});
    }
};

export const getMessages = async (req, res) => {
    try {
        
        const {id: userToChatId} = req.params;      //we getting from the url param
        const senderId = req.user._id;              //taken from protectRoute

        const conversation = await Conversation.findOne({
            //find user to chat with
            participants: { $all: [senderId, userToChatId] }
        }).populate("messages"); //NOT REFERENCE BUT ACTUAL MESSAGE

        if(!conversation) return res.status(200).json([]);
        
        const messages = conversation.messages;

        res.status(200).json(messages);

    } catch (error) {
        console.log("Error in getMessgae controller: ", error.message);
        res.status(500).json({ error: "Internal server error"});
    }
};