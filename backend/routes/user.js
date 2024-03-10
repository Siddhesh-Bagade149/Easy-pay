const express = require("express");
const zod = require("zod");
const { userModel } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { authMiddleWare, authMiddleware } = require("../middleware");

const router = express.Router();

const signupBody = zod.object({
  username: zod.string().email(),
  password: zod.string(),
  firstName: zod.string(),
  lastName: zod.string(),
});

router.post("/signup", async (req, res) => {
  const body = req.body;
  try {
    const { success } = signupBody.safeParse(body);
    if (!success) {
      return res.json({
        message: "Incorrect inputs",
      });
    }

    const existingUser = await userModel.findOne({
      username: body.username,
    });

    if (existingUser) {
      return res.json({
        msg: "user already exists",
      });
    }

    let newUser = await userModel.create(body);
    const token = jwt.sign(
      {
        userId: newUser._id,
      },
      JWT_SECRET
    );
    res.json({
      msg: "User created successfully",
      token: token,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

const signinBody = zod.object({
  username: zod.string().email(),
  password: zod.string(),
});
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWVjMDFjMGI3NTM2OWM3M2FjNWI3NWQiLCJpYXQiOjE3MTAwNzIxODh9.XICnecww_tQotNE0UnSerAbbG-HwV_vA9KQ57ZNoxAI
router.post("/signin", async (req, res) => {
  const body = req.body;
  const { success } = signinBody.safeParse(body);
  if (!success) {
    return res.status(401).json({
      message: "Error while logging in invalid credentials",
    });
  }
  const existingUser = await userModel.findOne({
    username: body.username,
    password: body.password,
  });

  if (existingUser) {
    const token = jwt.sign(
      {
        userId: existingUser._id,
      },
      JWT_SECRET
    );
    res.json({
      token: token,
    });
    return;
  }

  res.status(411).json({
    msg: "error while logging in",
  });
});

const updateBody = zod.object({
  password: zod.string().optional(),
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
});
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWVkZmQyZmJhNmIyYWFhZjcwNjI0OGUiLCJpYXQiOjE3MTAwOTU2NjN9.mteLjwZ9m-AO2WMgJREJI2w_Bu2dfcrD0hn-ThYj_1g
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWVkZmQyZmJhNmIyYWFhZjcwNjI0OGUiLCJpYXQiOjE3MTAwOTU2OTJ9.jzJ9rasrBWFlRTCWaO2sf5k17kC7w0Fff-BjHWB--8U
router.put("/", authMiddleware, async (req, res) => {
  const { success } = updateBody.safeParse(req.body);
  if (!success) {
    res.status(411).json({
      msg: "error while updating",
    });
  }
  console.log("inside put");

  // User.updateOne({ _id: userId }, { email: 'new_email@example.com' })
  await userModel.updateOne({ _id: req.userId }, req.body);
  res.json({
    message: "Updated successfully",
  });
});

router.get("/bulk", async (req, res) => {
  const filter = req.query.filter || "";

  const users = await userModel.find({
      $or: [{
          firstName: {
              "$regex": filter
          }
      }, {
          lastName: {
              "$regex": filter
          }
      }]
  })

  res.json({
      user: users.map(user => ({
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          _id: user._id
      }))
  })
})

module.exports = router;
