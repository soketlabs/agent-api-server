import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(process.cwd(), '../../.env') });

import express from 'express';
import bodyParser from 'body-parser';
import routes from '../routes.js';
import connectDB from '../utils/db.js';

const app = express();
const PORT = process.env.API_SERVER_PORT || 4008;

const db = connectDB();
// console.log(db.showCollections());

// Middleware setup
app.use(bodyParser.json());

// Routes setup
app.use('/api', routes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});