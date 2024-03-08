import { IoSearchSharp } from "react-icons/io5";

const SearchInput = () => {
  return (
    <form className="flex items-center gap-2">
        <input type="text" placeholder="Search_" className="input input-bordered rounded-full bg-gray-700 border-gray-600 text-white" />
        <button type='submit' className='btn btn-circle bg-sky-500 text-white'>
 				<IoSearchSharp className='w-6 h-6 outline-none' />
 		</button>
    </form>
  )
}

export default SearchInput