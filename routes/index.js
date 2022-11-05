import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.send("Tugas Backend & Database Week 2 - Kelompok");
});

export default router;
