import User from "../models/User.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs";

// Generates JWT 
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: "30d"
    })
}

// Register a new users
export const registerUser = async (req, res) => {
    const {name, email, password} = req.body;

    try {

        // Check if user with the email already exists
        const userExists = await User.findOne({email})

        if (userExists) {
            return res.json({
                success: false, 
                message: "User already exists"
            })
        }
        
        // Creates new user in the database
        const user = await User.create({name, email, password})
        
        // Generate JWT for the new user
        const token = generateToken(user._id)
        res.json({
            success: true,
            token
        })
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}

// Login existing user
export const loginUser = async (req, res) => {
    const {email, password} = req.body;

    try {

        // Finds user by email
        const user = await User.findOne({email})
        if (user) {

            // Compares password with hashed password in database
            const doesExist = await bcrypt.compare(password, user.password)

            if (doesExist) {

                // Generates JWT if password is correct
                const token = generateToken(user._id)
                return res.json({
                    success: true,
                    token
                })
            }
        }
        return res.json({
            success: false,
            message: "Invalid email or password"
        })

    } catch (error) {
        return res.json({
            success: false, 
            message: error.message
        })
    }
}

// Get logged in user data
export const getUser = async (req, res) => {
    try {
        const user = req.user;

        // Check if user exists
        if (!user) {
            return res.json({
                success: false,
                message: "User not found"
            })
        }

        // Return certain fields except password
        return res.json({
            success: true, 
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                points: user.points
            }
        })
    } catch (error) {
        return res.json({
            success: false, 
            message: error.message
        })
    }
}