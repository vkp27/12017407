const express = require('express');
const axios = require('axios');

const app = express();
const port = 8008;

app.get('/numbers', async(req, res) => {

    const requestedUrls = req.query.url || [];
    //Store all the numbers from the URLS
    const mergedNumbers = [];
    
    //Function to fetch numbers from a URL and update the mergedNumbers array
    const fetchNumbers = async (url) => {
        try {
            const response = await axios.get(url, 500);
            if(response.status == 200){
                const data = response.data.numbers || [];
                mergedNumbers.push(...data);
            }
        } catch (error) {
            
        }
    };
});