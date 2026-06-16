const jwt= require('jsonwebtoken');
const User = require('../models/userModel.js');
function createToken(user) {
    return jwt.sign(
        {
            id: user._id,
            email: user.email,
            role: user.role,
        },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );
}

async function registerUser(req,res,next){
    try{
        const {name, email, password, role } = req.body;
        if(!name || !email || !password || !role){
            return res.status(400).json({error: 'name, email, password, and role are required'});
        }
        if(!['admin', 'member'].includes(role)){
            return res.status(400).json({error: 'role must be admin or member'});
        }
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(409).json({error: 'email is already registered'});
        }
        const user = await User.create({name, email, password, role});

        res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error){
        next(error);
    }
}

async function login(req,res,next){
    try{
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({errror: 'email and password are required'});
        }
        const user =await User.findOne({email});
        if(!user){
            return res.status(401).json({error: 'Invalid email or password'});
        }
        const isPasswordValid = await user.commparePassword(password);
        if(!isPasswordValid){
            return res.status(401).json({error: 'Invalid email or password'});
        }
        res.json({
            message: 'Login successful',
            token: createToken(user),
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error){
        next(error);
    }
}
module.exports = {register, login};