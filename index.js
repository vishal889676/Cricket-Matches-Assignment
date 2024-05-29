const axios = require('axios');
require('dotenv').config();

const API_URL = 'https://api.cuvora.com/car/partner/cricket-data';
const API_KEY = 'test-creds@2320';

async function fetchData() {
    try {
        const response = await axios.get(API_URL, {
            headers: {
                apiKey: API_KEY
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching data from API:', error);
        return [];
    }
}

function parseScore(score) {
    if (!score || score === '') {
        return 0;
    }
    const parts = score.split('/');
    return parseInt(parts[0], 10);
}

async function analyzeData() {
    const matches = await fetchData();
    let highestScore = 0;
    let highestScoringTeam = '';
    let matchesWith300PlusTotalScore = 0;

    matches.forEach(match => {
        const t1 = match.t1;
        const t2 = match.t2;
        const t1s = parseScore(match.t1s);
        const t2s = parseScore(match.t2s);

        if (t1s > highestScore) {
            highestScore = t1s;
            highestScoringTeam = t1;
        }
        if (t2s > highestScore) {
            highestScore = t2s;
            highestScoringTeam = t2;
        }

        if ((t1s + t2s) >= 300) {
            matchesWith300PlusTotalScore++;
        }
    });

    console.log(`Highest Score: ${highestScore} by ${highestScoringTeam}`);
    console.log(`Number of matches with total 300+ score: ${matchesWith300PlusTotalScore}`);
}

analyzeData();