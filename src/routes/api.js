import express from 'express';

const router = express.Router();

const apiRoutes = (app) => {
  router.get("/", (req, res) => {
    res.send("Welcome to the API!");
  })
  return app.use("/api", router);
 };

export default apiRoutes;