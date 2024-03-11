import Conversations from "./Conversations";
import SearchInput from "./SearchInput";
import LogoutButton from "./Logout"

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