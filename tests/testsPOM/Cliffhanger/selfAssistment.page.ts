import { Page } from '@playwright/test';
import { expect } from '@playwright/test';
import { CliffhangerPage } from '../cliffhanger.page'; // Import the CliffhangerPage class
import { th } from '@faker-js/faker/.';


class SelfAssistmentPage{

// Define properties for the class
public page: Page;
private cliffhangerPage: CliffhangerPage;

public pageTitleSelector: string;
public selfAssistmentFormLink: string;
public maletabLink:string;
public maleImageSelector: string;
public femaletabLink:string;
public femaleImageSelector: string;
public switchBackButton:string;
public male_front_headlink:string;
public male_fronthead_headachelabel:string
public male_fronthead_puffyforeheadlabel:string
public male_headache_checkboxloactor:string
public male_puffyforehead_checkboxlocator:string
public male_frontchest_link:string;
public male__frontchest_asthmalabel:string
public male_frontchest_painlabel:string
public clearAllButton:string 

public continueButton:string

public leadCaptureFormTitle:string
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
public selfAssistmentFormIframe: string;

// Constructor to initialize the page and the selectors
constructor(page: Page) {
  this.page = page;
  this.cliffhangerPage = new CliffhangerPage(page);

  this.pageTitleSelector = 'h1'; // Selector for any element that indicates the page is loaded (adjust accordingly)
  this.selfAssistmentFormLink = "(//button[@class='feature-button'])[1]";
  this.maletabLink = "//button[@id='pills-male-tab']";
  this.maleImageSelector = "//div[@id='pills-female']";
  this.femaletabLink = "//button[@id='pills-female-tab']";
  this.femaleImageSelector = "//div[@id='pills-female']";
  this.switchBackButton = "//div[text()=' Switch to Back ']";
  this.male_front_headlink = "//*[@id='Path_87']";
  //this.male_fronthead_checkboxlist = "male_fronthead_checkboxlist";
   this.male_headache_checkboxloactor = "//input[@id='164696']";
  this.male_puffyforehead_checkboxlocator = "//input[@id='164707']";
  this.male_fronthead_headachelabel="//label[@for='164696']";
  this.male_fronthead_puffyforeheadlabel="//label[@for='164707']";
  this.male_frontchest_link="//*[@id='Path_89']";
  this.male__frontchest_asthmalabel="//label[@for='164708']";
  this.male_frontchest_painlabel="//label[@for='164697']";
  this.clearAllButton="//button[text()=' Clear All ']";
  
  this.continueButton="//html/body/g99-root/g99-selfassessment-page-container/div/g99-preview/div/div/div[2]/g99-card/div/g99-symptom-selection-card-footer/div/button[2]";
  
  this.leadCaptureFormTitle="//h3[text()='Lead Capture Form']";
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
  this.selfAssistmentFormIframe = 'iframe[src="https://widget-ui.growthemr.com/selfassessment?bid=1968&fid=14940"]'; // iframe selector for the form

}

async navigate() {
    await this.cliffhangerPage.navigate();  // Use the navigate method from CliffhangerPage
    await this.page.waitForSelector(this.pageTitleSelector, { state: 'visible' });
    await this.page.waitForSelector('body', { state: 'visible' });
     console.log('Page loaded successfully!');
     }

async clickSelfAssistmentForm(): Promise<void> {
    await this.page.waitForSelector(this.selfAssistmentFormLink, { state: 'visible' });
    await this.page.click(this.selfAssistmentFormLink);
    console.log('selfAssistment form button clicked.');
  }

private async getIframe() {
    const frame = await this.page.frameLocator(`iframe[src="https://widget-ui.growthemr.com/selfassessment?bid=1968&fid=14940"]`);
    return frame;
  }

async clickMaleTab(): Promise<void> {
    const iframe = await this.getIframe(); // Get the iframe context
    const maleTab = iframe.locator(this.maletabLink); // Use locator to find the male tab inside the iframe
    await maleTab.waitFor({ state: 'visible', timeout: 5000 });
    await maleTab.click({ timeout: 10000 });
    
  }

async verifyMaleImageIsVisible(): Promise<void> {
    const iframe = await this.getIframe(); // Get the iframe context
    const maleImage = iframe.locator(this.maleImageSelector);  // Locate the male image inside the iframe
    await expect(maleImage).toBeVisible();
    
  }

  async clickFemaleTab(): Promise<void> {
    const iframe = await this.getIframe(); // Get the iframe context
    const femaleTab = iframe.locator(this.femaletabLink); // Use locator to find the male tab inside the iframe
    await femaleTab.waitFor({ state: 'visible', timeout: 5000 });
    await femaleTab.click({ timeout: 10000 });
    
  }

