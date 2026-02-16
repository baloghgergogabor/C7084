require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json())

const cakesRouter = require('./routes/telefonok')
app.use('/api/telefonok', cakesRouter);

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Backend fut: http://localhost:${port}`)
    console.log(`API: http://localhost:${port}/api/telefonok`)
})