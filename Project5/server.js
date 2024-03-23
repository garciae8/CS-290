const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Endpoint to handle POST requests for adding sponge facts
app.post('/api/sponge-facts', async (req, res) => {
    try {
        console.log('Received POST request:', req.body); // Log the request body
        const { fact } = req.body;
        if (!fact) {
            throw new Error('Fact is missing');
        }
        // Append the fact to a file
        await fs.appendFile('sponge-facts.txt', fact + '\n');
        res.sendStatus(200);
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to add fact: ' + error.message);
    }
});

// Endpoint to handle GET requests for retrieving sponge facts
app.get('/api/sponge-facts', async (req, res) => {
    try {
        // Read sponge facts from the file
        const data = await fs.readFile('sponge-facts.txt', 'utf8');
        // Split the data by newline character to get individual facts
        const facts = data.split('\n').filter(Boolean); // Filter out empty lines
        res.json(facts);
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to retrieve facts');
    }
});

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
