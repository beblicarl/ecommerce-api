const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const signup = async (req, res, next) => {
    const { firstname, lastname, email, password } = req.body;

    try {
        
    let data = await User.findOne({ email });
    if (data) return res.status(400).send("User already registered.");

        const userData = await User.create({
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: password,
        });

        await userData.save();
        console.log(userData)

        await res.status(201).json({
            message: "Signup successful",
            user: {
                firstname: userData.firstname,
                lastname: userData.lastname,
                email: userData.email,
                id : userData._id
            },
        });
    } catch (error) {
        return next(error);
    }
};

const login = (req, res, { err, user, info }) => {
    if (!user) {
        return res.status(401).json({ message: "email or password is incorrect" });
    }

    req.login(user, { session: false }, async (error) => {
        if (error) return res.status(401).json({ message: error });

        const body = { _id: user._id, email: user.email };

        const token = jwt.sign({ user: body }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        return res.status(200).json({ 
            message: "Login successful",
            token: token 
        });
    });
};

module.exports = {
    signup,
    login
}