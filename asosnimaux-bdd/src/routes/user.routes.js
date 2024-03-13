// Express
import express from "express";
// Controllers
import { UserController } from "../controllers/user.controllers.js";
// Middlewares
import jwtMddlwr from "../middlewares/jwt.mddlwrs.js";
import isAdminOrOwner from "../middlewares/isAdminOrOwner.mddlwrs.js";
import isSuperAdmin from "../middlewares/isSuperAdmin.mddlwrs.js";


const initUserRoutes = (app) => {
  const userRouter = express.Router();

  // GET
  userRouter.get("/user", jwtMddlwr, UserController.readOne);
  userRouter.get("/follow", jwtMddlwr, UserController.readUsersFollow)
  userRouter.get("/followIDs", jwtMddlwr, UserController.readUsersFollowIDs)
  userRouter.get("/all", jwtMddlwr, isSuperAdmin, UserController.readAll);

  // POST
  userRouter.post("/", UserController.create);
  userRouter.post("/sign-in", UserController.signIn);
  userRouter.post("/follow", jwtMddlwr, UserController.followAnimal);

  // PUT
  userRouter.put("/username", jwtMddlwr, UserController.updateUsername);
  userRouter.put("/password", jwtMddlwr, UserController.updatePassword);
  userRouter.put("/avatar", jwtMddlwr, UserController.updateAvatar);
  userRouter.put("/role/:id", jwtMddlwr, isSuperAdmin, UserController.updateRole);

  // DELETE
  userRouter.delete("/unfollow/:animalID", jwtMddlwr, UserController.unfollow);
  userRouter.delete("/:id", jwtMddlwr, isAdminOrOwner, UserController.deleteOne);

  // Attaching router to /users path
  app.use("/users", userRouter);
}

export default initUserRoutes;