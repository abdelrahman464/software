const userRoute = require("./userRoute");

const mountRoutes = (app) => {
  // Mount Routes
  app.use("/api/v1/users", userRoute);
};
module.exports = mountRoutes;
