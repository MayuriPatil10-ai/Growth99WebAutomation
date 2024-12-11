import { test, expect, Page, Browser, Frame, chromium, firefox, webkit } from '@playwright/test';
import { CliffhangerContactPage } from '../../testsPOM/Cliffhanger/cliffhangerContactForm.page';
import { config } from '../../utils/config';
import { CliffhangerPage } from '../../testsPOM/cliffhanger.page';
import * as fs from 'fs';
import * as path from 'path';
import { faker } from '@faker-js/faker'; // Importing faker for dynamic data generation

// Read the data from test_data_dev.json
const testDataPath = path.resolve(__dirname, '../../testdata/test_data_dev.json');
let testData = JSON.parse(fs.readFileSync(testDataPath, 'utf-8'));

// Generate dynamic data using faker if not available in the testData
testData.dynamicData = {
  firstName: testData.dynamicData.firstName || faker.person.firstName(),
  lastName: testData.dynamicData.lastName || faker.person.lastName().replace(/[^a-zA-Z\s]/g, ''), // Remove non-alphabetic characters
  phoneNumber: testData.dynamicData.phoneNumber || faker.number.int({ min: 1000000000, max: 9999999999 }).toString(),
  emailAddress: testData.dynamicData.emailAddress || faker.internet.email(),
  instagram: testData.dynamicData.instagram || `${faker.person.firstName().toLowerCase()}_${faker.person.lastName().toLowerCase()}`, // Simple username generation
  lasertreatment: testData.dynamicData.lasertreatment || 'Yes',
  message: testData.dynamicData.message || "This is a dynamically generated test message."
};

// Write back the updated dynamicData to the JSON file (this is optional, for logging purposes)
fs.writeFileSync(testDataPath, JSON.stringify(testData, null, 2));

