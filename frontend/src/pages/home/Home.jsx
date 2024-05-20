import MessageContainer from '../../components/messages/MessageContainer';
import Sidebar from '../../components/sidebar/Sidebar';

const Home = () => {
  return (
    <div className='flex md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 w-full md:w-[860px] mb-4 md:justify-between'>
      <Sidebar />
      <MessageContainer className="hidden md:flex"/>
    </div>
  )
}

export default Home;