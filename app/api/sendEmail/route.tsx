import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: any) {
  try {
    const { subject, message, email, emailService } = await req.json();

    //Send with GMail
    if (emailService === "gmail") {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        host: process.env.EMAIL_HOST,
        port: 587,
        secure: true,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const mailOption = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: subject,
        html: message,
      };

      await transporter.sendMail(mailOption);

      return NextResponse.json(
        { message: "Email sent successfully" },
        { status: 200 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to send email" },
      { status: 500 }
    );
  }
}
