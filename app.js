import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

// app.use(express.json({limit: "16kb"}));
// app.use(express.urlencoded({extended: true, limit: "16kb"}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));


//~ routes import
import healthCheckRouter from "./routes/health_check_router.js";
import setupRouter from "./routes/setup_router.js";
import searchAirportRouter from "./routes/search_airport_route.js";

//~ routes declration
app.use("/api/v1/healthcheck", healthCheckRouter);
app.use("/api/v1/setup", setupRouter);
app.use("/api/v1/search", searchAirportRouter);


export { app } ;