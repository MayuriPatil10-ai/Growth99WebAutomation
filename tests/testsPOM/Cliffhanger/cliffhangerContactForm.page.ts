import { Page } from '@playwright/test';
import { CliffhangerPage } from '../cliffhanger.page'; // Import the CliffhangerPage class

class CliffhangerContactPage {
  // Define properties for the class
  public page: Page;
  private cliffhangerPage: CliffhangerPage;

  public pageTitleSelector: string;
  public contactFormLink: string;
  public firstName: string;
  public lastName: string;
  public phoneNumber: string;
  public emailAddress: string;
  public instagram: string;
  public lasertreatment: string;
  public fileUpload: string;
  public choseFile: string;
  public messageBox: string;
  public checkbox: string;
  public submitButton: string;
  public thankYouMessageSelector: string;
  public contactFormIframe: string;

  // Constructor to initialize the page and the selectors
  constructor(page: Page) {
    this.page = page;
    this.cliffhangerPage = new CliffhangerPage(page);

    this.pageTitleSelector = 'h1'; // Selector for any element that indicates the page is loaded (adjust accordingly)
    this.contactFormLink = "(//button[@class='feature-button'])[3]";
    this.firstName = "//input[@data-type1='First Name']";
    this.lastName = "//input[@data-type1='Last Name']";
    this.phoneNumber = "//input[@placeholder='Phone Number']";
    this.emailAddress = "//input[@placeholder='Email Address']";
    this.instagram = "//input[@value='Instagram']";
    this.lasertreatment = "//input[@value='Lasers']";
    this.fileUpload = "//div[@id='fileDropZone_112251']";
    this.choseFile = "//span[contains(text(), 'Choose file')]";
    this.messageBox = "//textarea[@placeholder='Message']";
    this.checkbox = "//input[@type='checkbox']";
    this.submitButton = "//button[text()='Submit']";
    this.thankYouMessageSelector = "//html/body/div[2]/div/div/div/p"; // Selector for the "Thank You!" message
    this.contactFormIframe = 'iframe[src="https://widget-ui.growthemr.com/assets/widgets/new-form.html?bid=1968&amp;fid=14940&amp;agencyId=1"]'; // iframe selector for the form
  }

  // Method to navigate to the cliffhanger page
  async navigate() {
    await this.cliffhangerPage.navigate();  // Use the navigate method from CliffhangerPage
  }

  // Method to check if the page is loaded by confirming an element on the page
  async isPageLoaded(): Promise<boolean> {
    const titleVisible = await this.page.isVisible(this.pageTitleSelector);
    return titleVisible; // Returns true if the title is visible, indicating the page loaded
  }

  // Method to click the contact form button
  async clickContactForm(): Promise<void> {
    await this.page.waitForSelector(this.contactFormLink, { state: 'visible' });
    await this.page.click(this.contactFormLink);
    console.log('Contact form button clicked.');
  }

  // Method to check if the contact form iframe is open
  async isContactFormOpen(): Promise<boolean> {
    try {
      // Wait for the iframe to be visible
      await this.page.waitForSelector(this.contactFormIframe, { state: 'visible' });
      console.log('Contact form is open.');
      return true; // Return true if the iframe is visible, meaning the contact form is open
    } catch (error) {
      console.error('Contact form did not open.', error);
      return false; // Return false if the iframe is not visible
    }
  }

  // Method to check if submit button is disabled
async isSubmitButtonDisabled(): Promise<boolean> {
    const submitButtonLocator = await this.page.locator(this.submitButton);
    return await submitButtonLocator.isDisabled();
  }
  
  // Method to check if the contact form was successfully submitted
  async isContactFormSubmitted(): Promise<boolean> {
    try {
        await this.page.waitForSelector(this.contactFormIframe, { state: 'visible' });
      // Wait for the "Thank You!" message after submission
      await this.page.waitForSelector(this.thankYouMessageSelector, { state: 'visible', timeout: 15000 });
      console.log('Contact form was submitted successfully and "Thank You!" message is visible.');
      return true; // Return true if the "Thank You!" message is visible, indicating successful submission
    } catch (error) {
      console.error('Contact form submission failed or "Thank You!" message not found.', error);
      return false; // Return false if the "Thank You!" message is not found
    }
  }
}

export { CliffhangerContactPage };
