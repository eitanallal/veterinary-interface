import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

// Set up Sequelize with PostgreSQL
console.log("Connecting to database:", process.env.DATABASE_URL);
const sequelize = new Sequelize(process.env.DATABASE_URL as string, {
  dialect: "postgres",
  logging: false, // Disable SQL query logging
});

export default sequelize;
