const bcrypt = require('bcrypt');
const UserModel = require('../models/userModel');
const jwt= require('jsonwebtoken');


const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (user) {
            return res.status(409).json({ msg: 'user already exits, please try login', success: false });
        }
        const userModel = new UserModel({ name, email, password });
        userModel.password = await bcrypt.hash(password, 10);
        await userModel.save()
      return  res.status(201).json({ msg: 'signup successfully', success: true });
    } catch (error) {
      return  res.status(500).json({ msg: "internal server error", success: false })
    }
}



const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (!user) {
            res.status(400).json({ msg: "user does not exist, please sign up first", success: false });
        }
        const isPassEqual = await bcrypt.compare(password, user.password);
        if (!isPassEqual) {
            res.status(400).json({ msg: "Authentication failed", success: false });
        }
        const jwtToken = jwt.sign(
            {email: user.email, _id: user._id},
            process.env.JWT_SECRET,
            {expiresIn: '24h'}
        )
      return res.status(200).json({
            msg:'login success',
            success: true,
            jwtToken,
            email,
            name: user.name
        })

    } catch (error) {
return res.status(500).json({msg:'internal server error', success:false})
    }
}

module.exports = { signup,
    login
 }