import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

// Load .env file
dotenv.config();

// Correct the path to point to your test data file
const jsonFilePath = path.resolve(__dirname, './tests/testdata/test_data_dev.json');

// Read the JSON file and parse it to get the URL
const testData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf-8'));

// Ensure process.env.BROWSER is a valid BrowserName or default to 'webkit'
const browserName = (process.env.BROWSER as 'chromium' | 'firefox' | 'webkit') || 'webkit'; // Default to 'webkit' if undefined

export default defineConfig({
  projects: [
    {
      name: 'Allure Reports',
      use: {
        baseURL: testData.cliffhangerUrl, // Use the URL from the JSON file
        headless: false, // Run in headless mode (set it to false to see the browser)
        browserName: browserName, // Set the browser to use (asserted to be a valid BrowserName)
     
        acceptDownloads: true, // Allows downloads during the test
        ignoreHTTPSErrors: true, // Ignores HTTPS errors
        trace: 'on-first-retry',
        video: "on",  // Enable video recording (can also be 'retain-on-failure')
        launchOptions: {
          args: ['--start-maximized'], 
        }
      },
    },
  ],

  reporter: [
    ['allure-playwright', {
      outputFolder: 'allure-results',  // Folder to save Allure results
      suiteName: 'Playwright Tests',  // Custom suite name for the report
      addEnvironment: {
        Browser: browserName, // Add Browser info
        'Cliffhanger URL': testData.cliffhangerUrl, // Add URL info
      },
    }],
  ],
});
