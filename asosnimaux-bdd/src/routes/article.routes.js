// Express
import express from "express";
// Controllers
import { ArticleController } from "../controllers/article.controllers.js";
// Middlewares
import jwtMddlwr from "../middlewares/jwt.mddlwrs.js";
import isAdmin from "../middlewares/isAdmin.mddlwrs.js";

const initArticleRoutes = (app) => {
  const articleRouter = express.Router();

  // GET
  articleRouter.get("/overview", ArticleController.read);
  articleRouter.get("/all", ArticleController.readAll);

  // POST
  articleRouter.post("/", jwtMddlwr, isAdmin, ArticleController.create);

  // PUT
  articleRouter.put("/", jwtMddlwr, isAdmin, ArticleController.update);

  // DELETE
  articleRouter.delete("/:articleID", jwtMddlwr, isAdmin, ArticleController.deleteOne)

  // GET
  articleRouter.get("/:articleID", ArticleController.readOne);

  // Attaching router to /articles path
  app.use("/articles", articleRouter);
}

export default initArticleRoutes;