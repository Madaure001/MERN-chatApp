import { create } from "zustand";

const useConversation = create((set) => ({
	selectedConversation: null,             //trace selected convo to display
	setSelectedConversation: (selectedConversation) => set({ selectedConversation }),   //change selected convo
	messages: [],                           //selected convo messages
	setMessages: (messages) => set({ messages }),   //setting messages of convo
}));

export default useConversation;