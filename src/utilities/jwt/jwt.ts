import jwt from 'jsonwebtoken'
import { jwt_secrets } from '@/config'

export const generateAccessToken = (email: string )=>{
    return jwt.sign(email,jwt_secrets.email_verification.secret,{expiresIn:'172800s'})
}