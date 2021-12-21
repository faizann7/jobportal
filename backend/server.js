const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const recruiter = require("./routes/recruiter");
const applicant = require("./routes/applicant");
const jobs = require("./routes/jobs");
const applications = require("./routes/applications");
const admin = require("./routes/admin");

var pathfinderUI = require("pathfinder-ui");

const app = express();
/*assuming an express app is declared here*/
app.use(cors());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

// const CONNECTION_URL =
//   "mongodb+srv://mfaizan:mfaizan123@cluster0.dxb1h.mongodb.net/movieApp?retryWrites=true&w=majorityrity";
const PORT = process.env.PORT || 5000;

//connecting database
mongoose
  .connect(
    "mongodb+srv://mfaizan:mfaizan123@cluster0.dxb1h.mongodb.net/projectwebdev?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Successfully connect to MongoDB.");
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });

//app.use("/api/auth", auth);
app.get("/", (req, res) => {
  res.send("working");
});
app.use("/api/recruiter", recruiter);
app.use("/api/applicant", applicant);
app.use("/api/jobs", jobs);
app.use("/api/application", applications);
app.use("/admin", admin);

app.listen(PORT, () => {
  console.log(`Server started on port  http://localhost:${PORT}/`);
  console.log(`Server started on port  http://localhost:${PORT}/pathfinder`);
});

app.use(
  "/pathfinder",
  function (req, res, next) {
    pathfinderUI(app);
    next();
  },
  pathfinderUI.router
);
