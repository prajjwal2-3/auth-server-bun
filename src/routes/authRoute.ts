import express from 'express'
import { signUp } from '@/controllers/authControllers'
const route = express.Router()

route.post('/signup',signUp)

export default route