import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';

// Get directory name from import.meta.url
const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

// Load bad words from CSV file
export const loadBadWords = () => {
    return new Promise((resolve, reject) => {
        const badWords = new Set();
        const filePath = path.resolve(__dirname, './offensive_words.csv');
        // console.log('Loading CSV file from:', filePath);

        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (row) => {
                // console.log('Row read:', row); // Debug output
                if (row && row[Object.keys(row)[0]]) {
                    badWords.add(row[Object.keys(row)[0]].toLowerCase());
                }
            })
            .on('end', () => {
                // console.log('CSV file read complete. Bad words:', Array.from(badWords)); // Debug output
                resolve(badWords);
            })
            .on('error', (error) => {
                console.error('Error reading CSV file:', error);
                reject(error);
            });
    });
};


export const filterMessage = (message, badWords) => {

    // console.log("badWords", badWords)

    const words = message.split(/\s+/); // Split by spaces
    return words.map(word => {
        const cleanedWord = word.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "").toLowerCase();

        console.log("cleanwords", cleanedWord);

        const result = badWords.has(cleanedWord) ? '*****' : word;

        console.log("Result_bad", result)

        return result
    }).join(' ');
};


export const appendWordToCSV = (offensiveWord) => {
    const csvFilePath = path.join(__dirname, 'offensive_words.csv');
    
    return new Promise((resolve, reject) => {
        const data = `${offensiveWord}\n`;
        
        fs.appendFile(csvFilePath, data, 'utf8', (err) => {
            if (err) {
                console.error('Error appending to CSV file:', err);
                reject(err);
            } else {
                resolve(true); // Resolve with a truthy value to indicate success
            }
        });
    });
};
