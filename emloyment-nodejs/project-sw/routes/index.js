const userRoute = require("./userRoute");
const authRoute = require("./authRoute");

const mountRoutes = (app) => {
  // Mount Routes
  app.use("/api/v1/users", userRoute);
  app.use("/api/v1/auth", authRoute);
};
module.exports = mountRoutes;
