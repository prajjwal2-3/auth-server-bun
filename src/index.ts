import express from "express";
import helmet from "helmet";
import hpp from "hpp";

import AUTH_ROUTE from "@/routes/authRoute";
const app = express();
const PORT = Bun.env.PORT;
app.use(helmet());
app.use(hpp());

app.use(express.json());

app.use("/auth", AUTH_ROUTE);

app.listen(PORT, () => {
  try {
    console.log(`⚡ Server is running at port ${PORT}`);
  } catch (error) {
    console.log(`🥲 Failed to start the server at port ${PORT}`);
  }
});
