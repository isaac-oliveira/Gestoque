if (process.env.NODE_ENV !== 'production') require('dotenv/config');
import express from 'express';
import Router from './routes';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());
app.use(Router);

export default app;
