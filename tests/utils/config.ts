import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Correct the path to point to the location of test_data_dev.json
const jsonFilePath = path.resolve(__dirname, '../../tests/testdata/test_data_dev.json');

// Read the JSON file synchronously and parse it
const testData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf-8'));

// Export the configuration object
export const config = {
  baseUrl: testData.cliffhangerUrl, // or any other key you want from the JSON file
  browser: process.env.BROWSER, // Get Browser value from .env file
};