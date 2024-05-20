import { BiLogOut } from "react-icons/bi";
import useLogout from "../../hooks/useLogout.js";

const LogoutButton = () => {
	const { loading, logout } = useLogout();

	return (
		<div className='mt-auto m-2'>
			{!loading ? (
				<BiLogOut className='w-8 h-8 text-white cursor-pointer' onClick={logout} />
			) : (
				<span className='loading loading-spinner'></span>
			)}
		</div>
	);
};
export default LogoutButton;