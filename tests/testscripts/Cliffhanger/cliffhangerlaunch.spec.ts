import { test, expect } from '@playwright/test';
import { config } from '../../utils/config'; // Import the config from the config.ts file
import { CliffhangerPage } from '../../testsPOM/cliffhanger.page'; // Import the page object

test('Verify that by clicking on contact form on preview page should redirect to lead capture form', async ({ page }) => {
  // Create an instance of the CliffhangerPage object
  const cliffhangerPage = new CliffhangerPage(page);

  // Navigate to the page using the navigate method from the page object
  await cliffhangerPage.navigate();

   await cliffhangerPage.interactWithFrame();

  // Verify the page loaded correctly (by checking the title or any element on the page)
 await cliffhangerPage.verifyPageLoaded();

  // Optionally, you can add more assertions here
  // Example: Checking if an iframe exists on the page
   const iframe = await page.frame({ url: config.baseUrl });
   expect(iframe).not.toBeNull();
});

//test('should interact with elements on the Cliffhanger page', async ({ page }) => {
  // Create an instance of the CliffhangerPage object
 //// const cliffhangerPage = new CliffhangerPage(page);

  // Navigate to the page
 // await cliffhangerPage.navigate();

  // Interact with elements inside the iframe or on the page
  //await cliffhangerPage.interactWithFrame();
  
  // Add further assertions or actions as needed
//});
