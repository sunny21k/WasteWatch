import imagekit from "../config/imageKit.js";
import Report from "../models/Report.js";
import fs from "fs"

// Create a new Waste Report
export const createReport = async (req, res) => {
    try {
        const {wasteType, quantity, location, description} = JSON.parse(req.body.report);

        const imageFile = req.file;

        // Check if all fields are present

        if (!wasteType || !quantity || !location) {
            return res.json({
                success: false,
                message: "Missing required fields"
            })
        }

        const fileBuffer = fs.readFileSync(imageFile.path)

        // Upload image to imagekit
        const response = await imagekit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder: "/reports"
        })

        // Optimizes image using imagekit
        const optimizedImageUrl = imagekit.url({
            path: response.filePath,
            transformation: [
                {quality: "auto"},
                {format: "webp"},
                {width: "1280"}
            ]
        })

        const image = optimizedImageUrl;

        await Report.create({
            user: req.user._id,
            wasteType, 
            quantity, 
            location, 
            description,
            image
        })

        res.json({
            success: true,
            message: "Report added successfully"
        })
        
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}