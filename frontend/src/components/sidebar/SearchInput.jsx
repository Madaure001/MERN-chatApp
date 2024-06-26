import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import useConversation from "../../zustand/useConversation.js";
import useGetConversations from "../../hooks/useGetConversations.js";
import toast from "react-hot-toast";

const SearchInput = () => {
	const [search, setSearch] = useState("");
	const { setSelectedConversation } = useConversation();
	const { conversations } = useGetConversations();

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!search) return;
		if (search.length < 3) {
			return toast.error("Search term must be at least 3 characters long");
		}

		const conversation = conversations.find((c) => c.fullName.toLowerCase().includes(search.toLowerCase()));

		if (conversation) {
			setSelectedConversation(conversation);
			setSearch("");
		} else toast.error("No such user found!");
	};

	const searchResults = (e) => {
		e.preventDefault();
		if (!search) return;
		if (search.length < 2) {
			return toast.error("Search term must be at least 2 characters long");
		}
		
		const nameSearch = conversations.find((c) => c.fullName.toLowerCase().includes(search.toLowerCase()));
		const textSearch = conversations.find((c) => c.message.toLowerCase().includes(search.toLowerCase()));

		if (nameSearch) {
			setSelectedConversation(nameSearch);
			setSearch("");
		}
		if (textSearch) {
			setSelectedConversation(textSearch);
			setSearch("");
		}
		else toast.error("No such user found!");
	};
	return (
		<form onSubmit={handleSubmit} className="px-2">
			<div className=" flex bg-white md:hidden rounded-xl px-8 gap-2">
				<IoSearchSharp className='w-7 h-5 my-1 text-gray-400 ' />
				<input
					type='search'
					placeholder='Search…'
					className='py-1'
					value={search}
					onChange={(e) => {setSearch(e.target.value); searchResults()}}
				/>
			</div>

			<div className='hidden md:flex items-center gap-2'>
				<input
					type='search'
					placeholder='Search…'
					className='w-full h-8 md:h-8 px-4 rounded-xl'
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>
				<button type='submit' className='btn-sm btn-circle bg-sky-500 text-white'>
					<IoSearchSharp className='w-8 h-5 outline-none' />
				</button>
			</div>
			
		</form>
	);
};
export default SearchInput;

// STARTER CODE SNIPPET
// import { IoSearchSharp } from "react-icons/io5";

// const SearchInput = () => {
// 	return (
// 		<form className='flex items-center gap-2'>
// 			<input type='text' placeholder='Search…' className='input input-bordered rounded-full' />
// 			<button type='submit' className='btn btn-circle bg-sky-500 text-white'>
// 				<IoSearchSharp className='w-6 h-6 outline-none' />
// 			</button>
// 		</form>
// 	);
// };
// export default SearchInput;