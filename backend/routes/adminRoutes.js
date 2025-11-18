import { protect } from "../middleware/authMiddleware.js";
import { admin } from "../middleware/adminMiddleware.js";
import { getAllReports, verifyReport, deleteReport } from "../controllers/adminController.js";

router.get("/all-reports", protect, admin, getAllReports);
router.post("/verify", protect, admin, verifyReport);
router.post("/delete", protect, admin, deleteReport);
