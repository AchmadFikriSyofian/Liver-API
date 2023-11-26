require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const {PORT = 3000} = process.env;
const swaggerJSON = require('./swagger.json')
const swaggerUI = require('swagger-ui-express')

app.use(morgan('dev'));
app.use(express.json());
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerJSON))

const courseRouter = require('./routes/course.routes');
app.use('/api/v1/course', courseRouter); 

const categoriesRouter = require('./routes/categories.routes');
app.use('/api/v1/categories', categoriesRouter);



app.listen(PORT, () => console.log('Listening on Port', PORT));