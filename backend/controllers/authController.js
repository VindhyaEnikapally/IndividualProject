const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER
const register = async (req, res) => {

    try {

        const { username, email, password } = req.body;

        // Check Existing User
        const existingUser = await User.findOne({ email });

        if(existingUser){
            return res.status(400).json({
                message: "User already exists"
            });
        }

        // Hash Password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create User
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        await newUser.save();

        res.status(201).json({
            message: "Registration Successful"
        });

    } catch(error){

        console.log(error);

        res.status(500).json({
            message: error.message
        });
    }
};

// LOGIN
const login = async (req, res) => {

    try {

        const { email, password } = req.body;

        // Check User
        const user = await User.findOne({ email });

        if(!user){
            return res.status(400).json({
                message: "Invalid Credentials"
            });
        }

        // Compare Password
        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(400).json({
                message: "Invalid Credentials"
            });
        }

        // JWT Token
        const token = jwt.sign(
            {
                id: user._id
            },
            "secretkey",
            {
                expiresIn: "7d"
            }
        );

        res.status(200).json({
            message: "Login Successful",
            token
        });

    } catch(error){

        console.log(error);

        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    register,
    login
};