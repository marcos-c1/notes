import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import connect from './config/db';
import verifyJWT from './middleware/verifyJWT';

import userRouter from './routes/api/userRoute';
import noteRouter from './routes/api/noteRoute';
import authRouter from './routes/api/authRoute';
import refreshRouter from './routes/api/refreshRoute';

var cors = require('cors');

const cookieParser = require("cookie-parser");

dotenv.config();
connect();

const app: Express = express();
const port = process.env.PORT;

// Middleware for cookies
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// CORS
app.use(cors({
    origin: 'http://localhost:1420'
}));


// Routes
app.use('/', userRouter);
app.use('/', noteRouter);
app.use('/', authRouter);
app.use('/', refreshRouter);

app.use(verifyJWT);

app.listen(port, () => {
    console.log(`[SERVER]: Server is running at http://localhost:${port}`);
});
