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

export const getAnimalWithEvents = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { animalId } = req.params;

  if (!animalId) {
    res.status(400).json({ error: "Animal ID is required" });
    return;
  }

  try {
    // Fetch the animal along with its events using Sequelize's `include` option
    const animal = await Animal.findOne({
      where: { id: animalId },
      include: {
        model: Event,
        as: "events",
        required: false,
      },
    });

    if (!animal) {
      res.status(404).json({ error: "Animal not found" });
      return;
    }
    res.status(200).json({
      animal: {
        id: animal.id,
        name: animal.name,
        species: animal.species,
        birth_date: animal.birth_date,
      },
      events: animal.events, // This will contain the associated events
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error retrieving animal and events" });
  }
};
