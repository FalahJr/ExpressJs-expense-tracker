import {
  createFinancialRecord,
  showFinancialRecord,
  updateFinancialRecord,
  deleteFinancialRecord,
} from "../controllers/FinancialRecordsControllers.js";
import { Router } from "express";

const router = Router();

router.get("/", showFinancialRecord);
router.post("/create", createFinancialRecord);
router.put("/update/:id", updateFinancialRecord);
router.delete("/delete/:id", deleteFinancialRecord);

export default router;
