import bcrypt from 'bcryptjs'
import User from "../models/user.model.js";
import generateTokenAndSetCookie from '../utils/generateTokens.js';

export const signup = async (req, res) => {
   try {
    const {fullName, username, password, confirmPassword, gender, profilePic} = req.body;

    if (password !== confirmPassword) {                                 //check if passwords match
        return res.status(400).json({error:"Passwords do not match"})
    };

    const user = await User.findOne({username});

    if (user){                                                          //check if username is unique
        return res.status(400).json({error: "username already exist"})
    };

    //HASH PASSWORD HERE
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //create a random profile picture (use api)
    const boyProfilePic = "https://avatar.iran.liara.run/public/boy?username=${username}";
    const girlProfilePic = "https://avatar.iran.liara.run/public/girl?username=${username}";

    const newUser = new User({                                              //create a new user                
        fullName, 
        username,
        password: hashedPassword,
        gender,
        profilePic: gender === "male" ? boyProfilePic : girlProfilePic
    });

    if(newUser){
        //generate JWT token
        generateTokenAndSetCookie(newUser._id, res);

        await newUser.save();                               //save the new created user

        res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            username: newUser.username,
            profilePic: newUser.profilePic
        });
    }else{
        res.status(400).json({error: "Invalid user data"});
    }

   } catch (error) {
    console.log("Error in signup contoller", error.message);
    res.status(500).json ({error: "Internal Server Error"});
   }
}

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

