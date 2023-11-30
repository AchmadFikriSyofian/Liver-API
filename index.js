const express = require('express');
const app = express();

app.get('/', (req, res) =>{
    res.send(`Rajin banget mas sore sore ngoding, on Port ${PORT}`);
})