// Use the generated dynamicData for the test
test.describe('Verify that by clicking on contact form on preview page should redirect to lead capture form', () => {
  let browserInstance: Browser;
  let page: Page;
  let cliffhangerPageInstance: CliffhangerContactPage;

  test.beforeAll(async () => {
    const { browser, baseUrl } = config;

    if (!baseUrl) {
      console.error('Error: CLIFFHANGER_URL is not set.');
      process.exit(1);
    }

    if (browser === 'chromium') {
      browserInstance = await chromium.launch({
        headless: false,
        args: [
          '--no-sandbox',
          '--disable-gpu',
        ],
      });
      // await page.setViewportSize({ width: 1920, height: 1080 });
    } else if (browser === 'firefox') {
      browserInstance = await firefox.launch({ headless: false });
    } else if (browser === 'webkit') {
      browserInstance = await webkit.launch({ headless: false });
    } else {
      console.error(`Unsupported browser type: ${browser}`);
      process.exit(1);
    }

    page = await browserInstance.newPage();
    cliffhangerPageInstance = new CliffhangerContactPage(page);  
  });

// test('Verify the mandatory field validation', async () => {
//     await cliffhangerPageInstance.navigateToCliffhanger(testData.cliffhangerUrl);

//     const isLoaded = await cliffhangerPageInstance.isPageLoaded();
//     expect(isLoaded).toBe(true);

//     await cliffhangerPageInstance.clickContactForm();
//     console.log('Contact Form button clicked successfully.');

//     const iframeSelector = 'iframe[src="https://widget-ui.growthemr.com/assets/widgets/new-form.html?bid=1968&fid=14940&agencyId=1"]';
//     await page.waitForSelector(iframeSelector);

//     // Change const to let so we can reassign it later
//     let iframe: Frame | null = page.frame({ url: 'https://widget-ui.growthemr.com/assets/widgets/new-form.html?bid=1968&fid=14940&agencyId=1' });
//     if (!iframe) {
//       throw new Error('Iframe not found!');
//     }

//     const contactFormLocator = iframe.locator('text="Lead Capture Form"');
//     await contactFormLocator.waitFor();
//     console.log('Contact Form Opened successfully: "Lead Capture Form" is visible.');

//     await page.waitForTimeout(2000);
//     // Leaving mandatory fields blank and filling non-mandatory fields
//     const dynamicData = testData.dynamicData;

//     // Fill the non-mandatory fields, leave mandatory ones empty
//     await iframe.locator(cliffhangerPageInstance.instagram).check();
//     await iframe.locator(cliffhangerPageInstance.lasertreatment).check();
//     await iframe.locator(cliffhangerPageInstance.messageBox).fill(dynamicData.message);

//     // Do not fill in the mandatory fields
//     const filePath = 'D:/abc.png'; // You can also dynamically change the file path if needed
//     const fileInputLocator = iframe.locator('input[type="file"]');
//     await fileInputLocator.setInputFiles(filePath);
//     console.log('File uploaded successfully.');

//     // Click the submit button
//     const submitButtonLocator = iframe.locator(cliffhangerPageInstance.submitButton);
//     await submitButtonLocator.click();

//     // Wait for the First Name error message to appear
//     const firstnameErrorMessageLocator = iframe.locator('#v_112241 span');

//     // Wait for the error message to become visible (increase timeout if necessary)
//     await firstnameErrorMessageLocator.waitFor({ state: 'visible', timeout: 5000 });

//     // Get the error message text
//     const firstnameErrorMessage = await firstnameErrorMessageLocator.textContent();

//     // Log the error message
//     console.log('First Name Error Message:', firstnameErrorMessage);

//     // Assert the error message content is as expected
//     expect(firstnameErrorMessage).toBe('Please Input Valid Details!');

//     console.log('Form submission was blocked as expected, and validation errors were shown.');
//   });

// test('Verify that only email id can be enter in email adress field.', async () => {
//       await cliffhangerPageInstance.navigateToCliffhanger(testData.cliffhangerUrl);
  
//       const isLoaded = await cliffhangerPageInstance.isPageLoaded();
//       expect(isLoaded).toBe(true);
  
//       await cliffhangerPageInstance.clickContactForm();

//       await page.waitForTimeout(2000);
  
//       // Wait for iframe to load (adjust as needed for the page)
//       const iframeSelector = 'iframe[src="https://widget-ui.growthemr.com/assets/widgets/new-form.html?bid=1968&fid=14940&agencyId=1"]';
//       await page.waitForSelector(iframeSelector);
//       const iframe = await page.frameLocator(iframeSelector);
  
//    // Invalid Email Test Case 1: Invalid email format (missing "@" symbol)
//       await iframe.locator(cliffhangerPageInstance.emailAddress).fill('invalid-email.com');
//       await iframe.locator(cliffhangerPageInstance.submitButton).click();
  
//       // Assuming there is a validation message that pops up for invalid email
//       const invalidEmailMessage = await iframe.locator("//span[text()='Please Input Valid Email!']"); // This is the correct message in the app
//       await expect(invalidEmailMessage).toBeVisible({timeout: 10000});
//       await expect(invalidEmailMessage).toHaveText('Please Input Valid Email!');
  
//       // Invalid Email Test Case 2: Invalid email format (missing domain)
//       await iframe.locator(cliffhangerPageInstance.emailAddress).fill('invalid-email@');
//       await iframe.locator(cliffhangerPageInstance.submitButton).click();
  
//       await expect(invalidEmailMessage).toBeVisible({timeout: 10000});
//       await expect(invalidEmailMessage).toHaveText('Please Input Valid Email!');

//       await page.waitForTimeout(10000);
  
//       // Valid Email Test Case: Valid email format
//       const validEmail = 'testgro@example.com';
//       await iframe.locator(cliffhangerPageInstance.emailAddress).fill(validEmail);
//       await iframe.locator(cliffhangerPageInstance.submitButton).click();
  
//       // Assuming the form submits successfully or moves to the next step
//       //const thankYouMessage = await iframe.locator('#thankyou');
//       //await expect(thankYouMessage).toBeVisible();
//       //await expect(thankYouMessage).toHaveText('Your form has been submitted successfully.');
//     });

// test('Verify user is able to fill the first name and last name in First Name and Last Name field', async () => {
//   // Navigate to the Cliffhanger page
//   await cliffhangerPageInstance.navigateToCliffhanger(testData.cliffhangerUrl);
  
//   const isLoaded = await cliffhangerPageInstance.isPageLoaded();
//   expect(isLoaded).toBe(true);
  
//   await cliffhangerPageInstance.clickContactForm();
  
//   // Wait for the iframe to load
//   const iframeSelector = 'iframe[src="https://widget-ui.growthemr.com/assets/widgets/new-form.html?bid=1968&fid=14940&agencyId=1"]';
//   await page.waitForSelector(iframeSelector);
//   const iframe = await page.frameLocator(iframeSelector);

//   // Test 1: Input invalid characters (numbers and special characters) into the First Name field
//   const invalidFirstName = 'John123!@#';
//   const firstNameField = iframe.locator(cliffhangerPageInstance.firstName);
  
//   // Fill invalid data into the First Name field
//   await firstNameField.fill(invalidFirstName);
  
//   // Ensure invalid characters are not accepted
//   const enteredFirstName = await firstNameField.inputValue();
//   // Ensure that the invalid characters are not present
//   expect(enteredFirstName).toBe(invalidFirstName); // The field should contain the invalid input if it doesn't reject it immediately.
  
//   // Test 2: Input invalid characters (numbers and special characters) into the Last Name field
//   const invalidLastName = 'Doe456&*()';
//   const lastNameField = iframe.locator(cliffhangerPageInstance.lastName);
  
//   // Fill invalid data into the Last Name field
//   await lastNameField.fill(invalidLastName);
  
//   // Ensure invalid characters are not accepted
//   const enteredLastName = await lastNameField.inputValue();
//   // Ensure that the invalid characters are not present
//   expect(enteredLastName).toBe(invalidLastName);  // The field should contain the invalid input if it doesn't reject it immediately.

//   // Test 3: Input valid characters (only letters and space) into the First Name field
//   const validFirstName = 'John Doe';
//   await firstNameField.fill(validFirstName);
  
//   // Check that the valid input is accepted
//   const validFirstNameInput = await firstNameField.inputValue();
//   expect(validFirstNameInput).toBe(validFirstName);  // It should accept 'John Doe'

//   // Test 4: Input valid characters (only letters and space) into the Last Name field
//   const validLastName = 'Jane Smith';
//   await lastNameField.fill(validLastName);
  
//   // Check that the valid input is accepted
//   const validLastNameInput = await lastNameField.inputValue();
//   expect(validLastNameInput).toBe(validLastName);  // It should accept 'Jane Smith'
// });

// test('Verify that phone number field only accepts numeric value.', async () => {
//   // Navigate to the Cliffhanger page
//   await cliffhangerPageInstance.navigateToCliffhanger(testData.cliffhangerUrl);
  
//   const isLoaded = await cliffhangerPageInstance.isPageLoaded();
//   expect(isLoaded).toBe(true);
  
//   await cliffhangerPageInstance.clickContactForm();
  
//   // Wait for the iframe to load
//   const iframeSelector = 'iframe[src="https://widget-ui.growthemr.com/assets/widgets/new-form.html?bid=1968&fid=14940&agencyId=1"]';
//   await page.waitForSelector(iframeSelector);
//   const iframe = await page.frameLocator(iframeSelector);

 
//   await iframe.locator(cliffhangerPageInstance.phoneNumber).fill('123-45 6557!@#');

//   await iframe.locator(cliffhangerPageInstance.submitButton).click();
//   const invalidPhonenumberMessage = await iframe.locator("//span[text()='Please Input Valid Number!']");
//  await expect(invalidPhonenumberMessage).toBeVisible({timeout: 10000});
//  await expect(invalidPhonenumberMessage).toHaveText('Please Input Valid Number!');

//   // Test 1: Input invalid characters (letters, special characters, and spaces) into the Phone Number field
//   const invalidPhoneNumber = '123-45 67!@#';

//    // Select the Phone Number field in the iframe
//    const phoneNumberField = iframe.locator(cliffhangerPageInstance.phoneNumber);
  
//   // Fill invalid data into the Phone Number field
//   await phoneNumberField.fill(invalidPhoneNumber);

//   // Ensure invalid characters are not accepted: Check that only digits are allowed
//   const enteredPhoneNumber = await phoneNumberField.inputValue();

//   // Check that invalid characters (spaces and special characters) have been rejected
//   expect(enteredPhoneNumber).toBe(invalidPhoneNumber)  // It should only contain numeric digits, no special characters or spaces.

//   // Test 2: Input valid phone number (only numeric digits)
//   const validPhoneNumber = '1234567890';
  
//   // Fill valid data into the Phone Number field
//   await phoneNumberField.fill(validPhoneNumber);

//   // Ensure that the valid phone number is accepted
//   const enteredValidPhoneNumber = await phoneNumberField.inputValue();
  
//   // Check that the valid phone number is accepted
//   expect(enteredValidPhoneNumber).toBe(validPhoneNumber);  // It should accept '1234567890'
// });

// test('Verify that the form submitted successfully if optional fields left blank', async () => {
//   await cliffhangerPageInstance.navigateToCliffhanger(testData.cliffhangerUrl);

//   const isLoaded = await cliffhangerPageInstance.isPageLoaded();
//   expect(isLoaded).toBe(true);

//   await cliffhangerPageInstance.clickContactForm();
//   console.log('Contact Form button clicked successfully.');

//   const iframeSelector = 'iframe[src="https://widget-ui.growthemr.com/assets/widgets/new-form.html?bid=1968&fid=14940&agencyId=1"]';
//   await page.waitForSelector(iframeSelector);

//   // Change const to let so we can reassign it later
//   //let iframe: Frame | null = page.frame({ url: 'https://widget-ui.growthemr.com/assets/widgets/new-form.html?bid=1968&fid=14940&agencyId=1' });
//   const iframePath = '//html/body/div[4]/div/div/div[2]/iframe'; // Example XPath for the iframe, adjust as needed
//   const iframeL = page.locator(`xpath=${iframePath}`);
//   await iframeL.waitFor({ state: 'visible' });

//   const iframe = await iframeL.contentFrame();
//   if (!iframe) {
//   throw new Error('Iframe not found!');
//   }

//   const contactFormLocator = iframe.locator('text="Lead Capture Form"');
//   await contactFormLocator.waitFor();
//   console.log('Contact Form Opened successfully: "Lead Capture Form" is visible.');

//   // Use dynamicData from the testData JSON
//   const dynamicData = testData.dynamicData;
//   console.log('Generated Dynamic Data:', dynamicData);

//   // Fill out the contact form with dynamic data
//   await iframe.locator(cliffhangerPageInstance.firstName).fill(dynamicData.firstName);
//   await iframe.locator(cliffhangerPageInstance.lastName).fill(dynamicData.lastName);
//   await iframe.locator(cliffhangerPageInstance.phoneNumber).fill(dynamicData.phoneNumber);
//   await iframe.locator(cliffhangerPageInstance.emailAddress).fill(dynamicData.emailAddress);

//   // Check for radio buttons and checkbox
  
//   await iframe.locator(cliffhangerPageInstance.lasertreatment).check();
 
//   await iframe.locator(cliffhangerPageInstance.checkbox).check();
//   await iframe.locator(cliffhangerPageInstance.submitButton).click();
//   console.log('Submit button clicked.');


//   // Re-query the iframe after the form submission to ensure it's still valid
//   // iframe = page.frame({ url: 'https://widget-ui.growthemr.com/assets/widgets/new-form.html?bid=1968&fid=14940&agencyId=1' });
//   // if (!iframe) {
//   //   throw new Error('Iframe not found after form submission!');
//   // }

//   //const thankYouMessageLocator = iframe.locator('#thankyou');
//   //await page.pause();
//   //const xpathSelector = '//html/body/div[2]/div/div/div/p';
//   //const element = iframe.locator(`xpath=${xpathSelector}`);
//   //await element.waitFor({ state: 'visible' });
//   // await iframe.waitForSelector(cliffhangerPageInstance.thankYouMessageSelector, { timeout: 10000 });
//   // var abc= iframe.locator(cliffhangerPageInstance.thankYouMessageSelector);

//   //await expect(element).toHaveText('Your form has been submitted successfully.');
//   // try {
//   //   await thankYouMessageSelector.waitFor({ state: 'visible', timeout: 60000 });  // Increased timeout to 60 seconds
//   //   const isVisible = await thankYouMessageLocator.isVisible();
//   //   console.log('Thank You message visibility:', isVisible);
//   //   expect(isVisible).toBe(true);
//   //   console.log('Thank You message is visible, indicating successful form submission.');
//   // } catch (error) {
//   //   console.error('Error waiting for Thank You message:', error);
//   //   await page.screenshot({ path: 'error_screenshot.png' });
//   //   throw error;
//   // }
// });
  
test('Verify the form submission with valid data', async () => {
  const cliffhangerPage = new CliffhangerPage(page);

  const cliffhangerContactFormPage = new CliffhangerContactPage(page);

  await cliffhangerContactFormPage.navigate();
  
    const isLoaded = await cliffhangerPageInstance.isPageLoaded();
    expect(isLoaded).toBe(true);
  
    await cliffhangerPageInstance.clickContactForm();
    console.log('Contact Form button clicked successfully.');
  
    const iframeSelector = 'iframe[src="https://widget-ui.growthemr.com/assets/widgets/new-form.html?bid=1968&fid=14940&agencyId=1"]';
    await page.waitForSelector(iframeSelector);
  
    // Change const to let so we can reassign it later
    //let iframe: Frame | null = page.frame({ url: 'https://widget-ui.growthemr.com/assets/widgets/new-form.html?bid=1968&fid=14940&agencyId=1' });
    const iframePath = '//html/body/div[4]/div/div/div[2]/iframe'; // Example XPath for the iframe, adjust as needed
    const iframeL = page.locator(`xpath=${iframePath}`);
    await iframeL.waitFor({ state: 'visible' });
  
    const iframe = await iframeL.contentFrame();
    if (!iframe) {
    throw new Error('Iframe not found!');
    }
  
    const contactFormLocator = iframe.locator('text="Lead Capture Form"');
    await contactFormLocator.waitFor();
    console.log('Contact Form Opened successfully: "Lead Capture Form" is visible.');
  
    // Use dynamicData from the testData JSON
    const dynamicData = testData.dynamicData;
    console.log('Generated Dynamic Data:', dynamicData);
  
    // Fill out the contact form with dynamic data
    await iframe.locator(cliffhangerPageInstance.firstName).fill(dynamicData.firstName);
    await iframe.locator(cliffhangerPageInstance.lastName).fill(dynamicData.lastName);
    await iframe.locator(cliffhangerPageInstance.phoneNumber).fill(dynamicData.phoneNumber);
    await iframe.locator(cliffhangerPageInstance.emailAddress).fill(dynamicData.emailAddress);
  
    // Check for radio buttons and checkbox
    await iframe.locator(cliffhangerPageInstance.instagram).check();
    await iframe.locator(cliffhangerPageInstance.lasertreatment).check();
    await iframe.locator(cliffhangerPageInstance.messageBox).fill(dynamicData.message);
  
     const filePath = 'D:/abc.png'; // You can also dynamically change the file path if needed
     const fileInputLocator = iframe.locator('input[type="file"]');
     await fileInputLocator.setInputFiles(filePath);
     console.log('File uploaded successfully.');
  
    await iframe.locator(cliffhangerPageInstance.checkbox).check();
    await iframe.locator(cliffhangerPageInstance.submitButton).click();
    console.log('Submit button clicked.');
  
  
    // Re-query the iframe after the form submission to ensure it's still valid
    // iframe = page.frame({ url: 'https://widget-ui.growthemr.com/assets/widgets/new-form.html?bid=1968&fid=14940&agencyId=1' });
    // if (!iframe) {
    //   throw new Error('Iframe not found after form submission!');
    // }
  
    //const thankYouMessageLocator = iframe.locator('#thankyou');
    // await page.pause();
    //const xpathSelector = '//html/body/div[2]/div/div/div/p';
    //const element = iframe.locator(`xpath=${xpathSelector}`);
    //await element.waitFor({ state: 'visible' });
    // await iframe.waitForSelector(cliffhangerPageInstance.thankYouMessageSelector, { timeout: 10000 });
    // var abc= iframe.locator(cliffhangerPageInstance.thankYouMessageSelector);

    //await expect(element).toHaveText('Your form has been submitted successfully.');
    // try {
    //   await thankYouMessageSelector.waitFor({ state: 'visible', timeout: 60000 });  // Increased timeout to 60 seconds
    //   const isVisible = await thankYouMessageLocator.isVisible();
    //   console.log('Thank You message visibility:', isVisible);
    //   expect(isVisible).toBe(true);
    //   console.log('Thank You message is visible, indicating successful form submission.');
    // } catch (error) {
    //   console.error('Error waiting for Thank You message:', error);
    //   await page.screenshot({ path: 'error_screenshot.png' });
    //   throw error;
    // }
  });

  
   
  
      
  








 



});





  