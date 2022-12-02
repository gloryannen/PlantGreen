/** Express app for PlantGreen. */
require("dotenv").config();

const path = require("path");
const express = require("express");
const PORT = process.env.PORT || 3001;

const app = express();
const cors = require("cors");

const { NotFoundError } = require("./expressError");

const { authenticateJWT } = require("./middleware/auth");
const authRoutes = require("./routes/auth");
const usersRoutes = require("./routes/users");
// const plantsRoutes = require("./routes/plants");
const apiRoutes = require("./routes/api");
const morgan = require("morgan");

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ limit: "50mb" }));
app.use(express.static(path.join(__dirname, "../frontend/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "../frontend/build/index.html"));
});
app.use(morgan("tiny"));

app.use(authenticateJWT);

app.use("/auth", authRoutes);
app.use("/users", usersRoutes);
// app.use("/plants", plantsRoutes);
app.use("/api", apiRoutes);

/** Handle 404 errors -- this matches everything */
app.use(function (req, res, next) {
  return next(new NotFoundError());
});

/** Generic error handler; anything unhandled goes here. */
app.use(function (err, req, res, next) {
  if (process.env.NODE_ENV !== "test") console.error(err.stack);
  const status = err.status || 500;
  const message = err.message;

  return res.status(status).json({
    error: { message, status },
  });
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});

module.exports = app;
