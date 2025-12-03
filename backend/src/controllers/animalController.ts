import { Request, Response } from "express";
import Animal from "../models/animal";
import { Optional } from "sequelize";
import { NullishPropertiesOf } from "sequelize/lib/utils";
import { plainToClass } from "class-transformer";
import { CreateAnimalDTO } from "../dtos/animal.dto";
import { validate } from "class-validator";

export const getAllAnimals = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const animals = await Animal.findAll();
    res.json(animals);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving animals");
  }
};

export const createAnimal = async (
  req: Request,
  res: Response
): Promise<void> => {
  const animalData = plainToClass(CreateAnimalDTO, { ...req.body });
  const errors = await validate(animalData);
  if (errors.length > 0) {
    res.status(400).json({ errors });
    return;
  }
  try {
    const newAnimal = await Animal.create({
      name: animalData.name,
      species: animalData.species,
      birth_date: animalData.birth_date,
    } as Optional<Animal, NullishPropertiesOf<Animal>>);
    res.status(201).json(newAnimal);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating animal");
  }
};

export const deleteAnimal = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const animal = await Animal.findByPk(req.params.id);
    if (animal) {
      await animal.destroy();
      res.status(204).send();
    } else {
      res.status(404).send("Animal not found");
    }
  } catch (error) {
    res.status(500).send("Error deleting animal");
  }
};
