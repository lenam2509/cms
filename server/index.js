const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./db/db');
dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));





app.get('/', (req, res) => {
    res.send('Server is ready');
});

app.get('/api', (req, res) => {
    res.json('API is ready')
});

const port = process.env.PORT || 2509;

app.listen(port, () => {
    console.log('Server is running on port ' + port);
});