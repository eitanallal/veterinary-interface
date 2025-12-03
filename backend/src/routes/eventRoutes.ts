import { Router } from "express";
import {
  createEvent,
  exportAnimalToExcel,
  getAnimalWithEvents,
} from "../controllers/eventController";

const router = Router();

router.post("/animals/:animalId/events", createEvent);
router.get("/animals/:animalId/", getAnimalWithEvents);
router.get("/animals/:animalId/export", exportAnimalToExcel);

export default router;
