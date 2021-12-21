const router = require("express").Router();

//models
const Application = require("../models/Applications");
const Job = require("../models/Jobs");
const Applicant = require("../models/Applicant");

const auth = require("../middleware/auth");

const statuses = ["Applied", "Shortlisted", "Rejected", "Accepted"];

//CREATE APPLICAITON -- USER USE CASE.
router.post("/apply/:id", auth, async function (req, res) {
  const jobId = req.params.id;
  const { applicantId, coverLetter, resume } = req.body;
  if (!coverLetter)
    return res.status(400).json({
      message: "Please Add your Cover Letter",
    });

  const applicant = await Applicant.findById(applicantId);
  const job = await Job.findById(jobId);
  if (!applicant || !job) return res.send(400).json({ message: "not found" });

  const applicantApplications = await Application.find({ applicantId });
  let numActive = 0;
  for (let application of applicantApplications) {
    if (application.status === "Accepted")
      return res
        .status(400)
        .json({ message: "Can't apply when already accepted into a job" });
    if (application.status !== "Deleted" || application.status !== "Rejected")
      numActive += 1;
  }
  if (numActive >= 10)
    return res
      .status(400)
      .json({ message: "Can't apply to more than 10 jobs" });

  if (job.deadlineDate < Date.now())
    return res
      .status(400)
      .json({ message: "Deadline for this job has already been passed" });

  const application = await Application.findOne({ jobId, applicantId });
  if (application)
    return res
      .status(400)
      .json({ message: "You have already applied for this job." });

  if (job.numApps >= job.maxApps)
    return res.status(400).json({
      message: "Cannot Apply, Applications for this job are now closed!",
    });

  const newApplication = new Application({
    jobId,
    applicantId,
    coverLetter,
    resume,
    user: {
      id: req.user.id,
      username: req.user.username,
      email: req.user.email,
    },
  });
  newApplication
    .save()
    .then((application) => {
      Job.findByIdAndUpdate(jobId, { $inc: { numApps: 1 } })
        .then(() => res.json({ application }))
        .catch((err) => res.status(500).json({ message: "Internal error" }));
    })
    .catch((err) => res.status(500).json({ message: "Internal error" }));
});

// Get applications by jobId - RECRUITER USE CASE
router.get("/viewapplications/:id", (req, res) => {
  const jobId = req.params.id;
  Application.find({ jobId: jobId })
    .then((applications) => res.json({ applications }))
    .catch((err) => {
      return res.sendStatus(400);
    });
});

//get applications by applicantId - APPLICANT USE CASE.
//WHERE I HAVE APPLIED.
router.get("/byapplicant/:applicantid", (req, res) => {
  const applicantId = req.params.applicantid;
  Application.find({ applicantId: applicantId })
    .lean()
    .populate("jobId")
    .then((applications) => res.json({ applications }))
    .catch((err) => {
      return res.sendStatus(400);
    });
});

//for recruiter to accept reject : RECRUITER USE CASE
router.put("/:id", auth, async function (req, res) {
  const id = req.params.id;
  const { status } = req.body;

  if (!statuses.includes(status)) return res.sendStatus(400);

  const application = await Application.findById(id);
  if (!application) return res.sendStatus(400);
  if (application.closeDate < Date.now())
    return res.status(400).json({ message: "Application already closed" });

  if (status === "Accepted") {
    const job = await Job.findById(application.jobId);
    if (job.numAccepted >= job.maxPos)
      return res
        .status(400)
        .json({ message: "JOB FULL!! You cannot select anymore applicants." });

    // listing.numAccepted = listing.numAccepted + 1;
    if (job.numAccepted + 1 >= job.maxPos) {
      await Application.updateMany(
        {
          jobId: application.jobId,
          status: { $ne: "Accepted" },
          _id: { $ne: id },
        },
        { status: "Rejected", closeDate: Date.now() }
      );
    }
    await Application.updateMany(
      { applicantId: application.applicantId, _id: { $ne: id } },
      { status: "Rejected", closeDate: Date.now() }
    );
    job.numAccepted += 1;
    await job.save();
  }
  application.status = status;
  if (status === "Accepted" || status === "Rejected")
    application.closeDate = Date.now();
  const updatedApplication = await application.save();
  res.json({ application: updatedApplication });
});

// APPLICANTS ACCEPTED BY THE RECRUITER : RECRUITER USE CASE
router.get("/byrecruiter/:id", async function (req, res) {
  try {
    const id = req.params.id;
    let jobs = await Job.find({ "user.id": id });
    const jobIds = jobs.map((job) => job.id);
    let applications = await Application.find({
      jobId: { $in: jobIds },
    });
    applications = applications.filter(
      (application) => application.status === "Accepted"
    );
    const acceptedIds = applications.map(
      (application) => application.applicantId
    );
    let applicants = await Applicant.find({ _id: { $in: acceptedIds } });
    applicants = applicants.map((applicant) => {
      let application = applications.find(
        (application) => application.applicantId == applicant.id
      );
      let job = jobs.find((l) => l.id == application.jobId);
      return {
        id: applicant.id,
        name: applicant.username,
        jobtype: job.type,
        jobtitle: job.title,
        joiningDate: application.closeDate,
      };
    });
    return res.json({ applicants });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal error" });
  }
});

module.exports = router;
