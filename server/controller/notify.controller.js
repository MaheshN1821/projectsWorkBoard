import nodemailer from "nodemailer";

const handleUserNotify = async (req, res) => {
  const { role, name, email, phone, feedback } = req.body;
  const information = {
    role: role,
    name: name,
    email: email,
    phone: phone,
    feedback: feedback,
  };
  const processedInfo = JSON.stringify(information);
  try {
    // Create the transporter for sending emails
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "maheshmahi18042004@gmail.com",
        pass: `${process.env.EMAIL_PASS}`,
      },
    });

    // Email options
    const mailOptions = {
      from: "maheshmahi18042004@gmail.com",
      to: "maheshn0418@gmail.com",
      subject: "Contact",
      text: `${processedInfo}`,
    };

    // Function to send email
    const sendEmail = () => {
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log("Error:", error);
        } else {
          console.log("Email sent:", info.response);
        }
      });
    };

    sendEmail();

    res.status(200).json({ message: "Done" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Try again later!" });
  }
};

export default handleUserNotify;
