const express = require('express');
const axios = require('axios');

const app = express();
const port = 8008;

app.get('/numbers', async(req, res) => {

    const requestedUrls = req.query.url || [];
    const timeout = 500;
    //Store all the numbers from the URLS
    const mergedNumbers = [];
    
    //Function to fetch numbers from a URL and update the mergedNumbers array
    const fetchNumbers = async (url) => {
        try {
            const response = await axios.get(url, {timeout});
            if(response.status == 200){
                const data = response.data.numbers || [];
                mergedNumbers.push(...data);
            }
        } catch (error) {
            
        }
    };

    const fetchPromises = requestedUrls.map(fetchNumbers);
    await Promise.all(fetchPromises);

    //Insertion sort to sort the merged array
    for(let i=0;i<mergedNumbers.length;i++){
        const curr = mergedNumbers[i];
        let j = i - 1;
        while(j >= 0 && mergedNumbers[j] > curr){
            mergedNumbers[j+1] = mergedNumbers[j];
            j--;
        }
        mergedNumbers[j + 1] = curr;
    }

    //Array containing sorted unique numbers
    const sortedNumbers = Array.from(new Set(mergedNumbers));

    const resultObj = {numbers: sortedNumbers};

    res.json(resultObj);

});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})