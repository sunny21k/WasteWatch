import Report from "../../models/Report.js"
import User from "../../models/User.js"

// Gets all Reports 
export const getAllReports = async (req, res) => {
    try {
        const reports = await Report.find({})
            .populate("user", "name")
            .sort({ createdAt: -1 });
        
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

// Verify a report
export const verifyReport = async (req, res) => {
    try {
        const { id } = req.body;

        // Find the report
        const report = await Report.findById(id);
        // console.log("Report found:", report);  
        if (!report) {
            return res.status(404).json({
                success: false,
                message: "Report not found"
            });
        }

        // console.log("Report user ID:", report.user);

        // Toggle verification
        report.verified = !report.verified;
        await report.save();
        console.log("Report saved with verified:", report.verified);

        // Update user points if verified
        if (report.verified) {
            const user = await User.findById(report.user);
            // console.log("User BEFORE update:", user); 

            if (user) {
                user.points += 10; // Add 10 points
                await user.save();
                // console.log("User AFTER update:", user); 
            } else {
                console.log("User not found for this report!");
            }
        }

        res.json({
            success: true,
            message: "Report verified",
            report
        });
    } catch (error) {
        // console.log("Error in verifyReport:", error.message);
        res.json({
            success: false,
            message: error.message
        });
    }
};


// Delete report
export const deleteReport = async (req, res) => {
    try {
        const { id } = req.body;

        const report = await Report.findByIdAndDelete(id);
        if (!report) {
            return res.status(404).json({ 
                success: false, 
                message: "Report not found" 
            });
        }

        res.json({ 
            success: true,
            message: "Report deleted" 
        });

    } catch (error) {
        res.json({ 
            success: false, 
            message: error.message 
        });
    }
};
