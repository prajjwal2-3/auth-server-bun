import express from "express";
import helmet from "helmet";
import hpp from "hpp";
import cors from 'cors'
import cookieParser from 'cookie-parser'
import AUTH_ROUTE from "./routes/authRoute";
const app = express();
const corsOptions = {
  origin: 'http://localhost:3100', // specify your client's origin
  credentials: true // allows the server to accept cookies from the client
};

app.use(cors(corsOptions));
const PORT = Bun.env.PORT;
app.use(helmet());
app.use(hpp());

app.use(express.json());
app.use(cookieParser())
app.use("/auth", AUTH_ROUTE);

app.listen(PORT, () => {
  try {
    console.log(`⚡ Server is running at port ${PORT}`);
  } catch (error) {
    console.log(`🥲 Failed to start the server at port ${PORT}`);
  }
});
