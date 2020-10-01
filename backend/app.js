const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// * Setup Configurations
const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello World');
});

let port = 3333;
app.listen(port, () => console.log(`Listening on Port ${port}`));
