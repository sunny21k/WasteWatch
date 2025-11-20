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

// Gets all Reports 
export const getAllReports = async (req, res) => {
    try {
        const reports = await Report.find({}).populate("user", "name").sort({ createdAt: -1 });
        res.json({
            success: true, 
            reports
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

// Get user's reports
export const getMyReports = async (req, res) => {
  try {
    const userId = req.user.id; 

    const reports = await Report.find({ user: userId }).sort({ createdAt: -1 });

    res.json({
      success: true,
      reports
    });

  } catch (error) {
    res.json({
      success: false,
      message: error.message
    });
  }
};

// Collects the report
export const collectReport = async (req, res) => {
  try {
    const { reportId, userId } = req.body;
    const report = await Report.findById(reportId);

    if (!report) {
      return res.status(404).json({ 
        success: false, 
        message: "Report not found" 
      });
    }

    // Only allow collection if verified
    if (!report.verified) {
      return res.status(400).json({ 
        success: false, 
        message: "Report not verified yet" 
      });
    }

    // Check if already being collected
    if (report.status === "pending" || report.status === "collected") {
      return res.status(400).json({ 
        success: false, 
        message: "Report is already being collected" 
      });
    }

    // Update report with collector and status
    report.status = "pending";
    report.collector = userId;
    await report.save();

    res.json({ 
      success: true, 
      message: "Report collection started", 
      report 
    });
  } catch (error) {
    console.log("CollectReport error:", error.message);
    res.status(500).json({
      success: false, 
      message: error.message 
    });
  }
};

// Get reports being collected by user
export const getMyCollections = async (req, res) => {
  try {
    const userId = req.user.id;

    const collections = await Report.find({ collector: userId })
      .populate("user", "name")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      collections
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message
    });
  }
};