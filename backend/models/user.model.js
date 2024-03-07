import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
            minlength: 7
        },
        username: {
            type: String,
            required: true,
            unique: true,
            minlength: 6,
        },
        password:{
            type: String,
            required: true,
            minlength: 8
        },
        gender:{
            type: String,
            required: true,
            enum: ["male", "female"]
        },
        profilePic: {
            type: String,
            default: ""
        },
        //createdAt, updatedAt => Member since <createdAt>
    }, 
    {timestamps: true}
);

const User = mongoose.model("User", userSchema);

export default User;