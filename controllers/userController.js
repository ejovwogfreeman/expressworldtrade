const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const Investment = require("../models/investmentModel");
const Transaction = require("../models/transactionModel");
const Deposit = require("../models/depositModel");
const Withdrawal = require("../models/withdrawalModel");
const refCode = require("voucher-code-generator");
const sendEmail = require("../helpers/email");

///////////////////////////
///////register user///////
///////////////////////////

const registerUser = async (req, res) => {
  // destructuring all information from the object
  const { referral, username, name, email, phoneNumber, password } = req.body;

  if (referral) {
    const referredUser = await User.findOne({ referralId: referral });
    let referralCount = referredUser.referrals;
    referralCount += 1;
    await User.findOneAndUpdate(
      { referralId: referral },
      { referrals: referralCount }
    );
  }

  // validate inputs
  if (!username || !name || !email || !phoneNumber || !password) {
    res.status(400).json({ message: "please add all fields", error: true });
  }

  // check if user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400).json({ message: "User already Exists", error: true });
    return false;
  }

  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashedpassword = await bcrypt.hash(password, salt);
  const referralId = refCode.generate({ length: 5 }).toString();

  // create new user
  const user = new User({
    referralId,
    username,
    name,
    email,
    phoneNumber,
    password: hashedpassword,
  });

  // saving the user
  await user.save();

  if (user) {
    const { password, ...others } = user._doc;
    res.status(200).json({
      ...others,
      token: accessToken(user),
    });
  }

  await sendEmail(email, "Welcome On Board", "register.html");
};

/////////////////////////
////////login user///////
/////////////////////////

const loginUser = async (req, res) => {
  // destructuring the email and password from the object
  const { email, password } = req.body;

  // check for user email
  const user = await User.findOne({ email });

  // compare the password and send
  if (user && (await bcrypt.compare(password, user.password))) {
    const { password, ...others } = user._doc;
    res.send({
      ...others,
      token: accessToken(user),
    });
  } else {
    res.status(400).json({ message: "invalid credentials", error: true });
  }
};

///////////////////////////
///////get all users///////
///////////////////////////

const getUsers = async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
};

///////////////////////////
///////get one user////////
///////////////////////////

const getUser = async (req, res) => {
  let user = await User.findById(req.user._id);
  // console.log(user);
  const { ...others } = user._doc;
  res.send({
    ...others,
    token: accessToken(user),
  });
};

//////////////////////////
///////generate jwt///////
//////////////////////////

