import express from "express";
import { getOffers, createOffer, getOneOffer, deleteOffer, updateOffer, searchOffers } from "../controllers/offerController.js";

const router = express.Router();

router.get("/", getOffers);
router.post("/", createOffer);
router.post("/off",getOneOffer);
router.delete("/:id",deleteOffer);
router.put("/off/:id", updateOffer);
router.get('/search', searchOffers);

export default router;