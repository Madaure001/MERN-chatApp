import Conversation from "../models/conversation.model.js";


export const getMessages = async (req, res) => {
    try {

        const { id: userToChatId } = req.params; //we getting from the url param
        const senderId = req.user._id; //taken from protectRoute

        const conversation = await Conversation.findOne({
            //find user to chat with
            participants: { $all: [senderId, userToChatId] }
        }).populate("messages"); //NOT REFERENCE BUT ACTUAL MESSAGE

        if (!conversation) return res.status(200).json([]);

        const messages = conversation.messages;

        res.status(200).json(messages);

    } catch (error) {
        console.log("Error in getMessgae controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const getSideBarMessages = async (req, res) => {
    try {

        const { id: userToChatId } = req.params; //we getting from the url param
        const senderId = req.user._id; //taken from protectRoute

        const conversation = await Conversation.findOne({
            //find user to chat with
            participants: { $all: [senderId, userToChatId] }
        }).populate("messages"); //NOT REFERENCE BUT ACTUAL MESSAGE

        if (!conversation) return res.status(200).json([]);

        var messages = []
        messages = conversation.messages;
        const latest = messages[messages.length-1]
        res.status(200).json(latest);

    } catch (error) {
        console.log("Error in getMessgae controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};