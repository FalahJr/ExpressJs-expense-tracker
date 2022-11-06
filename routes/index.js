import { Router } from "express";
import userRoutes from "./UserRoute.js";
import financialRecords from "./FinancialRecordRoute.js";
import { checkCredentials } from "../middlewares/checkCredentials.js";

const router = Router();

router.get("/", (req, res) => {
  res.send("Tugas Backend & Database Week 2 - Kelompok");
});

router.use("/api/users/", userRoutes);
router.use("/api/financial_record/", checkCredentials, financialRecords);

export default router;
