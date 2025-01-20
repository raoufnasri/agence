import express from "express";
import {
  getReservations,
  createReservation,
  updateReservation,
  deleteReservation,
  getAllReservations,
  payment,
} from "../controllers/reservationController.js";

const router = express.Router();

router.get("/", getReservations);
router.post("/", createReservation);
router.put("/:id", updateReservation);
router.delete("/:id", deleteReservation);
router.get("/res", getAllReservations);
router.put("/pay/:id", payment)



export default router;
