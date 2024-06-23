import express from 'express'
import { generateSignInOTP, signInUsingOTP, signInUsingPassword, signOut, signUp, verifyRegistrationOtp } from '../controllers/authControllers.ts'
import { verifyRequest } from '../middlewares/verifyRequest.ts'
const route = express.Router()

route.post('/signup',signUp)
route.post('/verifySignUpOtp',verifyRequest,verifyRegistrationOtp)
route.post('/signIn',signInUsingPassword)
route.post('/generateSignInOTP',generateSignInOTP)
route.post('/signInWithOTP',signInUsingOTP)
route.post('/signOut',verifyRequest,signOut)

export default route