require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yaml');
const cors = require('cors');
const {PORT} = process.env;

const fs = require("fs");
const file = fs.readFileSync('./swagger.yaml', 'utf8');
const swaggerDocument = YAML.parse(file);

app.get('/', (req, res) =>{
    res.send(`Welcome on port ${PORT}`);
})

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const courseRouter = require('./routes/course.routes');
app.use('/api/v1/course', courseRouter); 

const categoriesRouter = require('./routes/categories.routes');
app.use('/api/v1/categories', categoriesRouter);



app.listen(PORT, () => console.log('Listening on Port', PORT));