import jwt from 'jsonwebtoken'


export const generateJwtToken = (email: string,name:string,secret_key:string,expirationtime:number )=>{
    const payload = { email,name }; 
    const jwts = jwt.sign(payload,secret_key,{expiresIn:Math.floor((Date.now() + expirationtime * 60000) / 1000)})
    return jwts
}

export const verifyJwtToken = (token:string,secret_key:string)=>{
    try{
        const decoded= jwt.verify(token,secret_key)
        return {success:true,data:decoded}
    }catch(error){
        return error;
    }
}