import Report from "../../models/Report.js"

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

// Verify a report
export const verifyReport = async (req, res) => {
    try {
        const { id } = req.body;
        const report = await Report.findById(id);
        if (!report) {
            return res.status(404).json({
                 success: false, 
                 message: "Report not found" 
                });
        }
        report.verified = !report.verified;
        await report.save(); 
        res.json({
             success: true, 
             message: "Report verified", report 
            });
    } catch (error) {
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

