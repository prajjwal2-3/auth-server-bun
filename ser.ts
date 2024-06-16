import jwt from 'jsonwebtoken';
import { jwt_secrets } from '@/config';

const generateAccessToken = (email: string) => {
    const payload = { email }; // Wrap the email in an object
    const jwts = jwt.sign(payload, jwt_secrets.email_verification.secret, { expiresIn: '2d' });
    console.log(jwts);
};

generateAccessToken('helloworld');
