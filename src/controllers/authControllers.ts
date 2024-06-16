import { PrismaClient } from "@prisma/client";
import { z } from "zod";
const prisma = new PrismaClient()

import { name_validator, email_validator, password_validator, token_validator } from "@/validations/validate"

const sign_up_validation = z.object({
    name: name_validator,
    email: email_validator,
    password: password_validator,
})

const sign_in_validation = z.object({
    email: email_validator,
    password: password_validator,
})

const forgot_password_validation = z.object({
    token: token_validator,
    email: email_validator,
    password: password_validator,
    new_password: password_validator,
})

export const signUp = async (req:any,res:any)=>{

    const {name,email,password}=req.body;

    const validation = sign_up_validation.safeParse({ name, email, password });
    if (!validation.success) {
        const errors = validation.error.errors.map(err => err.message);
        return res.status(400).json({ errors });
    }
    const verificationOTP = Math.floor(100000 + Math.random() * 900000)
    try{
        const newUser = await prisma.user.create({
            data:{
                email,
                name,
                password,
                verification_otp:verificationOTP
             
            }
        })
        
    }catch(error){
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
}