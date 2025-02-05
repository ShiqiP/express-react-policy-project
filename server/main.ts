import express, { ErrorRequestHandler, json } from 'express';
import morgan from 'morgan';
import router from './router/index';
import cors from "cors";
import { getResponseBody } from "./utils";

const port = 8000

// 1. init
const app = express();

// 2. configurations
app.set('x-powered-by', true);

// 3. middleware
app.use(morgan('dev'));
app.use(json()); // get the body from req

// 4. routing
// cors
const corsOptions = {
    origin: (origin, callback) => {
        // if (origin) {
        //     callback(null, true)
        // } else {
        //     callback(new Error('Not allowed by CORS'))
        // }
        callback(null, true)
    }
}
app.use(cors(corsOptions));
app.use('/', router)


// 5. error handlers
const erroHandler: ErrorRequestHandler = (err, req, res, next) => {
    res.status(err.status || 500).json(err)
}
app.use(erroHandler);

// 6. bootstrap 
app.listen(port, () => { console.log(`listen to localhost:${port} enjoy your journey`) });