import express from "express";
import { sequelize } from "./models"; // Import the initialized sequelize instance
import cors from "cors";
import animalRoutes from "./routes/animalRoutes";
import eventRoutes from "./routes/eventRoutes";

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/", animalRoutes);
app.use("/", eventRoutes);

async function startServer() {
  try {
    await sequelize.sync(); // Ensure models are initialized and tables are created
    console.log("Database synchronized");
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

startServer();
