import User from "../models/User.js";
import jwt from "jsonwebtoken"

// Middleware for protected routes
export const protect = async (req, res, next) => {

    let token = req.headers.authorization;

    try {

        // Verifies token using the secret key and decodes it
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const userId = decoded.id

        // Find user in database
        const user = await User.findById(userId)

        // If user not found, return an error
        if (!user) {
            return res.json({
                success: false,
                message: "User not found"
            })
        }

        // Assign user object to the request
        req.user = user;
        next()
    } catch (error) {
        res.status(401).json({
            message: "Not authorized"
        })
    }
}