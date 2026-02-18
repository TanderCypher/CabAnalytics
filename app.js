var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

const excelReader = require("./service/excel-reader");
const { tellTurerPerSone, matrixMaker } = require("./analyse/turAnalyse1");

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
    /* console.log(turData.length); */
    console.log("excelReaderRunner Completed");
    return turData; // <== returner data til analyse
  } catch (err) {
    console.error("Excel load failed:", err);
    process.exit(1);
  }
}

async function analyseRunner(turData) {
  try {
    const soneTelling = await tellTurerPerSone(turData);
    console.log("tellTurerPerSone completed"/* , soneTelling.length */);
    app.locals.soneTelling = soneTelling;
    console.log("AnalyseRunner Completed");
    return soneTelling;
  } catch (err) {
    console.error("Analyse1 failed:", err);
  }
}

async function analyseRunner2(turData) {
  try {
    const matrix = await matrixMaker(turData);
    console.log("Analyse2 completed");
    console.log(matrix);
    app.locals.matrix = matrix;
    console.log("AnalyseRunner2 Completed");
  } catch (err) {
    console.error("Analyse2 failed:", err);
  }
}

// Kjør sekvensielt
(async () => {
  await excelReaderRunner();
  await analyseRunner(app.locals.turData);
  await analyseRunner2(app.locals.turData);
})();

app.use((req, res, next) => {
  if (!app.locals.turData) {
    return res.status(503).send("turData not loaded yet");
  }
  next();
});

app.use((req, res, next) => {
  if (!app.locals.soneTelling) {
    return res.status(503).send("soneTelling not loaded yet");
  }
  next();
});

app.use((req, res, next) => {
  if (!app.locals.matrix) {
    return res.status(503).send("matrix not loaded yet");
  }
  next();
});

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
  res.locals.turData = app.locals.turData;
  res.locals.soneTelling = app.locals.soneTelling;
  res.locals.matrix = app.locals.matrix;
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
