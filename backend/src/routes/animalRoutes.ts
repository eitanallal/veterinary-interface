import { Router } from "express";
import {
  getAllAnimals,
  createAnimal,
  getAnimalById,
  deleteAnimal,
} from "../controllers/animalController";

const router = Router();

router.get("/animals", getAllAnimals);
router.post("/animals", createAnimal);
router.get("/animals/:id", getAnimalById);
router.delete("/animals/:id", deleteAnimal);

export default router;
