import express, { Application, Request, Response } from 'express';
import cors from 'cors';

import notFoundMiddleware from './middleware/not-found';
import errorHandlerMiddleware from './middleware/error-handler';
import userRouter from './modules/user/user.routes';
import tourRouter from './modules/tour/tour.routes';
import ratingRouter from './modules/rating/rating.routes';


// initialize express application
const app: Application = express();

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

// Routes
app.use('/api/v1/users', userRouter)
app.use('/api/v1/tours', tourRouter) 
app.use('/api/v1/ratings', ratingRouter) // Importing rating routes


// Home route
app.get('/', (req: Request, res: Response) => {

  // // This will be caught by the error handler middleware
  // throw new CustomAPIError('This is a custom error', 500, 'hi error');
 
  res.send(
    '<h1 style="min-height: 100vh; display: flex; justify-content: center; align-items: center">Welcome to the Tour and Travel Server</h1>',
  );
});


// Error handling middleware
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware);


export default app;