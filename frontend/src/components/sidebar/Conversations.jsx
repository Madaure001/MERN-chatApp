import useGetConversations from "../../hooks/useGetConversations.js";
import { getRandomEmoji } from "../../utils/emojis";
import Conversation from "./Conversation.jsx";
import useGetMessages from "../../hooks/useGetMessages.js";
import { useEffect, useState } from "react";
import useConversation from "../../zustand/useConversation.js";


const Conversations = () => {
	const { loading, conversations } = useGetConversations();	

	return (
		<div className='flex flex-col overflow-auto px-2 rounded-2xl mb-2'>
			{conversations.map((conversation, idx) => (
				<Conversation
					key={conversation._id}
					conversation={conversation}
					emoji={getRandomEmoji()}
					lastIdx={idx === conversations.length - 1}
				/>
			))}

			{loading ? <span className='loading loading-spinner mx-auto'></span> : null}
		</div>
	);
};
export default Conversations;

// STARTER CODE SNIPPET
// import Conversation from "./Conversation";

// const Conversations = () => {
// 	return (
// 		<div className='py-2 flex flex-col overflow-auto'>
// 			<Conversation />
// 			<Conversation />
// 			<Conversation />
// 			<Conversation />
// 			<Conversation />
// 			<Conversation />
// 		</div>
// 	);
// };
// export default Conversations;