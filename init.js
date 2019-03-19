import dotenv from "dotenv";
import "./db";
import app from "./app";

import "./models/User";
import "./models/Video";
import "./models/Comment";

dotenv.config();

const PORT = process.env.PROT || 4000;

const handleListening = () =>
  console.log(`Listening on: http://localhost:${PORT}`);

app.listen(PORT, handleListening);
