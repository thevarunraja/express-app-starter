import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import serverless from "serverless-http";
import router from "./router";

process.env.NODE_ENV === "development" && dotenv.config({});

const app = express();
app.use(helmet());

let corsOptions;
if (process.env.NODE_ENV === "development") {
  corsOptions = {
    origin: "*",
  };
} else {
  corsOptions = {
    origin: "*", //add array of domain names
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  };
}
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded());
app.use(router);

if (process.env.NODE_ENV === "development") {
  const PORT = process.env.PORT || 3333;
  const HOST = process.env.HOST || "http://127.0.0.1";
  app.listen(PORT, () => {
    console.log(`Running on port ${HOST}:${PORT}`);
  });
}

const handler = serverless(app);

export { handler, app };
