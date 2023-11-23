require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const {PORT = 3000} = process.env;

app.use(morgan('dev'));
app.use(express.json());

const courseRouter = require('./routes/course.routes');
app.use('/api/v1/course', courseRouter); 



app.listen(PORT, () => console.log('Listening on Port', PORT));