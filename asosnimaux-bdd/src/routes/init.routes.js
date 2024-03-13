import initAnimalRoutes from "./animal.routes.js";
import initArticleRoutes from "./article.routes.js";
import initTestimonyRoutes from "./testimony.routes.js";
import initUserRoutes from "./user.routes.js";


const initRoutes = (app) => {
  initAnimalRoutes(app);
  initUserRoutes(app);
  initTestimonyRoutes(app);
  initArticleRoutes(app);
}

export default initRoutes;