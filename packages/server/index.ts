import express from 'express';

import dotenv from 'dotenv';
import router from './routes';



dotenv.config();



const app = express();
app.use(router);
app.use(express.json());





app.listen(3000, () => {
    console.log("Here it started")
})


