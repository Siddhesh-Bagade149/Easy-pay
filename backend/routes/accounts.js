const express = require("express");
const { authMiddleware } = require("../middleware");
const { accountModel } = require("../db");
const { default: mongoose } = require("mongoose");

const router = express.Router();

//toke= "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWVmMTAxYmMxMmNkNzVkZGE1NDFlOGMiLCJpYXQiOjE3MTAxNjY1MDh9.hyy1vhQJs9S9dD-zhfy61cu6kWoKWRj3MHAOFww9pJU"

router.get("/balance", authMiddleware, async (req, res) => {
  const account = await accountModel.findOne({
    userId: req.userId,
  });

  res.json({
    balance: account.balance,
  });
});

//adding .session(session) to ensure atomicity
//consistency hold true bcoz the total amount remains const
//isolation holds true as each transaction will work separately
//dDurability guarantees that once the transaction completes and changes are written to the database, they are persisted
router.post("/transfer", authMiddleware, async (req, res) => {
  const session = await mongoose.startSession();

  session.startTransaction();

  const { amount, to } = req.body;
  const fromAccount = await accountModel
    .findOne({
      userId: req.userId,
    })
    .session(session);

  if (!fromAccount || fromAccount.balance < amount) {
    return res.status(400).json({
      msg: "invalid user or insufficient Balance",
    });
  }

  const toAccount = accountModel.findOne({ userId: to }).session(session);

  if (!toAccount) {
    return res.status(400).json({
      msg: "invalid account",
    });
  }

// 65ef3d8c474c4be5ee6fe7be sid
// 65ef101bc12cd75dda541e8c singh

  //starting transfer
  await accountModel
    .updateOne(
      { userId: req.userId },
      {
        $inc: {
          balance: -amount,
        },
      }
    )
    .session(session);
  await accountModel
    .updateOne(
      { userId: to },
      {
        $inc: {
          balance: +amount,
        },
      }
    )
    .session(session);

  await session.commitTransaction();
  res.json({
    msg: "transfer of " + amount + " successful",
  });
});

module.exports = router;
