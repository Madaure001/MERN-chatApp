import Conversations from "./Conversations.jsx";
import SearchInput from "./SearchInput.jsx";
import LogoutButton from "./Logout.jsx";

const Sidebar = () => {
  return (
    <div className='md:border-r border-slate-500 flex flex-col md:w-2/3 w-full '>
      <div className="flex-start p-4">
        <h1 className="text-white font-bold text-lg">EazyChat</h1>
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