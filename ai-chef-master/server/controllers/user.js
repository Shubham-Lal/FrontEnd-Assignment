const User = require('../models/user.js');
const bcrypt = require('bcrypt');
const { authToken } = require('../utils/authToken.js');

module.exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const userData = {
            username: username.trim(),
            password: password.trim()
        }

        const user = await User.findOne({ username: username.trim() });
        if (!user) return res.status(400).json({ success: false, msg: "User doesn't exists!" });

        const verify = await bcrypt.compare(userData.password, user.password);
        if (!verify) return res.status(400).json({ success: false, msg: "Incorrect password!" });

        const token = authToken({ id: user._id.toString() }, "1d");

        return res.status(200).json({
            success: true,
            msg: "Login success!",
            data: {
                _id: user._id,
                username: user.username,
                token
            }
        });
    }
    catch (error) {
        res.status(500).json({ success: false, msg: "Internal Server Error" });
    }
};

module.exports.register = async (req, res) => {
    try {
        const { username, password } = req.body;

        const userData = {
            username: username.trim(),
            password: password.trim()
        };

        if (!userData.username) return res.status(405).json({ success: false, msg: "Enter your username!" });
        else if (!userData.password) return res.status(405).json({ success: false, msg: "Enter your password!" });
        else if (userData.password.length < 8) return res.status(405).json({ success: false, msg: "Password must be atleast 8 characters!" });


        const user_exists = await User.findOne({ username: userData.username });
        if (user_exists) return res.status(405).json({ success: false, msg: "Username already exists!" });

        const encryptedPassword = await bcrypt.hash(userData.password, 12);
        await new User({
            username: userData.username,
            password: encryptedPassword,
        }).save();

        return res.status(200).json({ success: true, msg: "User created. Login to proceed!" });
    } catch (error) {
        res.status(500).json({ success: false, msg: "Try again." });
    }
};