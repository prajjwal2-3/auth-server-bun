import express from "express";
import helmet from "helmet";
import hpp from "hpp";
import cors from 'cors'
import cookieParser from 'cookie-parser'
import AUTH_ROUTE from "./routes/authRoute";
import { PrismaClient } from "@prisma/client";
import { sendNormalEmail } from "./utilities/email/emailFunction";

const prisma = new PrismaClient();
const app = express();
const corsOptions = {
  
  origin: 'https://easevent.vercel.app/', // specify your client's origin
  credentials: true // allows the server to accept cookies from the client
};

app.use(cors(corsOptions));
const PORT = Bun.env.PORT;
app.use(helmet());
app.use(hpp());

app.use(express.json());
app.use(cookieParser())
app.use("/auth", AUTH_ROUTE);

app.post("/testuser",async (req:any,res:any)=>{
  const {name,email,phone_number,password}=req.body
 try{
  const newUser =await prisma.testUser.create({
    data:{
      email,
      name,
      password,
      phone_number
    }
  })
  console.log(newUser)
  sendNormalEmail(email,name)
  res.status(200).json({message:'user created successfully',user:newUser})
 }catch(error){
  console.log(error)
  res.status(500).json({message:'something went wrong'})
 }
})

app.listen(PORT, () => {
  try {
    console.log(`⚡ Server is running at port ${PORT}`);
  } catch (error) {
    console.log(`🥲 Failed to start the server at port ${PORT}`);
  }
});
