import bcrypt from 'bcryptjs'
import User from "../models/user.model.js";
import generateTokenAndSetCookie from '../utils/generateTokens.js';

export const login = async (req, res) => {
    try {

        const {username, password} = req.body;
        const user = await User.findOne({username});                //find one user in the database
        const isPasswordCorrect = await bcrypt.compare(password, user.password || "");  //compare password to user password or an empty string for invalid username
        
        if (!user || !isPasswordCorrect){                           //invalid username or wrong password
            return res.status(400).json({error: "Invalid username or password"});
        }

        generateTokenAndSetCookie(user._id, res);               //if user is found and password match

        res.status(200).json({                                  //retrieve the user details
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            profilePic: user.profilePic,
        })

    } catch (error) {
        console.log("Error in login contoller", error.message);
        res.status(500).json({error: "Internal Server Error"});
    }
}

export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", {maxAge:0});
        res.status(200).json({message: "Logged out successfully"});
    } catch (error) {
        console.log("Error in logout contoller", error.message);
        res.status(500).json({error: "Internal Server Error"});
    }
}

