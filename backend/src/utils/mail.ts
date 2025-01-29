import nodemailer from "nodemailer";
import Mailgen from "mailgen";
import { IEmailContent } from "../type";

const sendEmail = async (options: IEmailContent) => {
  // Configure mailgen by setting a theme and your product info
  const mailGenerator = new Mailgen({
    theme: "salted",
    product: {
      logo: "https://mailgen.js/img/logo.png",
      logoHeight: "30px",
      name: "Panel",
      link: "https://mailgen.js/",
      copyright: "Copyright © 2024 Panel. All rights reserved.",
    },
  });

  // Generate the plaintext version of the e-mail (for clients that do not support HTML)
  const emailText = mailGenerator.generatePlaintext(options.mailgenContent);
  // Generate an HTML email with the provided contents
  const emailHTML = mailGenerator.generate(options.mailgenContent);

  const transporter = nodemailer.createTransport({
    host: process.env.HOST,
    port: +process.env.PORT!,
    auth: {
      user: process.env.USER,
      pass: process.env.PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: process.env.USER, // sender address
      to: options.email, // receiver address
      subject: options.subject, // Subject line
      text: emailText, // plain text body
      html: emailHTML, // html body
    });
  } catch (error) {
    //
    console.error(
      "Email service failed silently. Make sure you have provided your NODEMAILER credentials in the .env file"
    );
    console.error("Error", error);
  }
};

const forgotPasswordEmailMailgen = (
  username: string,
  verificationUrl: string
) => {
  return {
    body: {
      name: username,
      intro:
        "You have received this email because a password reset request for your account was received",
      action: {
        instructions: "Click the button to reset your password:",
        button: {
          color: "#22BC66", // Optional action button color
          text: "Reset your password",
          link: verificationUrl,
        },
      },
      outro:
        "If you did not request a password reset, no further action is required on your part.",
    },
  };
};

const verifyUserEmailMailgen = (username: string, verificationUrl: string) => {
  return {
    body: {
      name: username,
      intro:
        "You have received this email because a email verification request was received",
      action: {
        instructions: "Click the button to verify your email:",
        button: {
          color: "#22BC66", // Optional action button color
          text: "Verify Email",
          link: verificationUrl,
        },
      },
      outro:
        "If you did not request a email verification, no further action is required on your part.",
    },
  };
};

export { sendEmail, forgotPasswordEmailMailgen, verifyUserEmailMailgen };
