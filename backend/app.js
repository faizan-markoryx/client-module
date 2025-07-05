const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
require("dotenv").config();
const cors = require('cors')
const bodyParser = require('body-parser');


// Add all the Join(Associations) on one place
require("./sequelize/models/associations");

const indexRouter = require("./app/routes/index");
const usersRouter = require("./app/routes/user");
const contactNoteRouter = require("./app/routes/contactNote");
const clientsRouter = require('./app/routes/client')
const contactRouter = require("./app/routes/contact");
const clientNoteRouter = require('./app/routes/clientNote')
const dashboardRouter = require("./app/routes/dashboard");
const locationRouter = require('./app/routes/location')
const reportRouter = require('./app/routes/report');
const lowerCaseEmailMiddleware = require("./services/validations/lowerCaseEmailMiddleware");
const User = require("./sequelize/models/user");

const app = express();
app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// view engine setup
app.set("views", path.join(__dirname, "app/views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// To Lower Case All The Body Emails
app.use(lowerCaseEmailMiddleware);

app.use("/", indexRouter);
app.use("/user", usersRouter);
app.use("/contact-note", contactNoteRouter);
app.use("/client", clientsRouter)
app.use("/contact", contactRouter);
app.use('/client-note', clientNoteRouter)
app.use("/dashboard", dashboardRouter);
app.use('/location', locationRouter)
app.use('/report', reportRouter)
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
