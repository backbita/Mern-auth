import asyncHandler from "express-async-handler"
import User from '../models/userModel.js'
import generateToken from "../utils/generateToken.js"

// @desc login user/set token
// route POST /api/users/auth
// @access public
const authUser = asyncHandler(async (req, res) => {
    const {email , password} = req.body
    const userExist = await User.findOne({email: email})
    if(!userExist){
        res.status(401)
        throw new Error('invalid email or password')
    } else if(userExist && await userExist.matchPasswords(password)) {
        generateToken(res, userExist._id)
        res.status(201).json({
            _id: userExist._id,
            name: userExist.name,
            email: userExist.email,
        })

    } else {
        res.status(401)
        throw new Error('invalid email or password')
    }  
}) 
// @desc Register new user
// route POST /api/users
// @access public
const registerUser = asyncHandler(async (req, res) => {
    const {name , email , password} = req.body

    const userExist = await User.findOne({email: email})
    
   
    if(userExist){
        res.status(400)
        throw new Error ('User already exist')
    }
    const user = await User.create({
        name,
        email,
        password
    })

    if(user){
        generateToken(res, user._id)
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
        })
    } else {
        res.status(400)
        throw new Error('invalid user data')
    }
    
   
    
}) 
// @desc Logout user
// route POST /api/users/logout
// @access private
const logoutUser = asyncHandler(async (req, res) => {
    // res.clearCookie('jwt');
    res.cookie('jwt', '',{
        httpOnly: true,
        expires: new Date(0)
    })
    res.status(200).json({ message: 'Logout'})
    
}) 
// @desc get User Profile
// route GET /api/users/profile
// @access private
const profileUser = asyncHandler(async (req, res) => {
    const user = {
        _id: req.user._id,
        name:req.user.name,
        email: req.user.email,
    }
    console.log(req.user)
    res.status(200).json(user)
    
}) 
// @desc get User Profile
// route GET /api/users/profile
// @access private
const editUser = asyncHandler(async (req, res) => {
    

    const user = await User.findById(req.user._id)

    if(user){
       
            user.name = req.body.name || user.name
            user.email = req.body.email || user.email
        if(req.body.password){
            user.password = req.body.password
        }
        const updatedUser = await user.save()

        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email
        })
    } else {
        res.status(404)
        throw new Error('user not found')
    }
    
    res.status(200).json({ message: 'edit User'})
    
}) 

export {
    authUser,
    registerUser,
    logoutUser,
    profileUser,
    editUser

}