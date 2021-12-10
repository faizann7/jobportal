const router = require("express").Router();

//model
const Job = require("../models/Jobs");
//auth
const auth = require("../middleware/auth");

//add a job

router.post("/addjob", auth, async (req, res) => {
  //console.log(req.user)
  const id = req.params.id;

  const data = req.body;

  let job = new Job({
    title: data.title,
    type: data.type,
    maxApps: data.maxApps,
    maxPos: data.maxPos,
    deadlineDate: data.deadlineDate,
    requiredSkills: data.requiredSkills,
    salary: data.salary,
    companyURL: data.companyURL,
    department: data.department,
    description: data.description,
    location: data.location,
    experience: data.exprience,
    user: {
      id: req.user.id,
      username: req.user.username,
      email: req.user.email,
    },
    //recruiterId: recruiterId
  });

  job
    .save()
    .then(() => {
      res.json({ message: "Job added successfully to the database" });
    })
    .catch((err) => {
      res.status(400).json(err);
    });

  // if (req.user.isRecruiter) {
  //   const newJob = new Job(req.body);
  //   try {
  //     const savedJob = await newJob.save();
  //     res.status(201).json({
  //       message: "Job added successfully to the database",
  //       savedJob,
  //     });
  //   } catch (err) {
  //     res.status(500).json(err);
  //   }
  // } else {
  //   res.status(403).json("You are not allowed!");
  // }
});

//view all jobs even without auth
router.get("/getjobs/:page", (req, res) => {
  const resultperpage = 2;
  const page = req.params.page;
  Job.find({})
    .skip(resultperpage * page - resultperpage)
    .limit(resultperpage)
    .then((jobs) => {
      // res.status(200).json({
      //   status: "success",
      //   data: jobs
      // })
      res.send(jobs);
    })
    .catch((error) => {
      res.sendStatus(400);
    });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  Job.findById(id)
    .then((job) => {
      res.json({
        job,
      });
    })
    .catch((err) => {
      return res.send(400);
    });
});

// Get Listing by recruiter
router.get("/byrecruiter/:id", (req, res) => {
  const userid = req.params.id;
  Job.find({ "user.id": userid })
    .then((myjobs) => res.json({ myjobs }))
    .catch((err) => {
      return res.sendStatus(400);
    });
});

//update a job
router.put("/updatejob/:id", auth, (req, res) => {
  const id = req.params.id;

  const { maxApps, maxPos, deadlineDate } = req.body;
  const errors = [];

  Job.findById(id)
    .then((job) => {
      if (maxApps) {
        if (maxApps < job.numApps)
          errors.push(
            `Can't update, already more applicataions than  ${maxApps}`
          );
        else job.maxApps = maxApps;
      }

      if (maxPos) {
        if (maxPos < job.numAccepted)
          errors.push(
            `Can't update, already more applicataions than  ${maxPos}`
          );
        else job.maxPos = maxPos;
      }

      if (deadlineDate) {
        if (deadlineDate < Date.now())
          errors.push("Deadline date cannot be in the past");
        else job.deadlineDate = deadlineDate;
      }

      if (errors.length != 0) return res.status(400).json({ errors });
      else {
        job
          .save()
          .then((newjob) => res.json({ newjob }))
          .catch((err) => {
            res.status(500);
          });
      }
    })
    .catch((err) => {
      return res.status(404).json({ message: "not found" });
    });
});

router.delete("/deletejob/:id", auth, async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);
    res.status(200).json("DELTED...");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
