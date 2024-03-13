// Express
import express from "express";
// Controllers
import { AnimalController } from "../controllers/animal.controllers.js";
// Middlewares
import jwtMddlwr from "../middlewares/jwt.mddlwrs.js";
import isAdmin from "../middlewares/isAdmin.mddlwrs.js";

const initAnimalRoutes = (app) => {
  const animalRouter = express.Router();

  // GET
  animalRouter.get("/all", AnimalController.readAll);

  // POST
  animalRouter.post("/", jwtMddlwr, isAdmin, AnimalController.create);

  // PUT
  animalRouter.put("/", jwtMddlwr, isAdmin, AnimalController.updateDetails);
  animalRouter.put("/exitDate", jwtMddlwr, isAdmin, AnimalController.updateExitDate);

  // DELETE
  animalRouter.delete("/:id", jwtMddlwr, isAdmin, AnimalController.deleteOne);

  // GET
  animalRouter.get("/:id", AnimalController.readOne);

  // Attaching router to /animals path
  app.use("/animals", animalRouter);
}

export default initAnimalRoutes;