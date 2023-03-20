const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

//1)Middleware
app.use(morgan('dev'));
app.use(express.json()); // this is a middleware, a function that can modify the incoming request data
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  console.log('Hello from the middleware');
  next(); // we should call this otherwise it will stuck here, this should be in the top other wise this will not run if we place after another middle where like app.route
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//2) Route handler

// route handler
// app.get('/api/v1/tours', getAllTours);
// app.get('/api/v1/tours/:id', getTour);
// app.post('/api/v1/tours', createTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

//3) Routes
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