  async verifyFemaleImageIsVisible(): Promise<void> {
    const iframe = await this.getIframe(); // Get the iframe context
    const femaleImage = iframe.locator(this.femaleImageSelector);  // Locate the male image inside the iframe
    await expect(femaleImage).toBeVisible();
    
  }

  async clickSwitchToBackImage(): Promise<void>{
  const iframe = await this.getIframe(); // Get the iframe context
    const swtichbackimmagebutton = iframe.locator(this.switchBackButton); // Use locator to find the male tab inside the iframe
    await swtichbackimmagebutton.waitFor({ state: 'visible', timeout: 5000 });
    await swtichbackimmagebutton.click({ timeout: 10000 });
  }
  
async clickMaleFrontHeadBodyPart(): Promise<void>{
    const iframe = await this.getIframe(); // Get the iframe context
      const frontHeadBodyPArt = iframe.locator(this.male_front_headlink); // Use locator to find the male tab inside the iframe
      await frontHeadBodyPArt.waitFor({ state: 'visible', timeout: 10000 });
      await frontHeadBodyPArt.click({ timeout: 10000 });
      console.log('FrontHead tab clicked.');
    }
async verifyMaleFronHeadSymptons() : Promise<void>
{
  const iframe = await this.getIframe(); // Get the iframe context
  const headachelableloctor = iframe.locator(this.male_fronthead_headachelabel);
  await expect(headachelableloctor).toBeVisible();
  const foreheadlabellocator = iframe.locator(this.male_fronthead_puffyforeheadlabel);
  await expect(foreheadlabellocator).toBeVisible();
}

async clickMaleFrontChestBodyPart(): Promise<void>{
  const iframe = await this.getIframe(); // Get the iframe context
    const frontHeadBodyPArt = iframe.locator(this.male_frontchest_link); // Use locator to find the male tab inside the iframe
    await frontHeadBodyPArt.waitFor({ state: 'visible', timeout: 10000 });
    await frontHeadBodyPArt.click({ timeout: 10000 });
  }

async verifyMaleFronChestSymptons() : Promise<void>
{
  const iframe = await this.getIframe(); // Get the iframe context
  const asthmalableloctor = iframe.locator(this.male__frontchest_asthmalabel);
  await expect(asthmalableloctor).toBeVisible();
  const painlabellocator = iframe.locator(this.male_frontchest_painlabel);
  await expect(painlabellocator).toBeVisible();

}

async SelectMaleFrontHeadSymptoms(): Promise<void>{
  const iframe = await this.getIframe(); // Get the iframe context
  const headachechlabelselector = iframe.locator(this.male_fronthead_headachelabel);
  await headachechlabelselector.waitFor({state: 'visible', timeout: 10000});
  await headachechlabelselector.click({timeout: 10000});
  const foreheadlabelselector = iframe.locator(this.male_fronthead_puffyforeheadlabel);
  await foreheadlabelselector.waitFor({state: 'visible', timeout: 10000});
  await foreheadlabelselector.click({timeout: 10000});
  console.log('Symptoms tab clicked.');
  }

async clickClearAllButton(): Promise<void>{
  const iframe = await this.getIframe(); // Get the iframe context
    const clearallbutton = iframe.locator(this.clearAllButton); // Use locator to find the male tab inside the iframe
    await clearallbutton.waitFor({ state: 'visible', timeout: 10000 });
    await clearallbutton.click({ timeout: 10000 });
  }

  async clickContinueButton(): Promise<void> {
    const iframe = await this.getIframe(); // Get the iframe context
    const continueButton = iframe.locator(this.continueButton); 
    console.log('Continue locator found');
    
    await continueButton.waitFor({ state: 'visible', timeout: 10000 });
    await continueButton.click({ timeout: 10000 });
    console.log('Continue button clicked.');
//     await this.page.waitForLoadState('load');


//     // Wait for the Lead Capture Form title to become visible in the iframe
//     const leadFormTitle = iframe.locator(this.leadCaptureFormTitle);
    
//     try {
//         // Wait for the title to become visible
//         await leadFormTitle.waitFor({ state: 'visible', timeout: 60000 }); // 1 minute timeout

//         console.log('Lead Capture Form title is now visible.');
        
//         // Extract the inner text of the title once it's visible
//         const leadText = await leadFormTitle.innerText();
//         console.log('Lead Capture Form title verified:', leadText);
//     } catch (error) {
//         console.error('Error waiting for Lead Capture Form title:', error);
//         throw error; // Rethrow to fail the test properly
//     }
 }

}

export { SelfAssistmentPage };