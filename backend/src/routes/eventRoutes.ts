import { Router } from "express";
import {
  createEvent,
  getEventsByAnimalId,
} from "../controllers/eventController";

const router = Router();

router.post("/animals/:animalId/events", createEvent);
router.get("/animals/:animalId/events", getEventsByAnimalId);

export default router;
