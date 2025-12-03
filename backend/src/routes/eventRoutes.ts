import { Router } from "express";
import {
  createEvent,
  getAnimalWithEvents,
} from "../controllers/eventController";

const router = Router();

router.post("/animals/:animalId/events", createEvent);
router.get("/animals/:animalId/", getAnimalWithEvents);

export default router;
