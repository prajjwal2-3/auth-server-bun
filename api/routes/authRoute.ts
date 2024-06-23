import express from 'express'
import { generateSignInOTP, signInUsingOTP, signInUsingPassword, signOut, signUp, verifyRegistrationOtp } from '../controllers/authControllers'
import { verifyRequest } from '../middlewares/verifyRequest'
import { uthjaBKL } from '@/controllers/testWake'
const route = express.Router()

route.post('/signup',signUp)
route.post('/verifySignUpOtp',verifyRequest,verifyRegistrationOtp)
route.post('/signIn',signInUsingPassword)
route.post('/generateSignInOTP',generateSignInOTP)
route.post('/signInWithOTP',signInUsingOTP)
route.post('/signOut',verifyRequest,signOut)
route.get('/uthjaBKL',uthjaBKL)

export default route