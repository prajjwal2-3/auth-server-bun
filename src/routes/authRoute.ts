import express from 'express'
import { signInUsingOTP, signInUsingPassword, signUp, verifyRegistrationOtp } from '@/controllers/authControllers'
import { verifyRequest } from '@/middlewares/verifyRequest'
const route = express.Router()

route.post('/signup',signUp)
route.post('/verifySignUpOtp',verifyRequest,verifyRegistrationOtp)
route.post('/signIn',signInUsingPassword)
route.post('/generateSignInOTP',signInUsingOTP)

export default route