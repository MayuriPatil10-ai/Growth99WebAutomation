import { test, expect } from '@playwright/test';
import { config } from '../../utils/config'; // Import the config from the config.ts file
import { CliffhangerPage } from '../../testsPOM/cliffhanger.page'; // Import the CliffhangerPage class
import { SelfAssistmentPage } from '../../testsPOM/Cliffhanger/selfAssistment.page'; // Import the SelfAssistmentPage class

test('Verify that clicking on self-assistment button on preview page redirects to lead capture form', async ({ page }) => {
  const cliffhangerPage = new CliffhangerPage(page);
  const selfAssistmentPage = new SelfAssistmentPage(page);
  await selfAssistmentPage.navigate();
  await selfAssistmentPage.clickSelfAssistmentForm();
  await page.waitForTimeout(10000);
});

test('Verify that by selecting Male the respective picture should display.', async({page}) =>{

  const selfAssistmentPage = new SelfAssistmentPage(page);
  await selfAssistmentPage.navigate();
  await selfAssistmentPage.clickSelfAssistmentForm();
  await page.waitForTimeout(10000);
  await selfAssistmentPage.clickMaleTab();
  await page.waitForTimeout(10000);
  await selfAssistmentPage.verifyMaleImageIsVisible();
});

test('Verify that by selecting FeMale the respective picture should display.', async({page}) =>{
  const selfAssistmentPage = new SelfAssistmentPage(page);
  await selfAssistmentPage.navigate();
  await selfAssistmentPage.clickSelfAssistmentForm();
  await page.waitForTimeout(10000);
  await selfAssistmentPage.clickFemaleTab();
  await page.waitForTimeout(10000);
  await selfAssistmentPage.verifyFemaleImageIsVisible();
});

test('Verify that clicking on switch to back should display the back side of the body.', async({page}) =>{
  const selfAssistmentPage = new SelfAssistmentPage(page);
  await selfAssistmentPage.navigate();
  await selfAssistmentPage.clickSelfAssistmentForm();
  await page.waitForTimeout(10000);
  await selfAssistmentPage.clickSwitchToBackImage();
  await page.waitForTimeout(10000);

});

test('Verify that clicking on front head body part should show the symptoms related to front head body part.', async({page}) =>{
  const selfAssistmentPage = new SelfAssistmentPage(page);
  await selfAssistmentPage.navigate();
  await selfAssistmentPage.clickSelfAssistmentForm();
  await page.waitForTimeout(10000);
  await selfAssistmentPage.clickMaleTab();
  await page.waitForTimeout(10000);
  await selfAssistmentPage.clickMaleFrontHeadBodyPart();
  await page.waitForTimeout(1000);
  await selfAssistmentPage.verifyMaleFronHeadSymptons();
  });

test('Verify that clicking on front chest body part should show the symptoms related to front chest body part.', async({page}) =>{
  const selfAssistmentPage = new SelfAssistmentPage(page);
  await selfAssistmentPage.navigate();
  await selfAssistmentPage.clickSelfAssistmentForm();
  await page.waitForTimeout(10000);
  await selfAssistmentPage.clickMaleTab();
  await page.waitForTimeout(10000);
  await selfAssistmentPage.clickMaleFrontChestBodyPart();
  await page.waitForTimeout(1000);
  await selfAssistmentPage.verifyMaleFronChestSymptons();
  });

test('Verify that all the selected symptoms should removed by clicking clead all button.', async({page}) =>{
  const selfAssistmentPage = new SelfAssistmentPage(page);
  await selfAssistmentPage.navigate();
  await selfAssistmentPage.clickSelfAssistmentForm();
  await page.waitForTimeout(10000);
  await selfAssistmentPage.clickMaleTab();
  await page.waitForTimeout(10000);
  await selfAssistmentPage.clickMaleFrontHeadBodyPart();
  await page.waitForTimeout(1000);
  await selfAssistmentPage.SelectMaleFrontHeadSymptoms();
  await page.waitForTimeout(1000);
  await selfAssistmentPage.clickClearAllButton();
  //await page.waitForTimeout(1000);
  });

// test('Verify that after selecting symptoms and clicking on continue button should redirect to a form page.', async({page}) =>{
//   const selfAssistmentPage = new SelfAssistmentPage(page);
//   await selfAssistmentPage.navigate();
//   await selfAssistmentPage.clickSelfAssistmentForm();
//   await page.waitForTimeout(10000);
//   await selfAssistmentPage.clickMaleTab();
//   await page.waitForTimeout(10000);
//   await selfAssistmentPage.clickMaleFrontHeadBodyPart();
//   await page.waitForTimeout(1000);
//   await selfAssistmentPage.SelectMaleFrontHeadSymptoms();
//   await page.waitForTimeout(1000);
//   await selfAssistmentPage.clickContinueButton();
//  //await page.waitForTimeout(50000);
//   });