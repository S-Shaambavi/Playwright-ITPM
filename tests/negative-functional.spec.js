const { test, expect } = require('@playwright/test');

/**
 * Helper function to type and convert Thanglish to Tamil
 * @param {Page} page - Playwright page object
 * @param {string} text - Thanglish text to type
 * @returns {Promise<string>} - Converted Tamil text
 */
async function typeAndConvert(page, text) {
  const inputBox = page.locator('textarea');
  await inputBox.click();
  await inputBox.clear();
  await inputBox.type(text, { delay: 100 });
  await inputBox.press(' ');
  await inputBox.press('Backspace');
  await page.waitForTimeout(800);
  return await inputBox.inputValue();
}

test.describe('Negative Functional Tests - Thanglish to Tamil Transliteration', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('Neg_Fun_0001 - Joined words without spaces', async ({ page }) => {
    const input = 'naanschoolpogiren';
    const expectOutput = 'நான்schoolபோகிறேன்';
    
    const actualOutput = await typeAndConvert(page, input);

    console.log('Input:', input);
    console.log('Expected:', expectOutput);
    console.log('Actual:', actualOutput);
    
    expect(actualOutput).toBe(expectOutput);
  });

  test('Neg_Fun_0002 - English with numeric content', async ({ page }) => {
    const input = 'naan 500 roobaikku niraiya things vaanginen';
    const expectOutput = 'நான் 500 ரூபாய்க்கு நிறைய things வாங்கினேன்'; 
    
    const actualOutput = await typeAndConvert(page, input);

    console.log('Input:', input);
    console.log('Expected:', expectOutput);
    console.log('Actual:', actualOutput);
    
    expect(actualOutput).toBe(expectOutput);
  });

  test('Neg_Fun_0003 - English long sentence', async ({ page }) => {
    const input = 'Naan romba excited aaga irukken because ennoda chinna vayasu nanbanai meet panna poren.';
    const expectOutput = 'நான் ரொம்ப excited இருக்கேன் because என்னோட சின்ன வயசு நண்பனை meet பண்ண போறேன்';
    
    const actualOutput = await typeAndConvert(page, input);

    console.log('Input:', input);
    console.log('Expected:', expectOutput);
    console.log('Actual:', actualOutput);
    
    expect(actualOutput).toBe(expectOutput);
  });

  test('Neg_Fun_0004 - Multiple spaces and formatting', async ({ page }) => {
    const input = 'naan      nalaikku       market    pogiren';
    const expectOutput = 'நான்    நாளைக்கு    மார்க்கெட்    போகிறேன்';
    
    const actualOutput = await typeAndConvert(page, input);

    console.log('Input:', input);
    console.log('Expected:', expectOutput);
    console.log('Actual:', actualOutput);
    
    expect(actualOutput).toBe(expectOutput);
  });

  test('Neg_Fun_0005 - Mixed symbols and numbers', async ({ page }) => {
    const input = 'ungalathu meethiyai arivatharku *567# azhuthungal';
    const expectOutput = 'உங்களது மீதியை அறிவதற்கு *567# அழுத்துங்கள்';
    
    const actualOutput = await typeAndConvert(page, input);
    
    console.log('Input:', input);
    console.log('Expected:', expectOutput);
    console.log('Actual:', actualOutput);

    expect(actualOutput).toBe(expectOutput);
  });

  test('Neg_Fun_0006 - Time format with punctuation', async ({ page }) => {
    const input = 'naan 06.00 A.M. manikku veettukku ponaan';
    const expectOutput = 'நான் 06.30 A.M. மணிக்கு வீட்டுக்கு போனான்';
    
    const actualOutput = await typeAndConvert(page, input);

    console.log('Input:', input);
    console.log('Expected:', expectOutput);
    console.log('Actual:', actualOutput);
    
    expect(actualOutput).toBe(expectOutput);
  });

  test('Neg_Fun_0007 - Long paragraph', async ({ page }) => {
    const input = 'innaiku naan romba tired aaga irukken because kalaila irundhu meeting mela meeting poiddae irunthathu, Zoom meeting, Teams meeting ellame back to back aaga nadanthuchu, and athukku mela evening classes vera irunthuchu. adhanaala correct aaga sapida kooda mudiyala';
    const expertOutput = 'இன்னைக்கு நான் ரொம்ப tired ஆக இருக்கேன் because காலைல இருந்து meeting மேல meeting போய்ட்டே இருந்தது, Zoom meeting, Teams meeting எல்லாமே back to back ஆக நடந்துச்சு, அதுக்கு மேல evening classes வேற இருந்துச்சு. அதனால correct ஆக சாப்பிட கூட முடியல'; 
    
    const actualOutput = await typeAndConvert(page, input);

    console.log('Input:', input);
    console.log('Expected:', expertOutput);
    console.log('Actual:', actualOutput);
    
    expect(actualOutput).toBe(expertOutput);
  });

  test('Neg_Fun_0008 - Quotation marks handling', async ({ page }) => {
    const input = 'avan enkidda sonaan, naalaikku naama "outing" povom endu.';
    const expectOutput = 'அவன் என்கிட்டே சொன்னான், நாளைக்கு நாம "outing" போவோம் எண்டு.';
    
    const actualOutput = await typeAndConvert(page, input);

    console.log('Input:', input);
    console.log('Expected:', expectOutput);
    console.log('Actual:', actualOutput);
    
    expect(actualOutput).toBe(expectOutput);
  });

  test('Neg_Fun_0009 - Phone number sequence handling', async ({ page }) => {
    const input = 'Mealathiga thagavalgalukku 021 224 2953 enra tholaipeasi ilakkaththai thodarungal';
    const expectOutput = 'மேலதிக தகவல்களுக்கு 021 224 2953 என்ற தொலைபேசி இலக்கத்தை தொடருங்கள் ';
    
    const actualOutput = await typeAndConvert(page, input);

    console.log('Input:', input);
    console.log('Expected:', expectOutput);
    console.log('Actual:', actualOutput);
    
    expect(actualOutput).toBe(expectOutput);
  });

  test('Neg_Fun_0010 - abbreviation words with names/places', async ({ page }) => {
    const input = 'pls naama naalaikku KFC poiddu SLIIT Northern uni ill meet pannuvom';
    const expectOutput = 'pls நாம நாளைக்கு KFC போய்ட்டு SLIIT Northern uni இல் meet பண்ணுவோம்';
    
    const actualOutput = await typeAndConvert(page, input);
    
    console.log('Input:', input);
    console.log('Expected:', expectOutput);
    console.log('Actual:', actualOutput);

    expect(actualOutput).toBe(expectOutput);
  });

});
