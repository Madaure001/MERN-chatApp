import { toast } from "react-hot-toast";

export function handleSignupErrors({ fullName, username, password, confirmPassword, gender }) {

    const pattern = /^[a-zA-Z0-9]+$/;
    const patternName = /^[a-zA-Z ]+$/;

    if (!fullName || !username || !password || !confirmPassword || !gender) {
        toast.error('Please fill in all fields');
        return false;
    };

    if (password !== confirmPassword) {
        toast.error('Passwords do not match');
        return false;
    };

    if (password.length < 8) {
        toast.error('Password must be at least 8 characters');
        return false;
    };

    if (username.length < 6) {
        toast.error('username must be at least 6 characters');
        return false;
    };

    if (!pattern.test(username)) {
        toast.error('Username cannot have special characters');
        return false;
    };

    if (!patternName.test(fullName)) {
        toast.error('Full names cannot have special characters');
        return false;
    };

    if (fullName.length < 7) {
        toast.error('Full names too short');
        return false;
    };

    return true;

}
