const userRoute = require("./userRoute");
const authRoute = require("./authRoute");
const jobRoute = require("./jobRoute");

const mountRoutes = (app) => {
  // Mount Routes
  app.use("/api/v1/auth", authRoute);
  app.use("/api/v1/users", userRoute);
  app.use("/api/v1/jobs", jobRoute);
};
module.exports = mountRoutes;
