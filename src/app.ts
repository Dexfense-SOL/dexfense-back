import express from 'express';
import cors from 'cors';
import baseRoutes from './api/baseRoutes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/base', baseRoutes);

export default app;