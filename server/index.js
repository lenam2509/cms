const express = require('express');
const cors = require('cors');
const morgan = require('morgan');


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

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});