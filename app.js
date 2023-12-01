require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yaml');
const cors = require('cors');
const vercel = require('@vercel/node');
const {PORT} = process.env;

const fs = require("fs");
const file = fs.readFileSync('./swagger.yaml', 'utf8');
const swaggerDocument = YAML.parse(file);

app.get('/', (req, res) =>{
    res.send(`Rajin banget mas sore sore ngoding, on Port ${PORT}`);
})

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// app.get('/products/:id', cors(), function (req, res, next) {
//     res.json({msg: 'This is CORS-enabled for a Single Route'})
//   })

const authRouter = require('./routes/auth.routes');
app.use('/api/v1/auth', authRouter);

const courseRouter = require('./routes/course.routes');
app.use('/api/v1/course', courseRouter); 

const categoriesRouter = require('./routes/categories.routes');
app.use('/api/v1/categories', categoriesRouter);


app.listen(PORT, () => console.log('Listening on Port', PORT));