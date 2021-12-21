const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const verify = require("../middleware/auth");
const Admin = require("../models/Admin");

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
    let { email, password, username } = req.body;

    if (!email || !password)
      return res
        .status(400)
        .json({ message: "Not all fields have been entered." });
    if (password.length < 5)
      return res.status(400).json({
        message: "The password needs to be at least 5 characters long.",
      });

    const existingUser = await Admin.findOne({ email: email });
    if (existingUser)
      return res
        .status(400)
        .json({ message: "An account with this email already exists." });

    if (!username) username = email;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new Admin({
      email,
      password: passwordHash,
      username,
    });
    const data = await newUser.save();
    res.json({ message: "User Created Successfully", data });
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

    const user = await Admin.findOne({ email: email });
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
      message: "User Logged In Successfully!!",
      user,
      token,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:id", verify, (req, res) => {
  console.log(req.user.id);
  console.log(req.user.username);
  if (req.params.id === req.user.id) {
    const id = req.params.id;
    Admin.findById(id)
      .then((user) => res.send({ user }))
      .catch((err) => {
        return res.status(400);
      });
  } else {
    res.send("You can only view your own profile.");
  }
});

module.exports = router;
