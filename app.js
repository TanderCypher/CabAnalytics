var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

const excelReader = require("./service/excel-reader");
const turAnalyse1 = require("./analyse/turAnalyse1");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

// =========================
// EAGER LOAD EXCEL (ONCE)
// =========================
async function excelReaderRunner() {
  try {
    const turData = await excelReader();
    console.log("turData loaded:", turData.length);
    app.locals.turData = turData;
    return turData; // <== returner data til analyse
  } catch (err) {
    console.error("Excel load failed:", err);
    process.exit(1);
  }
}

async function analyse1Runner(turData) {
  try {
    const analyse1 = await turAnalyse1(turData);
    console.log("Analyse completed");
    app.locals.analyse1 = analyse1;
  } catch (err) {
    console.error("Analyse failed:", err);
  }
}

// Kjør sekvensielt
(async () => {
  const turData = await excelReaderRunner();
  await analyse1Runner(turData);
})();

// =========================
// VIEW ENGINE
// =========================
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// =========================
// GLOBAL MIDDLEWARE
// =========================
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// =========================
// DATA INJECTION (AFTER LOAD)
// =========================
app.use((req, res, next) => {
  req.turData = turData;
  next();
});

// =========================
// ROUTES
// =========================
app.use("/", indexRouter);
app.use("/users", usersRouter);

// =========================
// ERRORS
// =========================
app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
