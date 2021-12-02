const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const verify = require("../middleware/auth");
const Recruiter = require("../models/Recruiter");

router.get("/get/:id", verify, async (req, res) => {
  if (req.params.id === req.user.id) {
    res.send("IT WORKED!!");
  } else {
    res.send("YOURE NOT ALLOWED TO VIEW THIS!");
  }
  console.log(req.user.id);
  //res.send(req.user.id)
});

router.post("/register", async (req, res) => {
  try {
    let { email, password, username, contactNumber } = req.body;

    if (!email || !password)
      return res.status(400).json({ msg: "Not all fields have been entered." });
    if (password.length < 5)
      return res
        .status(400)
        .json({ msg: "The password needs to be at least 5 characters long." });

    const existingUser = await Recruiter.findOne({ email: email });
    if (existingUser)
      return res
        .status(400)
        .json({ msg: "An account with this email already exists." });

    if (!username) username = email;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new Recruiter({
      email,
      password: passwordHash,
      username,
      contactNumber,
    });
    newUser.companyURL = "";
    newUser.companyDescription = "";
    newUser.location = "";
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res
        .status(400)
        .json({ message: "Not all fields have been entered." });

    const user = await Recruiter.findOne({ email: email });
    if (!user)
      return res
        .status(400)
        .json({ message: "No account with this email has been registered." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials." });

    const token = jwt.sign(
      {
        id: user._id,
        email,
        username: user.username,
      },
      "JWT_SECRET",
      { expiresIn: "1h" }
    );
    console.log("token", token);
    res.json({
      //token,
      // user: {
      //   id: user._id,
      //   username: user.username,
      //   isRecruiter: user.isRecruiter,
      //   token
      // },
      user,
      userType: "Recruiter",
      token,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
//update profile
router.put("/updateprofile/:id", verify, async (req, res) => {
  // if (req.user.id === req.params.id) {
  try {
    const updatedUser = await Recruiter.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
  // } else {
  //   res.status(403).json("You can update only your account!");
  // }
});

router.get("/check", verify, (req, res) => {
  res.send(req.user.username);
});

//update profile
// router.put("/updateprofile/:id", verify, async (req, res) => {

//     const id= req.params.id;
//     const{
//       username,
//       email,
//       password,
//       contactNumber,
//       companyURL,
//       companyDescription,
//       location
//     } = req.body;

//     Recruiter.findByIdAndUpdate(id, req.body)
//       .then(user =>{
//         if(!user)
//       })
//     // await Recruiter.findById(id)
//     //   .then((user) =>{
//     //     user.save()
//     //     .then((newUser) =>{
//     //       res.json({ newUser })
//     //     })
//     //     .catch((err)=>{
//     //       res.status(500)
//     //     })
//     //   })
//     //   .catch((err)=>{
//     //     res.status(404).json({ message : "USER NOT FOUND!!"})
//     //   })
// })
// const updatedUser = await Recruiter.findByIdAndUpdate(
//   req.params.id,
//   {
//     $set: req.body,
//   },
//   { new: true }
// );
//   res.status(200).send(updatedUser);
// } catch (err) {
//   res.status(500).json(err);
// }
// if (req.user.id === req.params.id) {
//   try {
//     const updatedUser = await Recruiter.findByIdAndUpdate(
//       req.params.id,
//       {
//         $set: req.body,
//       },
//       { new: true }
//     );
//     res.status(200).json(updatedUser);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// } else {
//   res.status(403).json("You can update only your account!");
// }

// Get a recruiter
router.get("/:id", verify, (req, res) => {
  if (req.params.id === req.user.id) {
    const id = req.params.id;
    Recruiter.findById(id)
      .then((user) => res.send({ user }))
      .catch((err) => {
        return res.status(400);
      });
  } else {
    res.send("You can only view your own profile.");
  }
});

module.exports = router;
