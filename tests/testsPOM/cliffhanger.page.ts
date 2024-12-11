import { Page, expect } from '@playwright/test';

export class CliffhangerPage {
  private page: Page;

  // Selectors (you can customize them depending on the elements on the page)
  private cliffhangerFrame: string = 'iframe'; // Change this selector if needed
  private pageUrl: string = 'https://chatbot.growthemr.com/assets/integration.html?bid=1968';
  private pageTitleSelector: string = "//h1[normalize-space()='This is the preview page for Integration page']";

  constructor(page: Page) {
    this.page = page;
  }

  // Navigate to the page URL (you can use config or hardcoded URL)
  async navigate() {
    await this.page.goto(this.pageUrl);
    await this.page.waitForTimeout(5000);  // Wait for 5 seconds
  }

  // Interact with the iframe or any other elements
  async interactWithFrame() {
   const iframe = await this.page.frame({ url: this.pageUrl });

  //   // Example interaction inside the iframe
     //await iframe.click('button#start');
  }

  // // Verify that the title is visible on the page
   async verifyPageLoaded() {
  //   // Wait for the title element to be visible on the page
   const titleLocator = this.page.locator(this.pageTitleSelector);

     await titleLocator.waitFor({ state: 'visible' });

  //   // Assert that the title element is visible using Playwright's expect API
     await expect(titleLocator).toBeVisible();  // Correct usage of expect on locator
     const titleText = await titleLocator.textContent(); // // Extract the text content of the title element

    console.log('Page title is:', titleText);

  }

  // Additional functions to interact with other elements can be added as needed
}
