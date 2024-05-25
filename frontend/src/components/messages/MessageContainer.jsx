import { useEffect } from "react";
import useConversation from "../../zustand/useConversation.js";
import MessageInput from "./MessageInput.jsx";
import Messages from "./Messages";
import { TiMessages } from "react-icons/ti";
import { useAuthContext } from "../../context/AuthContext.jsx";
import { MdOutlineArrowBackIosNew } from "react-icons/md";

const MessageContainer = () => {
	const { selectedConversation, setSelectedConversation } = useConversation();

	useEffect(() => {
		// cleanup function (unmounts)
		return () => setSelectedConversation(null);
	}, [setSelectedConversation]);

	const clearSelected = () => {
		setSelectedConversation(null)
	}

	return (
		<div>
			<div className='md:flex min-w-[480px] border-l-2 border-gray-500 flex-col p-4 h-[90vh] hidden'>
				{!selectedConversation ? (
					<NoChatSelected />
				) : (
					<>
						{/* Header */}
						<div className='bg-slate-500 px-8 rounded-lg py-2 mb-2'>
							<span className='label-text'>To:</span>{" "}
							<span className='text-gray-900 font-bold'>{selectedConversation.fullName}</span>
						</div>
						<Messages />
						<MessageInput />
					</>
				)}
			</div>
			<div className={` w-full h-[90vh] ${selectedConversation ? "flex flex-col p-2 md:hidden" : "hidden"}`}>
				{/* Header */}
				<div className="flex gap-2 p-2 w-full">
					<MdOutlineArrowBackIosNew 
						className="mb-1 w-7 h-7 bg-gray-500 rounded-full text-white/[0.4]"
						onClick={clearSelected}
					/>
				
					<div className='bg-slate-500 px-4 rounded-lg py-1 mb-2 w-full'>
						
						<span className='label-text'>To:</span>{" "}
						<span className='text-gray-900 font-bold'>{selectedConversation?.fullName}</span>
					</div>
				</div>
				<Messages />
				<MessageInput />
			</div>
		</div>
		
	);
};
export default MessageContainer;

const NoChatSelected = () => {
	const { authUser } = useAuthContext();
	return (
		<div className='flex items-center justify-center w-full h-full'>
			<div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
				<p>Welcome 👋 {authUser.fullName} ❄</p>
				<p>Select a chat to start messaging</p>
				<TiMessages className='text-3xl md:text-6xl text-center' />
			</div>
		</div>
	);
};

// STARTER CODE SNIPPET
// import MessageInput from "./MessageInput";
// import Messages from "./Messages";

// const MessageContainer = () => {
// 	return (
// 		<div className='md:min-w-[450px] flex flex-col'>
// 			<>
// 				{/* Header */}
// 				<div className='bg-slate-500 px-4 py-2 mb-2'>
// 					<span className='label-text'>To:</span> <span className='text-gray-900 font-bold'>John doe</span>
// 				</div>

// 				<Messages />
// 				<MessageInput />
// 			</>
// 		</div>
// 	);
// };
// export default MessageContainer;