import { Sequelize } from "sequelize-typescript";
import Animal from "./animal";
import Event from "./event";

export const sequelize = new Sequelize({
  dialect: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "veterinary_clinic",
  models: [Animal, Event],
});

// Export models for use elsewhere
export { Animal, Event };
