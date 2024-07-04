require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./db/db');

connectDB();

const app = express();

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        message: error.message,
        error: process.env.NODE_ENV === 'development' ? error : {}
    });
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));


app.use('/api/users', require('./routes/user.route'));




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