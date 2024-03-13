// Express
import express from "express";
// Controllers
import { TestimonyController } from "../controllers/testimony.controllers.js";
// Middlewares
import jwtMddlwr from "../middlewares/jwt.mddlwrs.js";
import isAdminOrAuthor from "../middlewares/isAdminOrAuthor.mddlwrs.js";

const initTestimonyRoutes = (app) => {
  const testimonyRouter = express.Router();

  // GET
  testimonyRouter.get("/", TestimonyController.readAllWithTheirUsername);
  testimonyRouter.get("/overview", TestimonyController.readWithTheirUsername);
  testimonyRouter.get("/all/user", jwtMddlwr, TestimonyController.readAllByOneUser);

  // POST
  testimonyRouter.post("/", jwtMddlwr, TestimonyController.create);

  // PUT
  testimonyRouter.put("/", jwtMddlwr, TestimonyController.update);

  // DELETE
  testimonyRouter.delete("/:testimonyID", jwtMddlwr, isAdminOrAuthor, TestimonyController.deleteOne);

  // GET
  testimonyRouter.get("/:testimonyID", TestimonyController.readOneWithTheirUsername);

  // Attaching router to /testimonies path
  app.use("/testimonies", testimonyRouter);
}

export default initTestimonyRoutes;