// cassess token for particular user and admin functionality
const accessToken = (user) => {
  return jwt.sign(
    {
      user,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );
};

/////////////////////////
////////update user//////
/////////////////////////

const updateUser = async (req, res) => {
  // destructuring the email and password from the object
  const { oldPassword, password, name, username, email, phoneNumber } =
    req.body;

  if (password && oldPassword) {
    const user = await User.findById(req.user._id);

    // compare the password and send
    if (user && (await bcrypt.compare(oldPassword, user.password))) {
      // hash password
      const salt = await bcrypt.genSalt(10);
      const hashedpassword = await bcrypt.hash(password, salt);
      await User.findByIdAndUpdate(req.user._id, { password: hashedpassword });
      res.status(200).json({ message: "Password Changed Successfully" });
    } else {
      res
        .status(400)
        .json({ message: "Old Password is not correct", error: true });
    }
  }

  if (req.files && req.files.length > 0) {
    let filesArray = [];
    req.files.forEach((element) => {
      const file = {
        fileName: element.originalname,
        fileType: element.mimetype,
        link: `file/${element.filename}`,
      };
      filesArray.push(file);
    });
    await User.findByIdAndUpdate(req.user._id, { profileImage: filesArray });
  }

  if (name && name !== "null") {
    await User.findByIdAndUpdate(req.user._id, { name: name });
  }

  if (username && username !== "null") {
    await User.findByIdAndUpdate(req.user._id, { username: username });
  }

  if (email && email !== "null") {
    await User.findByIdAndUpdate(req.user._id, { email: email });
  }

  if (phoneNumber && phoneNumber !== "null") {
    await User.findByIdAndUpdate(req.user._id, { phoneNumber: phoneNumber });
  }

  res.status(200).json({ message: "Profile Updated Successfully" });
};

/////////////////////////////////////////
//////////get single transaction/////////
/////////////////////////////////////////

const getTransaction = async (req, res) => {
  // res.status(200).json(req.user);
  const transaction = await Transaction.find();
  let usertrx = transaction.filter((trx) => {
    return trx.user.email === req.user.email;
  });
  res.status(200).send(usertrx);
};

/////////////////////////////////////////
//////////get single investment/////////
/////////////////////////////////////////

const getInvestment = async (req, res) => {
  const investment = await Investment.find();
  let userinv = investment.filter((trx) => {
    return trx.user.email === req.user.email;
  });
  res.status(200).send(userinv);
};

/////////////////////////////////////////
//////////get single deposit/////////
/////////////////////////////////////////

const getDeposit = async (req, res) => {
  // res.status(200).json(req.user);
  const deposit = await Deposit.find();
  let userdep = deposit.filter((trx) => {
    return trx.user.email === req.user.email;
  });
  res.status(200).send(userdep);
};

/////////////////////////////////////////
//////////get single withdrawal/////////
/////////////////////////////////////////

const getWithdrawal = async (req, res) => {
  // res.status(200).json(req.user);
  const withdrawal = await Withdrawal.find();
  let userinv = withdrawal.filter((trx) => {
    return trx.user.email === req.user.email;
  });
  res.status(200).send(userinv);
};

/////////////////////////////
//////////Investment/////////
/////////////////////////////

const userInvest = async (req, res) => {
  let { amount, plan } = req.body;
  const { email, username, _id } = req.user;
  amount = Number(amount);

  if (!amount)
    return res
      .status(400)
      .json({ message: "Amount must not be left empty", error: true });
  if (plan.toLowerCase().includes("mini")) {
    if (amount < 300) {
      return res.status(400).json({
        message: "The amount is smaller than the selected plan.",
        error: true,
      });
    }
    if (amount > 2999) {
      return res.status(400).json({
        message: "The amount is larger than the selected plan.",
        error: true,
      });
    }
  }

  if (plan.toLowerCase().includes("silver")) {
    if (amount < 3000) {
      return res.status(400).json({
        message: "The amount is smaller than the selected plan.",
        error: true,
      });
    }
    if (amount > 49999) {
      return res.status(400).json({
        message: "The amount is larger than the selected plan.",
        error: true,
      });
    }
  }

  if (plan.toLowerCase().includes("gold")) {
    if (amount < 50000) {
      return res.status(400).json({
        message: "The amount is smaller than the selected plan.",
        error: true,
      });
    }
    if (amount > 99999) {
      return res.status(400).json({
        message: "The amount is larger than the selected plan.",
        error: true,
      });
    }
  }

  if (plan.toLowerCase().includes("platinum")) {
    if (amount < 100000) {
      return res.status(400).json({
        message: "The amount is smaller than the selected plan.",
        error: true,
      });
    }
    if (amount > 600000) {
      return res.status(400).json({
        message: "The amount is larger than the selected plan.",
        error: true,
      });
    }
  }

  let user = await User.findById(_id);
  let balance = user.balance;
  if (amount > balance || balance === 0)
    return res.status(400).json({
      message: "You don't have sufficient balance to make this investment",
      error: true,
    });

  const investOptions = {
    amount: amount,
    plan: plan,
  };

  const transactionOptions = {
    type: "investment",
    status: "pending",
  };

  let transactionId;
  let investmentId;

  Investment.create(investOptions, (err, investment) => {
    if (err) return res.status(400).json(err);

    investmentId = investment.id;
    investment.user.id = _id;
    investment.user.email = email;
    investment.user.username = username;

    Transaction.create(transactionOptions, (err, transaction) => {
      if (err) return res.status(400).json(err);

      transactionId = transaction.id;
      transaction.transaction = investment.id;
      transaction.user.id = _id;
      transaction.user.email = email;
      transaction.user.username = username;

      User.findById(_id, (err, user) => {
        if (err) return res.status(400).json(err);

        user.balance = user.balance - amount;

        let investments = user.investments;
        investments.push(investmentId);
        user.investments = investments;

        let transactions = user.transactions;
        transactions.push(transactionId);
        user.transactions = transactions;

        user.save();
      });

      transaction.save();
    });
    investment.save();
  });

  res.status(200).json({ message: "Investment Added Successfully" });
};

/////////////////////////////
///////////Deposit///////////
/////////////////////////////

const userDeposit = async (req, res) => {
  // destructuring all information from the object
  const { amount, mode } = req.body;
  const { email, username, _id } = req.user;

  // validate inputs
  if (!amount || !mode) {
    return res.send({ message: "Please add all fields", error: true });
  }

  try {
    let filesArray = [];
    req.files.forEach((element) => {
      const file = {
        fileName: element.originalname,
        fileType: element.mimetype,
        link: `file/${element.filename}`,
      };
      filesArray.push(file);
    });

    // create new deposit
    const depositOptions = {
      amount,
      mode,
      proof: filesArray,
      status: "pending",
    };

    const transactionOptions = {
      type: "deposit",
      status: "pending",
    };

    let transactionId;
    let depositId;

    Deposit.create(depositOptions, (err, deposit) => {
      if (err) return res.status(400).json(err);

      depositId = deposit.id;
      deposit.user.id = _id;
      deposit.user.email = email;
      deposit.user.username = username;

      Transaction.create(transactionOptions, (err, transaction) => {
        if (err) return res.status(400).json(err);

        transactionId = transaction.id;
        transaction.transaction = depositId;
        transaction.user.id = _id;
        transaction.user.email = email;
        transaction.user.username = username;

        User.findById(_id, (err, user) => {
          if (err) return res.status(400).json(err);

          let deposits = user.deposits;
          deposits.push(depositId);

          let transactions = user.transactions;
          transactions.push(transactionId);
          user.transactions = transactions;

          user.save();
        });

        transaction.save();
      });
      deposit.save();
    }).catch((err) => {
      res.send({ message: err });
    });

    res.status(201).json({ message: "Files Uploaded Successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message, error: true });
  }
};

/////////////////////////////
///////////Withdraw//////////
/////////////////////////////

const userWithdraw = async (req, res) => {
  const { email, username, _id } = req.user;

  let user = await User.findById(_id);
  let { amount, address, method } = req.body;
  amount = Number(amount);

  if (amount > user.balance || user.balance === 0) {
    return res
      .status(400)
      .json({ message: "You do not have sufficient balance.", error: true });
  }

  const withdrawOptions = {
    amount: amount,
    accountDetails: address,
    mode: method,
  };

  const transactionOptions = {
    type: "withdrawal",
    status: "pending",
  };

  let transactionId;
  let withdrawId;

  Withdrawal.create(withdrawOptions, (err, withdraw) => {
    if (err) return res.status(400).json({ message: err.message, error: true });

    withdrawId = withdraw.id;
    withdraw.user.id = _id;
    withdraw.user.email = email;
    withdraw.user.username = username;

    Transaction.create(transactionOptions, (err, transaction) => {
      if (err)
        return res.status(400).json({ message: err.message, error: true });

      transactionId = transaction.id;
      transaction.transaction = withdraw.id;
      transaction.user.id = _id;
      transaction.user.email = email;
      transaction.user.username = username;

      User.findById(_id, (err, user) => {
        if (err)
          return res.status(400).json({ message: err.message, error: true });

        let withdraws = user.withdrawal;
        withdraws.push(withdrawId);
        user.withdrawal = withdraws;

        let transactions = user.transactions;
        transactions.push(transactionId);
        user.transactions = transactions;

        user.save();
      });

      transaction.save();
    });
    withdraw.save();
  });

  res
    .status(200)
    .json({ message: "Withdrawal has been initiated Successfully" });
};

const resetPassword = async (req, res, next) => {
  const id = req.headers.userid;
  const password = req.body.password;
  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashedpassword = await bcrypt.hash(password, salt);
  const user = await User.findByIdAndUpdate(id, { password: hashedpassword });

  if (user)
    return res.status(200).json({ message: "Password reset is successful" });

  res
    .status(400)
    .json({ error: true, message: "An error occcurred, please try again" });
};

////////////////////////////////////
///////////forgot password//////////
////////////////////////////////////

const forgotPasword = async (req, res) => {
  const email = req.body.email;
  const user = await User.findOne({ email });

  // compare the password and send
  if (user) {
    await sendEmail(email, "Password Reset", "reset.html");
    res.status(200).json({ message: "An email has been sent to you" });
  } else {
    res.status(400).json({
      message: "We could not find an account with that email",
      error: true,
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUsers,
  updateUser,
  userInvest,
  userDeposit,
  userWithdraw,
  resetPassword,
  forgotPasword,
  getUser,
  getTransaction,
  getDeposit,
  getWithdrawal,
  getInvestment,
};
