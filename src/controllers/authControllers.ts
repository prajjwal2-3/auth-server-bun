import { PrismaClient } from "@prisma/client";
import { z } from "zod";
const prisma = new PrismaClient();
import { cookie } from "@/config";
import { generateAccessToken } from "@/utilities/jwt/jwt";
import { sendVerificationEmail } from "@/utilities/email/emailFunction";
import {
  name_validator,
  email_validator,
  password_validator,
  token_validator,
} from "@/validations/validate";

const sign_up_validation = z.object({
  name: name_validator,
  email: email_validator,
  password: password_validator,
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
const testmail = 'prajjwalbh25@gmail.com'
  const validation = sign_up_validation.safeParse({ name, email, password });
  if (!validation.success) {
    const errors = validation.error.errors.map((err) => err.message);
    return res.status(400).json({ errors });
  }
  const verificationOTP = Math.floor(100000 + Math.random() * 900000);
  sendVerificationEmail(verificationOTP,testmail)
  try {
    const acessToken = generateAccessToken(email);
    console.log(acessToken)
    if(!acessToken) return res.status(500).json({message:'error generating access token, user registration failed.'})
    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        password,
        verification_otp: verificationOTP,
      },
    });
    if(!newUser) return res.status(500).json({message:'error creating a new user'})
   const userId = newUser.id
     const log = await prisma.logs.create({
        data:{
            userId,
            statement:`user ${newUser.name} was registered successfully`
        }
     })

    return res
      .status(200)
      .cookie(cookie.ACCESS_TOKEN, acessToken, cookie.OPTIONS)
      .json({ message: "User Registered Successfully",access:acessToken });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
export const verifyRegistrationOtp = (req:any,res:any)=>{
  const {otp}=req.body
}