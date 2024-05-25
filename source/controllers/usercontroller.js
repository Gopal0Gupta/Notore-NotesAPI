const userModel = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;

const signup = async (req, res) => {
    const { username, password, email } = req.body;

    // Validate request body
    if (!username || !password || !email) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const existingUser = await userModel.findOne({ email: email });

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashpassword = await bcrypt.hash(password, 10);

        const result = await userModel.create({
            email: email,
            password: hashpassword,
            username: username,
        });

        const token = jwt.sign({ email: result.email, id: result._id }, SECRET_KEY);

        return res.status(201).json({ result: result, token: token });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};

const signin = async (req, res) => {
    // Signin logic here
    const { email, password } = req.body;

    try {
        const existingUser = await userModel.findOne({ email: email });

        if (!existingUser) {
            return res.status(404).json({ message: 'User not found' });

        }
        const matchpassword = await bcrypt.compare(password, existingUser.password);

        if(!matchpassword){
            return res.status(400).json({message : "invalid credentials"});
        }

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, SECRET_KEY);

        return res.status(200).json({ result: existingUser, token: token });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};

module.exports = { signup, signin };
