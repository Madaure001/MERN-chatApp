import Conversations from "./Conversations.jsx";
import SearchInput from "./SearchInput.jsx";
import LogoutButton from "./Logout.jsx";
import useConversation from "../../zustand/useConversation.js";

const Sidebar = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();

  return (
    <div className={`  ${selectedConversation ? " hidden md:flex flex-col border-r border-slate-500 max-w-[30vw] w-full" : "w-full md:w-[35vw] "}`}>
      <div className="flex-start p-4">
        <h1 className="text-blue-400 font-bold text-2xl">EazyChat</h1>
      </div>
      <SearchInput />
      <div className="py-2 px-3"></div> {/*for a cleaner UI*/}
      <Conversations />
      <LogoutButton />
      <div className="py-1 px-3"></div> {/*for a cleaner UI*/}
    </div>
  )
}

export default Sidebar;