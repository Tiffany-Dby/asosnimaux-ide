import express from "express";
import initMiddlewares from "./middlewares/init.mddlwrs.js";
import initRoutes from "./routes/init.routes.js";

const app = express();
const PORT = process.env.PORT;

initMiddlewares(app);
initRoutes(app);

app.listen(PORT, () => {
  console.log("Server is running on port :", PORT);
});
// http://localhost:9000