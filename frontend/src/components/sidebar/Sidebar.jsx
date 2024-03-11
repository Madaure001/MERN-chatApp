import Conversations from "./Conversations.jsx";
import SearchInput from "./SearchInput.jsx";
import LogoutButton from "./Logout.jsx";

const Sidebar = () => {
  return (
    <div className='border-r border-slate-500 p-4 flex flex-col'>
        <SearchInput />
        <div className="divider px-3"></div> {/*for a cleaner UI*/}
        <Conversations />
        <LogoutButton />
    </div>
  )
}

export default Sidebar;