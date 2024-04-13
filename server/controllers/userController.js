const User = require("../models/userModel.js");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { enc } = require("crypto-js");
const accountSid = "AC87a4dee030cf415e33ea9698c520bd21";
const authToken = "05748765895ffb447c395fc0cd13401a";
const client = require("twilio")(accountSid, authToken);

require("dotenv").config();

const generateToken = (user) => {
  const payload = { id: user._id };
  const expiresInDuration = "1d";
  return jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: expiresInDuration,
  });
};

const loginUser = async (req, res) => {
  const { userName, password } = req.body;
  const user = await User.findOne({ userName });
  if (user && (await user.matchPassword(password))) {
    const token = generateToken(user);
    res.cookie("token", token);
    res.json({
      token,
      user,
    });
  } else {
    res.status(401).json("Invalid Email or Password");
  }
};

const registerUser = async (req, res) => {
  const { userName, fullName, email, password, phoneNo, pin } = req.body;
  const amount = 10000;
  const upiId = `${userName}@offpay`;
  const userExists = await User.findOne({ $or: [{ email }, { userName }] });
  if (userExists) {
    res.status(404).json({ messsage: "Username or Email Already Exist" });
  } else {
    const user = await User.create({
      userName,
      fullName,
      email,
      password,
      phoneNo,
      pin,
      amount,
      upiId,
    });
    if (user) {
      res.status(201).json({
        Success: "User Registered Successfully!",
      });
    } else {
      res.status(400);
    }
  }
};

const getUser = async (req, res) => {
  const userId = req.headers.authorization;
  if (userId) {
    const user = await User.findOne({ _id: userId });
    if (user) {
      return res.status(200).send({ user });
    }
  } else {
    return res.status(401).send({ error: "User Not Found...!" });
  }
};

const sendMoney = async (req, res) => {
  const { amount, receiverUpi, senderId, pin } = req.body;
  const sender = await User.findOne({ _id: senderId });
  const receiver = await User.findOne({ upiId: receiverUpi });
  const senderUpi = sender.upiId;
  if (sender.amount > amount && sender.pin == pin) {
    sender.amount = sender.amount - amount;
    receiver.amount = parseInt(receiver.amount) + parseInt(amount);
    const referenceNumber = Math.floor(Math.random() * 1000000000);
    sender.transactions.push({
      type: "Debit",
      referenceNumber: referenceNumber,
      amount: amount,
      upiId: receiverUpi,
      date: new Date().toLocaleString(),
    });
    receiver.transactions.push({
      type: "Credit",
      referenceNumber: referenceNumber,
      amount: amount,
      upiId: senderUpi,
      date: new Date().toLocaleString(),
    });
    await sender.save();
    await receiver.save();
    res.status(200).json({ message: "Amount Sent Successfully" });
  } else {
    res.status(400).json({ message: "Insufficient Balance" });
  }
};

const sendMoneyOffline = async (req, res) => {
  const encodedData = req.body.message;
  const decodedData = Buffer.from(encodedData, "base64").toString("utf8");
  const data = JSON.parse(decodedData);
  const choice = data.option;
  if (choice == "1") {
    console.log("Option 1");
    const pin = data.pin;
    const amount = data.amount;
    const receiverUpi = data.receiverId;
    const senderId = data.senderId;
    const sender = await User.findOne({ _id: senderId });
    const receiver = await User.findOne({ upiId: receiverUpi });
    const senderUpi = sender.upiId;
    var options = { timeZone: "Asia/Kolkata", timeZoneName: "short" };
    const date = new Date().toLocaleString("en-IN", options);
    if (sender.amount > amount && sender.pin == pin) {
      sender.amount = sender.amount - amount;
      receiver.amount = parseInt(receiver.amount) + parseInt(amount);
      const referenceNumber = Math.floor(Math.random() * 1000000000);
      const Recievermessage = `Amount of Rs.${amount} has been credited to your account from ${sender.fullName}(${senderUpi})`;
      const Sendermessage = `Amount of Rs.${amount} has been debited from your account to ${receiver.fullName}(${receiverUpi})`;
      const RecieverPhone = receiver.phoneNo;
      const SenderPhone = sender.phoneNo;
      sender.transactions.push({
        type: "Debit",
        referenceNumber: referenceNumber,
        amount: amount,
        upiId: receiverUpi,
        date: date,
      });
      receiver.transactions.push({
        type: "Credit",
        referenceNumber: referenceNumber,
        amount: amount,
        upiId: senderUpi,
        date: date,
      });
      await sender.save();
      await receiver.save();
      console.log("Amount Sent Successfully");
      client.messages
        .create({
          body: Recievermessage,
          from: "+13344714125",
          to: `+91${RecieverPhone}`,
        })
        .then((message) => console.log(message.sid));
      client.messages
        .create({
          body: Sendermessage,
          from: "+13344714125",
          to: `+91${SenderPhone}`,
        })
        .then((message) => console.log(message.sid));

      res.status(200).json({ message: "Amount Sent Successfully" });
    } else {
      console.log("Insufficient Balance or Wrong Pin");
      client.messages
        .create({
          body: "Transaction Failed due to Insufficient Balance or Wrong Pin",
          from: "+13344714125",
          to: `+91${SenderPhone}`,
        })
        .then((message) => console.log(message.sid));

      res.status(400).json({ message: "Insufficient Balance or Wrong Pin" });
    }
  } else if (choice == "2") {
    console.log("Option 2");
    const pin = data.pin;
    const senderId = data.senderId;
    const sender = await User.findOne({ _id: senderId });
    const SenderPhone = sender.phoneNo;
    const Sendermessage = `Your Account Balance is Rs.${sender.amount}`;
    if (sender.pin == pin) {
      console.log("Balance:", sender.amount);
      client.messages
        .create({
          body: Sendermessage,
          from: "+13344714125",
          to: `+91${SenderPhone}`,
        })
        .then((message) => console.log(message.sid));

      res.status(200).json({ balance: sender.amount });
    } else {
      console.log("Wrong Pin");
      client.messages
        .create({
          body: "Unable to check balance due to Wrong Pin",
          from: "+13344714125",
          to: `+91${SenderPhone}`,
        })
        .then((message) => console.log(message.sid));
      res.status(400).json({ message: "Wrong Pin" });
    }
  } else if (choice == "3") {
    console.log("Option 3");
    const senderId = data.senderId;
    const sender = await User.findOne({ _id: senderId });
    const SenderPhone = sender.phoneNo;
    const last5Transactions = sender.transactions.slice(-5);
    console.log("Last 5 Transactions:", last5Transactions);
    client.messages
      .create({
        body: `Last 5 Transactions: ${last5Transactions}`,
        from: "+13344714125",
        to: `+91${SenderPhone}`,
      })
      .then((message) => console.log(message.sid));
    res.status(200).json({ last5Transactions });
  } else {
    console.log("Invalid Option");
    client.messages
      .create({
        body: "Invalid Option",
        from: "+13344714125",
        to: `+91${SenderPhone}`,
      })
      .then((message) => console.log(message.sid));
    res.status(400).json({ message: "Invalid Option" });
  }
};

module.exports = {
  loginUser,
  registerUser,
  getUser,
  sendMoney,
  sendMoneyOffline,
};
