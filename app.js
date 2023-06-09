const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const { errorMiddleware } = require('./middleware/errorMiddleware');
const connectDB = require('./config/database');

const userRouter = require('./routes/userRouter');
const orderRouter = require('./routes/orderRouter');
const productRouter = require('./routes/productRouter');

/**
 * Connect DB
 */
connectDB();

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', userRouter);
app.use('/orders', orderRouter);
app.use('/products', productRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

/**
 * error Middleware
 */
app.use(errorMiddleware);

module.exports = app;
