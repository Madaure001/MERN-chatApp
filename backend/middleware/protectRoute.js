import  jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

const protectRoute = async (req, res, next) => {                    //async function to enable the use of wait
    try {
       const token = req.cookies.jwt;
              
       if(!token) {
        return res.status(401).json({ error: "Unauthorized - No Token provided"});
       }

       const decoded = jwt.verify(token, process.env.JWT_SECRET);   //decode the token to verify using the secret

       if (!decoded) {
        return res.status(401).json({ error: "Unauthorized - Invalid Token"});        
       }

       const user = await User.findById(decoded.userId).select("-password");            //userId was used to sign the token

       if(!user) {
        return res.status(404).json({ error: "User not found"});
       }

       req.user = user                          //currently authenticated user
       next();                                  //when authenticated, call the next function

    } catch (error) {
        console.log("Error in protectRoute middleware: ", Error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

export default protectRoute;