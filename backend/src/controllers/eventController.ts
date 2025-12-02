import { Request, Response } from "express";
import { validate } from "class-validator";
import { plainToClass } from "class-transformer";
import Event from "../models/event";
import Animal from "../models/animal";
import { CreateEventDTO } from "../dtos/event.dto";
import { Optional } from "sequelize";
import { NullishPropertiesOf } from "sequelize/lib/utils";

export const createEvent = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { animalId } = req.params;

  if (!animalId) {
    res.status(400).json({ error: "Animal ID is required" });
    return;
  }

  // Transform and validate the incoming data
  const eventData = plainToClass(CreateEventDTO, {
    ...req.body,
    animal_id: animalId,
  });

  const errors = await validate(eventData);
  if (errors.length > 0) {
    res.status(400).json({ errors });
    return;
  }

  try {
    // Check if animal exists
    const animal = await Animal.findByPk(animalId);
    if (!animal) {
      res.status(404).json({ error: "Animal not found" });
      return;
    }

    // Create the event
    const newEvent = await Event.create({
      type: eventData.type,
      description: eventData.description,
      event_date: eventData.event_date,
      animal_id: eventData.animal_id,
    } as Optional<Event, NullishPropertiesOf<Event>>);

    res.status(201).json(newEvent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating event" });
  }
};

export const getEventsByAnimalId = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { animalId } = req.params;

  if (!animalId) {
    res.status(400).json({ error: "Animal ID is required" });
    return;
  }

  try {
    // Check if animal exists
    const animal = await Animal.findByPk(animalId);
    if (!animal) {
      res.status(404).json({ error: "Animal not found" });
      return;
    }

    // Get all events for the animal
    const events = await Event.findAll({
      where: { animal_id: animalId },
    });

    res.status(200).json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error retrieving events" });
  }
};
