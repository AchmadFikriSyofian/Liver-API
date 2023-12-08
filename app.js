require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yaml');
const cors = require('cors');
const {PORT = 3000, SENTRY_DSN} = process.env;

const fs = require("fs");
const file = fs.readFileSync('./swagger.yaml', 'utf8');
const swaggerDocument = YAML.parse(file);


// Sentry.init({
//     dsn: SENTRY_DSN,
//     integrations: [
//         // enable HTTP calls tracing
//         new Sentry.Integrations.Http({ tracing: true }),
//         // enable Express.js middleware tracing
//       new Sentry.Integrations.Express({ app })
//     ],
//     // Performance Monitoring
//     tracesSampleRate: 1.0
// });
  

app.use(morgan('dev'));
app.use(express.json());
  app.use(cors());
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  
//   // The request handler must be the first middleware on the app
//   app.use(Sentry.Handlers.requestHandler());

//   // TracingHandler creates a trace for every incoming request
//   app.use(Sentry.Handlers.tracingHandler());
  
  // app.get('/', (req, res) =>{
  //     res.send(`Welcome to Railway, on Port ${PORT}`);
  // })

  const authRouter = require('./routes/auth.routes');
  app.use('/api/v1/auth', authRouter);
  
  const courseRouter = require('./routes/course.routes');
  app.use('/api/v1/course', courseRouter); 
  
  const categoriesRouter = require('./routes/categories.routes');
  app.use('/api/v1/categories', categoriesRouter);
  
  const accountsRouter = require('./routes/accounts.routes');
  app.use('/api/v1/accounts', accountsRouter);

// Elephant SQL
const pg = require('pg');

const conString = "postgres://dfeqpmuu:js4yQoMWz9RySjDlvXjJk25gmSLb4dPj@rain.db.elephantsql.com/dfeqpmuu";
const client = new pg.Client(conString);
client.connect(function(err){
    if(err){
        return console.log('could not connect to postgres', err);
    }
    client.query('SELECT NOW() AS "theTime"', function(err, result) {
        if(err){
            return console.log('error running query', err);
        }
        console.log(result.rows[0].theTime);
        client.end();
    });
});

// Notification
const http = require("http").Server(app);
const socketIO = require("socket.io")(http);
const path = require('path');

app.set('view engine', 'ejs');
app.use(express.static("public"));

socketIO.on("connection", socket => {
    console.log(`⚡:${socket.id} user just connected`);
    socket.on("message", data =>{
        socket.broadcast.emit("response", data);
    });
});

app.get('/nofitication', (req, res) =>{
    res.sendFile(path.join(__dirname, "/index.html"));
});


// The error handler must be registered before any other error middleware and after all controllers
// app.use(Sentry.Handlers.errorHandler());

// 404
// app.use((req, res, next) => {
//     res.status(404).json({
//         status: false,
//         message: 'Not Found!',
//         error: null,
//         data: null
//     });
// });

// // 500
// app.use((err, req, res, next) => {
//     res.status(500).json({
//         status: false,
//         message: 'Internal Server Error',
//         error: err.message,
//         data: null
//     });
// });

app.listen(PORT, () => console.log('Listening on Port', PORT));