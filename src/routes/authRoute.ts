import express from 'express'
import { signInUsingPassword, signUp, verifyRegistrationOtp } from '@/controllers/authControllers'
import { verifyRequest } from '@/middlewares/verifyRequest'
const route = express.Router()

route.post('/signup',signUp)
route.post('/verifySignUpOtp',verifyRequest,verifyRegistrationOtp)
route.post('/signin',signInUsingPassword)

export default route