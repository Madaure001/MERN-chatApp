import { useEffect, useState } from "react";
import { useSocketContext } from "../../context/SocketContext.jsx";
import useConversation from "../../zustand/useConversation.js";
import toast from "react-hot-toast";
import { extractTime } from "../../utils/ExtractTime.js";

const Conversation = ({ conversation, lastIdx, emoji }) => {
	const { selectedConversation, setSelectedConversation } = useConversation();
	const isSelected = selectedConversation?._id === conversation._id;
	const { onlineUsers } = useSocketContext();
	const isOnline = onlineUsers.includes(conversation._id);

	const [latestText, setLatestText] = useState();
	const [formattedTime, setformattedTime] = useState();

	useEffect(() => {
		const getMessages = async () => {
			//setLoading(true);
			try {
				const res = await fetch(`/api/messages/sidebar/${conversation._id}`);
				const data = await res.json();
				if (data.error) throw new Error(data.error);
				console.log(data?.message)
				data?.message?.length > 30 ? 
					setLatestText(`${data?.message.slice(0,15)}. . .`)
					: setLatestText(data?.message)
				setformattedTime(extractTime(data?.createdAt));

				/*for (let index = 0; index < listConversation.length; index++) {
					const element = listConversation[index];
					//if (data.receiverId === element.receiverId)
					
				}*/

			} catch (error) {
				toast.error(error.message);
			} finally {
				//setLoading(false);
			}
		};

		getMessages();
		console.log(latestText?.message)
	}, [selectedConversation]);

	return (
		<>
			<div
				className={` flex gap-2 items-center hover:bg-sky-500 rounded-2xl p-1 cursor-pointer
					${isSelected ? "bg-sky-500 text-white" : "text-white/[0.4] hover:text-white"} w-full
				`}
				onClick={() => setSelectedConversation(conversation)}
			>
				<div className={`avatar ${isOnline ? "online" : ""}`}>
					<div className='w-8 md:w-10 rounded-full'>
						<img src={conversation.profilePic} alt='user avatar' />
					</div>
				</div>

				<div className="w-full">
					<div className=' flex flex-col '>
						<div className="flex items-start">
							<p className='font-semibold text-gray-100 capitalize'>{conversation.fullName}</p>
						</div>
							
						<div className=' flex justify-between '>	
							<div className=" w-4/5 flex items-start">
								<p className={`text-xs `}>
									{`${latestText ? latestText : "Click to start"}` }
								</p>
							</div>						
							<div className="w-1/10 items-baseline content-end justify-end right-2 text-end">
								<p className="text-xs text-black/[0.7]">
									{`${latestText ? formattedTime : ""}`}
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			{!lastIdx && <div className='divider my-0 py-0 h-1' />}
		</>
	);
};
export default Conversation;

// STARTER CODE SNIPPET
// const Conversation = () => {
// 	return (
// 		<>
// 			<div className='flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer'>
// 				<div className='avatar online'>
// 					<div className='w-12 rounded-full'>
// 						<img
// 							src='https://cdn0.iconfinder.com/data/icons/communication-line-10/24/account_profile_user_contact_person_avatar_placeholder-512.png'
// 							alt='user avatar'
// 						/>
// 					</div>
// 				</div>

// 				<div className='flex flex-col flex-1'>
// 					<div className='flex gap-3 justify-between'>
// 						<p className='font-bold text-gray-200'>John Doe</p>
// 						<span className='text-xl'>🎃</span>
// 					</div>
// 				</div>
// 			</div>

// 			<div className='divider my-0 py-0 h-1' />
// 		</>
// 	);
// };
// export default Conversation;