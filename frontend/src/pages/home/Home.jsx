import MessageContainer from '../../components/messages/MessageContainer';
import Sidebar from '../../components/sidebar/Sidebar';
import useConversation from '../../zustand/useConversation';

const Home = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();
	//const isSelected = selectedConversation?._id === conversation._id;
  return (
    <div>
      <div className='hidden md:flex md:h-full rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 md:w-full md:justify-between'>
        <Sidebar className={`${selectedConversation ? "": ""}`}/>
        <MessageContainer />
      </div>
      <div className='flex md:hidden rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 w-full mb-4 md:justify-between'>
        <Sidebar className={`${selectedConversation ? "": ""}`}/>
        <MessageContainer />
      </div>
    </div>
  )
}

export default Home;