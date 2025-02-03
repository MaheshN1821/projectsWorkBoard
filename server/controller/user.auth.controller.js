import User from "../model/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

const handleUserRegister = async (req, res) => {
  const { username, phone_number, age, email, password } = req.body;

  if (!username || !phone_number || !age || !email || !password) {
    return res.status(400).json({ error: "Enter all the Details" });
  }

  try {
    const userExists = await User.findOne({ email: email });

    if (userExists) {
      return res.status(409).json({ error: "Email Id exists!" });
    }

    const hashedPwd = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username: username,
      phone_number: phone_number,
      age: age,
      email: email,
      password: hashedPwd,
    });

    const result = await newUser.save();

    if (result) {
      return res
        .status(201)
        .json({ message: "User Registration Successfull!" });
    } else {
      return res.status(500).json({ error: "Try again later!" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Try again later!" });
  }
};

const handleEmail = async (req, res) => {
  const { email } = req.body;

  try {
    const response = await User.findOne({ email: email });

    const num = Math.floor(Math.random() * 999979) + 18;

    if (response) {
      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "maheshmahi18042004@gmail.com",
          pass: `${process.env.EMAIL_PASS}`,
        },
      });

      let mailOptions = {
        from: "maheshmahi18042004@gmail.com",
        to: `${email}`,
        subject: "To Update the Password",
        text: `${num}`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });

      return res.status(200).json({ otp: num });
    } else {
      return res.status(404).json({ error: "Email id does not exists!" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Try again later!" });
  }
};

const handlePassswordReset = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Enter all the details!" });
  }

  try {
    const existingUser = await User.findOne({ email: email });
    const hashedPwd = await bcrypt.hash(password, 10);
    const response = await User.findByIdAndUpdate(
      existingUser._id,
      { password: hashedPwd },
      { new: true }
    );
    return res.status(200).json({ response });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Try again later!" });
  }
};

const handleUserLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Enter all the details!" });
  }

  try {
    const existingUser = await User.findOne({ email: email });
    if (!existingUser) {
      return res.status(401).json({ error: "Invalid Credentials!" });
    }

    const hashedPwd = existingUser?.password;
    const match = await bcrypt.compare(password, hashedPwd);

    if (!match) {
      return res.status(401).json({ error: "Invalid Credentials!" });
    }

    const accToken = jwt.sign({ email: email }, process.env.SEC_ACC, {
      expiresIn: "15m",
    });

    const refToken = jwt.sign({ email: email }, process.env.SEC_REF, {
      expiresIn: "8h",
    });

    res.cookie("jwt", refToken, {
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60 * 24 * 7,
    });

    const response = await User.findByIdAndUpdate(
      existingUser._id,
      {
        refreshToken: refToken,
      },
      { new: true }
    );

    return res.status(200).json({ accessToken: accToken, response });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Try again Later" });
  }
  res.status(200).json({ message: "User Login" });
};

const handleUserLogout = async (req, res) => {
  // const refToken = req?.cookies?.jwt;

  // if (!refToken) {
  //   console.log("im in 1st if");
  //   return res.sendStatus(401);
  // }

  try {
    // const existingUser = await User.findOne({ refreshToken: refToken });

    // if (!existingUser) {
    //   res.clearCookie("jwt", {
    //     httpOnly: true,
    //     secure: true,
    //   });
    //   console.log("im in 2nd if");
    //   return res.status(200).json({ message: "Logout Successfull!" });
    // }

    // await User.findByIdAndUpdate(
    //   existingUser._id,
    //   { refreshToken: "" },
    //   { new: true }
    // );

    // res.clearCookie("jwt", {
    //   httpOnly: true,
    //   secure: true,
    // });

    return res.status(200).json({ message: "Logout Successfull!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Try again later!" });
  }
};

export {
  handleUserRegister,
  handleUserLogin,
  handleUserLogout,
  handleEmail,
  handlePassswordReset,
};
