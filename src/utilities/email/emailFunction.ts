import nodemailer from "nodemailer";

export const sendVerificationEmail = (otp: Number, userEmail: string) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.google.com",
    port: 587,
    secure: false,
    auth: {
      user: Bun.env.MAIL_HOST,
      pass: Bun.env.MAIL_PASSWORD,
    },
  });

  let mailOptions = {
    from: {
      name: "Easevent",
      address: Bun.env.MAIL_HOST,
    },
    to: userEmail,
    subject: "Welcome to Easevent!!!",
    html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>EaseEvent Registration OTP</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            background-color: #f4f4f4;
            color: #333;
            margin: 0;
            padding: 0;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
        }
        .header {
            text-align: center;
            padding-bottom: 20px;
        }
        .header img {
            max-width: 150px;
        }
        .content {
            text-align: center;
        }
        .content h1 {
            color: #4CAF50;
        }
        .otp {
            font-size: 24px;
            font-weight: bold;
            color: #4CAF50;
            margin: 20px 0;
        }
        .footer {
            text-align: center;
            margin-top: 20px;
            font-size: 14px;
            color: #777;
        }
        .footer a {
            color: #4CAF50;
            text-decoration: none;
        }
        .logo{
        color: #4CAF50;
        font-weight: bold;
        font-size:20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <p class="logo">EASEVENT</p>
        </div>
        <div class="content">
            <h1>Welcome to EaseEvent!</h1>
            <p>Thank you for registering with us. Please use the following OTP to complete your registration:</p>
            <div class="otp">${otp}</div>
            <p>This OTP is valid for 10 minutes.</p>
        </div>
        <div class="footer">
            <p>If you did not request this, please ignore this email or contact our support.</p>
            <p>Need help? Visit our <a href="https://easevent.vercel.app/">Support Center</a>.</p>
            <p>&copy; 2024 EaseEvent. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`,
  };
  const sendMail = async (
    mailOptions: any,
    transporter: { sendMail: (arg0: any) => any }
  ) => {
    try {
      await transporter.sendMail(mailOptions);
      console.log("Email has been sent🚀");
     
    } catch (error) {
      console.log(error);
      
    }
  };

  sendMail(mailOptions, transporter);
};

export const verifiedEmail = (user:string,userEmail:string)=>{
  let transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.google.com",
    port: 587,
    secure: false,
    auth: {
      user: Bun.env.MAIL_HOST,
      pass: Bun.env.MAIL_PASSWORD,
    },
  });

  let mailOptions = {
    from: {
      name: "Easevent",
      address: Bun.env.MAIL_HOST,
    },
    to: userEmail,
    subject: "Welcome to Easevent!!!",
    html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OTP Confirmed</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .email-container {
            max-width: 600px;
            margin: auto;
            background-color: #ffffff;
            padding: 20px;
            border: 1px solid #ddd;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            padding: 10px 0;
            background-color: #4CAF50;
            color: white;
        }
        .content {
            padding: 20px;
            text-align: left;
        }
        .footer {
            text-align: center;
            padding: 10px 0;
            color: #777;
            font-size: 12px;
        }
        .button {
            display: inline-block;
            padding: 10px 20px;
            margin: 20px 0;
            font-size: 16px;
            color: white;
            background-color: #4CAF50;
            text-decoration: none;
            border-radius: 5px;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>OTP Confirmed</h1>
        </div>
        <div class="content">
            <p>Dear ${user},</p>
            <p>Your OTP has been successfully confirmed. You can now host events securely with Easevent.</p>
            <p>If you did not request this OTP or if you have any concerns, please contact our support team immediately.</p>
            <a href="[Support Link]" class="button">Contact Support</a>
            <p>Thank you for using our service!</p>
            <p>Best regards,<br>Easevent Team</p>
        </div>
        <div class="footer">
            <p> @2024 Easevent. All rights reserved.</p>
        </div>
    </div>
</body>
</html>

`,
  };
  const sendMail = async (
    mailOptions: any,
    transporter: { sendMail: (arg0: any) => any }
  ) => {
    try {
      await transporter.sendMail(mailOptions);
      console.log("Email has been sent🚀");
     
    } catch (error) {
      console.log(error);
      
    }
  };

  sendMail(mailOptions, transporter);
}

export const sendSignInOTP = (otp: Number, userEmail: string,name:string) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.google.com",
    port: 587,
    secure: false,
    auth: {
      user: Bun.env.MAIL_HOST,
      pass: Bun.env.MAIL_PASSWORD,
    },
  });

  let mailOptions = {
    from: {
      name: "Easevent",
      address: Bun.env.MAIL_HOST,
    },
    to: userEmail,
    subject: `Welcome back ${name}`,
    html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>EaseEvent Sign In OTP</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            background-color: #f4f4f4;
            color: #333;
            margin: 0;
            padding: 0;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
        }
        .header {
            text-align: center;
            padding-bottom: 20px;
        }
        .header img {
            max-width: 150px;
        }
        .content {
            text-align: center;
        }
        .content h1 {
            color: #4CAF50;
        }
        .otp {
            font-size: 24px;
            font-weight: bold;
            color: #4CAF50;
            margin: 20px 0;
        }
        .footer {
            text-align: center;
            margin-top: 20px;
            font-size: 14px;
            color: #777;
        }
        .footer a {
            color: #4CAF50;
            text-decoration: none;
        }
        .logo{
        color: #4CAF50;
        font-weight: bold;
        font-size:20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <p class="logo">EASEVENT</p>
        </div>
        <div class="content">
            <h1>Welcome to EaseEvent!</h1>
            <p>Please use the following OTP to complete your Sign In:</p>
            <div class="otp">${otp}</div>
            <p>This OTP is valid for 10 minutes.</p>
        </div>
        <div class="footer">
            <p>If you did not request this, please ignore this email or contact our support.</p>
            <p>Need help? Visit our <a href="https://easevent.vercel.app/">Support Center</a>.</p>
            <p>&copy; 2024 EaseEvent. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`,
  };
  const sendMail = async (
    mailOptions: any,
    transporter: { sendMail: (arg0: any) => any }
  ) => {
    try {
      await transporter.sendMail(mailOptions);
      console.log("Email has been sent🚀");
     
    } catch (error) {
      console.log(error);
      
    }
  };

  sendMail(mailOptions, transporter);
};