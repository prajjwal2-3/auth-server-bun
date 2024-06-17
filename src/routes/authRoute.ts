import express from 'express'
import { signUp, verifyRegistrationOtp } from '@/controllers/authControllers'
import { verifyRequest } from '@/middlewares/verifyRequest'
const route = express.Router()

route.post('/signup',signUp)
route.post('/verifySignUpOtp',verifyRequest,verifyRegistrationOtp)

export default route