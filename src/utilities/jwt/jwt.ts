import jwt from 'jsonwebtoken'
import { jwt_secrets } from '@/config'

export const generateAccessToken = (email: string )=>{
    const payload = { email }; 
    const jwts = jwt.sign(payload,jwt_secrets.email_verification.secret,{expiresIn:'172800s'})
    return jwts
}