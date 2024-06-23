import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { cookie, jwt_secrets } from "../config.ts";
import { generateJwtToken, verifyJwtToken } from "../utilities/jwt/jwt.ts";
const prisma = new PrismaClient();

export const verifyRequest = async (req: any, res: any, next: any) => {
  interface DecodedJwtPayload {
   data:{
    email: string;
   }
  }
  try {
    console.log(req.headers)
    
    const cookies = req.headers.cookie.split("; ").reduce((acc: { [x: string]: any; }, cookie: { split: (arg0: string) => [any, any]; }) => {
      const [name, value] = cookie.split("=");
      acc[name] = value;
      return acc;
    }, {});
    
    const acessToken = cookies.access_token;
    const refreshToken = cookies.refresh_token;
    console.log(acessToken)
    console.log(refreshToken)
    if (!acessToken || !refreshToken) {
      return res.status(403).json({ error: "No authorization token provided" });
    }
    try {
      const token = (await verifyJwtToken(
        acessToken,
        jwt_secrets.access_token.secret
      )) as DecodedJwtPayload;
      console.log(token)
      const user = await prisma.user.findUnique({
        where:{
          email:token.data.email
        }
      })
      req.user = token.data.email;
      req.userId = user?.id
      next();
    } catch (error: any) {
      if (error.name === "TokenExpiredError") {
        try {
          const userInfo = (await verifyJwtToken(
            refreshToken,
            jwt_secrets.refresh_token.secret
          )) as DecodedJwtPayload;
          const email = userInfo.data.email;
          const newAcessToken = generateJwtToken(
            email,
            jwt_secrets.access_token.secret,
            jwt_secrets.access_token.expiry
          );
          res.cookie(cookie.ACCESS_TOKEN, newAcessToken, cookie.OPTIONS);
          req.user = userInfo.data.email;
          next();
        } catch (error: any) {
          if (
            error.name === "TokenExpiredError" ||
            error.name === "JsonWebTokenError"
          ) {
            res.clearCookie(cookie.ACCESS_TOKEN);
            res.clearCookie(cookie.REFRESH_TOKEN);
            return res
              .status(403)
              .json({ error: "Session expired. Please refresh the page." });
          } else {
            console.error(error);
            return res.status(500).json({ error: "Internal Server Error" });
          }
        }
      } else if (error.name === "JsonWebTokenError") {
        return res.status(403).json({ error: "Invalid token" });
      } else {
        throw error;
      }
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
