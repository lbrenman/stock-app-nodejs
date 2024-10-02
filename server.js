const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');

require('dotenv').config()

const app = express();

const apiKey = process.env.API_KEY;
const port = process.env.PORT || 3000;
const apiBaseUrl = process.env.API_BASE_URL;

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public')); // Serve static files from the 'public' directory

// Endpoint to get stock quote
app.get('/api/quote', async (req, res) => {
    const { symbol } = req.query;

    try {
        const response = await axios.get(`${apiBaseUrl}/quote?symbol=${symbol}`, {
            headers: {
                'x-api-key': apiKey
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching stock quote:', error);
        res.status(500).json({ error: 'Failed to fetch stock quote' });
    }
});

// Endpoint to get watch list
app.get('/api/watchlist', async (req, res) => {
    const { symbols } = req.query;

    try {
        const response = await axios.get(`${apiBaseUrl}/watchlist?symbols=${encodeURIComponent(symbols)}`, {
            headers: {
                'x-api-key': apiKey
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching watch list:', error);
        res.status(500).json({ error: 'Failed to fetch watch list' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

