import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import connect from './config/db';

import userRouter from './routes/api/userRoute'
import noteRouter from './routes/api/noteRoute'

dotenv.config();
connect();

const app: Express = express();
const port = process.env.PORT;

app.use('/', userRouter);
app.use('/', noteRouter);

//app.use('/notes', routerNote);

app.listen(port, () => {
    console.log(`[SERVER]: Server is running at http://localhost:${port}`);
});
