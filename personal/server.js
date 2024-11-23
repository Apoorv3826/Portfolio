const express = require("express");
const { Router, json } = require("express");
const cors = require("cors");
const { createTransport } = require("nodemailer");
const dotenv = require('dotenv');
dotenv.config();


const app = express();
const router = Router();

app.use(cors({ origin: "http://localhost:3000" }));
app.use(json());
app.use("/", router);

const PORT = 5000; // Changed to a variable for better flexibility
app.listen(PORT, () => console.log(`Server Running on port ${PORT}`));

const contactEmail = createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
});

contactEmail.verify((error) => {
  if (error) {
    console.log("Error verifying email transport:", error);
  } else {
    console.log("Ready to Send");
  }
});

router.post("/contact", (req, res) => {
  const name = req.body.firstname + " " + req.body.lastname;
  const email = req.body.email;
  const message = req.body.message;
  const phone = req.body.phone;
  const mail = {
    from: name,
    to: "mreloaded79@gmail.com", 
    subject: "Contact Form Submission - Portfolio",
    html: `<p>Name: ${name}</p>
           <p>Email: ${email}</p>
           <p>Phone: ${phone}</p>
           <p>Message: ${message}</p>`,
  };

  contactEmail.sendMail(mail, (error) => {
    if (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ code: 500, status: "Failed to send message" });
    } else {
      res.json({ code: 200, status: "Message Sent" });
    }
  });
});
