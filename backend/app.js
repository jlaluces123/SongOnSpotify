const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// * File Imports
const config = require('./config');
const { authRouter } = require('./api/routes/index');

// * Setup Configurations
const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );

    if (req.method === 'OPTIONS') {
        res.header(
            'Access-Control-Allow-Methods',
            'PUT, POST, PATCH, DELETE, GET'
        );
        return res.status(200).json({});
    }

    next();
});

app.use('/api/auth', authRouter);

app.listen(config.port, (err) => {
    if (err) {
        console.log(err);
        process.exit(1);
    }

    console.log(`Listening on port ${config.port}`);
});
