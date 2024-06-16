import nodemailer from 'nodemailer'

export const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.google.com",
    port: 587,
    secure: false,
    auth: {
      user: Bun.env.MAIL_HOST,
      pass: Bun.env.MAIL_PASSWORD,
    },
  });
  
 export const mailOptions = {
    from: {
      name: "Easevent",
      address: Bun.env.MAIL_HOST,
    },
    to: "prajjwalbh25@gmail.com",
    subject: "Welcome to Easevent!!!",
    html: `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Easevent!</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f0f0f0;
        margin: 0;
        padding: 20px;
        text-align: center;
      }
      .card {
        background-color: #ffffff;
        max-width: 600px;
        margin: 20px auto;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }
      h1 {
        color: #333333;
      }
      p {
        color: #666666;
        line-height: 1.6;
      }
      .button {
        display: inline-block;
       
        text-decoration:none;
        padding: 10px 20px;
       
        border-radius: 4px;
        margin-top: 20px;
      }
    </style>
  </head>
  <body>
    <div class="card">
      <h1>Welcome to Easevent!</h1>
      <p>Dear Customer,</p>
      <p>We are thrilled to have you join Easevent. We look forward to working together and creating memorable events.</p>
      <p>Best regards,<br>The Easevent Team</p>
      <a href="easevent.vercel.app" class="button">Visit Easevent</a>
    </div>
  </body>
  </html>
  `,
  };