const express = require("express");
const { authMiddleware } = require("../middleware");
const { accountModel } = require("../db");
const { default: mongoose } = require("mongoose");

const router = express.Router();

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

// 65f06a07536101eea8d5303a demo11@gamil.com

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
