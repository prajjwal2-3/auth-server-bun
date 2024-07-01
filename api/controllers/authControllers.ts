import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

import { cookie, jwt_secrets } from "../config";
import { generateJwtToken } from "../utilities/jwt/jwt";
import {
  sendVerificationEmail,
  verifiedEmail,
  sendSignInOTP,
} from "../utilities/email/emailFunction";
import {
  name_validator,
  email_validator,
  password_validator,
  token_validator,
} from "../validations/validate";

const sign_up_validation = z.object({
  name: name_validator,
  email: email_validator,
  password: password_validator,
});
const sign_in_with_otp_validation = z.object({
  email: email_validator,
});
const sign_in_validation = z.object({
  email: email_validator,
  password: password_validator,
});

const forgot_password_validation = z.object({
  token: token_validator,
  email: email_validator,
  password: password_validator,
  new_password: password_validator,
});

export const signUp = async (req: any, res: any) => {
  const { name, email, password } = req.body;
  const testmail = "prajjwalbh25@gmail.com";
  const validation = sign_up_validation.safeParse({ name, email, password });
  if (!validation.success) {
    const errors = validation.error.errors.map((err) => err.message);
    return res.status(400).json({ errors });
  }
  const verificationOTP = Math.floor(100000 + Math.random() * 900000);
  console.log(verificationOTP)
  sendVerificationEmail(verificationOTP, email);
  try {
    const acessToken = generateJwtToken(
      email,
      jwt_secrets.access_token.secret,
      jwt_secrets.access_token.expiry
    );
    const refreshToken = generateJwtToken(
      email,
      jwt_secrets.refresh_token.secret,
      jwt_secrets.refresh_token.expiry
    );
    console.log(acessToken);
    console.log(refreshToken);
    if (!acessToken)
      return res.status(500).json({
        message: "error generating access token, user registration failed.",
      });
    const hashedPassword = await Bun.password.hash(password);
    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        verification_otp: verificationOTP,
      },
    });
    if (!newUser)
      return res.status(500).json({ message: "error creating a new user" });
    const userId = newUser.id;
    const log = await prisma.logs.create({
      data: {
        userId,
        statement: `user ${newUser.name} was registered successfully`,
      },
    });

    return res
      .status(200)
      
      .json({ message: "User Registered Successfully" ,access_token_from_s:acessToken,refresh_token_from_s:refreshToken});
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
export const verifyRegistrationOtp = async (req: any, res: any) => {
  try {
    const { otp } = req.body;
    console.log(otp)
    const userEmail = req.user;
    console.log(userEmail);
    if (!userEmail) {
      return res
        .status(401)
        .json({ message: "Unauthorized: User not authenticated" });
    }
    const user = await prisma.user.findUnique({
      where: {
        email: userEmail,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (otp === user?.verification_otp.toString()) {
      const verifiedUer = await prisma.user.update({
        where: {
          email: userEmail,
        },
        data: {
          is_verified: true,
        },
      });
      const log = await prisma.logs.create({
        data: {
          userId: verifiedUer.id,
          statement: `user ${verifiedUer.name} verified successfully by OTP.`,
        },
      });
      verifiedEmail(verifiedUer.name, verifiedUer.email);
      return res.status(200).json({ message: "User verified successfully" });
    } else {
      return res.status(401).json({ message: "Invalid OTP" });
    }
  } catch (error) {
    console.log("error verifying otp");
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const signInUsingPassword = async (req: any, res: any) => {
  const { email, password } = req.body;

  const validation = sign_in_validation.safeParse({ email, password });
  if (!validation.success) {
    const errors = validation.error.errors.map((err) => err.message);
    return res.status(400).json({ errors });
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!existingUser)
      return res.status(403).json({ message: "Invalid email" });
    const isMatch = await Bun.password.verify(password, existingUser.password);
    if (!isMatch) return res.status(403).json({ message: "Invalid password" });
    const log = await prisma.logs.create({
      data: {
        userId: existingUser.id,
        statement: `user ${existingUser.name} was logged in successfully by password authentication`,
      },
    });

    const acessToken = generateJwtToken(
      email,
      jwt_secrets.access_token.secret,
      jwt_secrets.access_token.expiry
    );
    const refreshToken = generateJwtToken(
      email,
      jwt_secrets.refresh_token.secret,
      jwt_secrets.refresh_token.expiry
    );

    return res
      .status(200)
      .cookie(cookie.ACCESS_TOKEN, acessToken, cookie.OPTIONS)
      .cookie(cookie.REFRESH_TOKEN, refreshToken, cookie.OPTIONS)
      .json({ message: "User Signed in successfully" });
  } catch (error: any) {
    console.error(`Controller:Auth:Error in [Login a User] : ${error.message}`);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
export const generateSignInOTP = async (req: any, res: any) => {
  const { email } = req.body;

  try {
    const OTP = Math.floor(100000 + Math.random() * 900000);
    const user = await prisma.user.update({
      where: {
        email: email,
      },
      data: {
        verification_otp: OTP,
      },
    });
    sendSignInOTP(OTP, email, user.name);
    return res
      .status(200)
      .json({ message: "OTP generated successfully and sent over mail." });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({
        message: "Error generating OTP, Try Signing In using Password.",
      });
  }
};

export const signInUsingOTP = async (req: any, res: any) => {
  const { otp, email } = req.body;
  const validation = sign_in_with_otp_validation.safeParse({ email });
  if (!validation.success) {
    const errors = validation.error.errors.map((err) => err.message);
    return res.status(400).json({ errors });
  }
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!existingUser)
      return res.status(403).json({ message: "Invalid email" });
    if (otp == !existingUser.verification_otp)
      return res.status(403).json({ message: "Invalid OTP" });
    const log = await prisma.logs.create({
      data: {
        userId: existingUser.id,
        statement: `user ${existingUser.name} was logged in successfully by OTP authentication`,
      },
    });

    const acessToken = generateJwtToken(
      email,
      jwt_secrets.access_token.secret,
      jwt_secrets.access_token.expiry
    );
    const refreshToken = generateJwtToken(
      email,
      jwt_secrets.refresh_token.secret,
      jwt_secrets.refresh_token.expiry
    );

    return res
      .status(200)
      .cookie(cookie.ACCESS_TOKEN, acessToken, cookie.OPTIONS)
      .cookie(cookie.REFRESH_TOKEN, refreshToken, cookie.OPTIONS)
      .json({ message: "User Signed in successfully" });
  } catch (error) {
    console.error(`Controller:Auth:Error in [Login a User] : ${error}`);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
export const isAuthenticated = async (req:any,res:any) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ message: 'User ID is missing' });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isAuth = user.is_verified;

    return res.status(200).send(isAuth);
  } catch (error) {
    console.error('Error checking authentication:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
export const signOut = async (req: any, res: any) => {
  try {
    
    res.clearCookie(cookie.ACCESS_TOKEN);
    res.clearCookie(cookie.REFRESH_TOKEN);


    const userId = req.userId
    if (userId) {
      await prisma.logs.create({
        data: {
          userId,
          statement: `User with ID ${userId} signed out successfully.`,
        },
      });
    }

    return res.status(200).json({ message: "User signed out successfully" });
  } catch (error) {
    console.error(`Controller:Auth:Error in [Sign Out] : ${error}`);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

