import bcrypt from 'bcryptjs';
import User from "../models/user.model.js";
import generateTokenAndSetCookie from '../utils/generateTokens.js';
import { handleErrorInput } from './handleErrorInput.js';


export const signup = async (req, res) => {
    try {

        const { fullName, username, password, confirmPassword, gender, profilePic } = req.body;
        const success = handleErrorInput({ fullName, username, password, confirmPassword, gender});
        if(!success) {
            return res.status(400).json({ error: "Invalid user data" });
        };
        
        const user = await User.findOne({ username });

        if (user) {                         //check if username is unique
            return res.status(400).json({ error: "username already exist" });
        };

        //HASH PASSWORD HERE
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //create a random profile picture (use api)
        const boyProfilePic = "https://avatar.iran.liara.run/public/boy?username=${username}";
        const girlProfilePic = "https://avatar.iran.liara.run/public/girl?username=${username}";

        const newUser = new User({
            fullName,
            username,
            password: hashedPassword,
            gender,
            profilePic: gender === "male" ? boyProfilePic : girlProfilePic
        });

        if (newUser) {
            //generate JWT token
            generateTokenAndSetCookie(newUser._id, res);

            await newUser.save(); //save the new created user

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                profilePic: newUser.profilePic
            });
        } else {
            res.status(400).json({ error: "Invalid user data" });
        }

    } catch (error) {
        console.log("Error in signup contoller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
