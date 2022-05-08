import express from "express";
import { app as webapp } from "./controllers/web";
import { app as restapp } from "./controllers/rest";

const app = express();
app.use("/", webapp);
app.use("/api", restapp);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const server = app.listen(3001);
