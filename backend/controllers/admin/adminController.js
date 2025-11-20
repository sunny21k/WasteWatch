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
    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Report not found",
      });
    }

    // Toggle verification
    report.verified = !report.verified;

    // Add/subtract points only once
    const user = await User.findById(report.user);
    if (user) {
      if (report.verified && !report.pointsAwarded) {
        user.points += 10; // Add points
        report.pointsAwarded = true;
      } else if (!report.verified && report.pointsAwarded) {
        user.points -= 10; // Remove points if unverified
        report.pointsAwarded = false;
      }
      await user.save();
    }

    await report.save();

    res.json({
      success: true,
      message: "Report verification updated",
      report,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
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

// Admin verifies completed report and awards points
export const verifyCompletedReport = async (req, res) => {
  try {
    const { reportId } = req.body;

    const report = await Report.findById(reportId).populate("collector");

    if (!report) {
      return res.status(404).json({ 
        success: false, 
        message: "Report not found" 
      });
    }

    if (!report.completed) {
      return res.status(400).json({ 
        success: false, 
        message: "Report not yet completed by collector" 
      });
    }

    if (report.completionVerified) {
      return res.status(400).json({ 
        success: false, 
        message: "Completed report already verified" 
      });
    }

    // Mark completion as verified
    report.completionVerified = true;
    await report.save();

    // Award 50 points to the collector if not already awarded
    if (!report.completionPointsAwarded && report.collector) {
      report.collector.points += 50;
      await report.collector.save();
      report.completionPointsAwarded = true;
      await report.save();
    }

    res.json({ 
        success: true, 
        message: "Completed report verified and points awarded", 
        report 

    });
  } catch (error) {
    console.log("VerifyCompletedReport error:", error.message);
    res.status(500).json({ 
        success: false, 
        message: error.message 
    });
  }
};
