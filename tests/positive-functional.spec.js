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
  
  await inputBox.pressSequentially(text, { delay: 10 }); // Reduced from 20ms to 10ms
  
 
  await inputBox.press(' ');
  await inputBox.press('Backspace');
  
  await page.waitForTimeout(2000); // 
  
  return await inputBox.inputValue();
}

test.describe('Positive Functional Tests - Thanglish to Tamil Transliteration', () => {
  
  test.beforeEach(async ({ page }, testInfo) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
  });

  test('Pos_Fun_0001 - Daily language usage', async ({ page }, testInfo) => {
    const input = 'naan netru soru saappitten';
    const expectOutput = 'நான் நேற்று சோறு சாப்பிட்டேன்';
    
    const actualOutput = await typeAndConvert(page, input);
    
    testInfo.annotations.push(
      { type: 'Input', description: input },
      { type: 'Expected', description: expectOutput },
      { type: 'Actual', description: actualOutput }
    );
    
    expect(actualOutput).toBe(expectOutput);
  });

  test('Pos_Fun_0002 - Simple request', async ({ page }, testInfo) => {
    const input = 'thayavu seithu enakku neer thaarungal';
    const expectOutput = 'தயவு செய்து எனக்கு நீர் தாருங்கள்';
    
    const actualOutput = await typeAndConvert(page, input);

    testInfo.annotations.push(
      { type: 'Input', description: input },
      { type: 'Expected', description: expectOutput },
      { type: 'Actual', description: actualOutput }
    );
    
    expect(actualOutput).toBe(expectOutput);
  });

  test('Pos_Fun_0003 - Simple question', async ({ page }, testInfo) => {
    const input = 'naalaikku paadasalaikku poveengala';
    const expectOutput = 'நாளைக்கு பாடசாலைக்கு போவீங்களா';
    
    const actualOutput = await typeAndConvert(page, input);

    testInfo.annotations.push(
      { type: 'Input', description: input },
      { type: 'Expected', description: expectOutput },
      { type: 'Actual', description: actualOutput }
    );
    
    expect(actualOutput).toBe(expectOutput);
  });

  test('Pos_Fun_0004 - Compound sentence', async ({ page }, testInfo) => {
    const input = 'Naan kadaikku ponaan aanaal onnum vaangavillai';
    const expectOutput = 'நான் கடைக்கு போனான் ஆனால் ஒன்னும் வாங்கவில்லை';
    
    const actualOutput = await typeAndConvert(page, input);

    console.log('Input:', input);
    console.log('Expected:', expectOutput);
    console.log('Actual:', actualOutput);
    
    expect(actualOutput).toBe(expectOutput);
  });

  test('Pos_Fun_0005 - Uppercase only', async ({ page }, testInfo) => {
    const input = 'MAZHAI PEYTHATHAAL NAAN VELIYA POGALA';
    const expectOutput = 'மழை பெய்ததால் நான் வெளிய போகல';
    
    const actualOutput = await typeAndConvert(page, input);

    console.log('Input:', input);
    console.log('Expected:', expectOutput);
    console.log('Actual:', actualOutput);
    
    expect(actualOutput).toBe(expectOutput);
  });

  test('Pos_Fun_0006 - Greeting', async ({ page }, testInfo) => {
    const input = 'vanakkam eppadi irukkinga? Veetta elaarum sugamaa?';
    const expectOutput = 'வணக்கம் எப்படி இருக்கீங்க? வீட்டை எல்லாரும் சுகமா?';
    
    const actualOutput = await typeAndConvert(page, input);

    console.log('Input:', input);
    console.log('Expected:', expectOutput);
    console.log('Actual:', actualOutput);
    
    expect(actualOutput).toBe(expectOutput);
  });

  test('Pos_Fun_0007 - Proverb', async ({ page }, testInfo) => {
    const input = 'alavukku minjinaal amirthamum nanju';
    const expectOutput = 'அளவுக்கு மிஞ்சினால் அமிர்தமும் நஞ்சு';
    
    const actualOutput = await typeAndConvert(page, input);

    console.log('Input:', input);
    console.log('Expected:', expectOutput);
    console.log('Actual:', actualOutput);
    
    expect(actualOutput).toBe(expectOutput);
  });

  test('Pos_Fun_0008 - Place name', async ({ page }, testInfo) => {
    const input = 'naan Mannaar ill irunthu Vavuniya velikkiren';
    const expectOutput = 'நான் மன்னார் இல் இருந்து வவுனியா வெளிக்கிறேன்';
    
    const actualOutput = await typeAndConvert(page, input);

    console.log('Input:', input);
    console.log('Expected:', expectOutput);
    console.log('Actual:', actualOutput);
    
    expect(actualOutput).toBe(expectOutput);
  });

  test('Pos_Fun_0009 - Literary Tamil', async ({ page }, testInfo) => {
    const input = 'manithanin sinthaniye avanathu vaazhgaiyai amaikkum';
    const expectOutput = 'மனிதனின் சிந்தனையே அவனது வாழ்க்கையை அமைக்கும்';
    
    const actualOutput = await typeAndConvert(page, input);

    console.log('Input:', input);
    console.log('Expected:', expectOutput);
    console.log('Actual:', actualOutput);
    
    expect(actualOutput).toBe(expectOutput);
  });

  test('Pos_Fun_0010 - Poetic Line', async ({ page }, testInfo) => {
    const input = 'nilaa oli amaithiyaana iravin irulil veenai isai pola paravugirathu';
    const expectOutput = 'நிலா ஒளி அமைதியான இரவின் இருளில் வீணை இசை போல பரவுகிறது';
    
    const actualOutput = await typeAndConvert(page, input);

    console.log('Input:', input);
    console.log('Expected:', expectOutput);
    console.log('Actual:', actualOutput);
    
    expect(actualOutput).toBe(expectOutput);
  });

  test('Pos_Fun_0011 - Capitalization in each word', async ({ page }, testInfo) => {
    const input = 'Muyarchi Thaan Vetriyin Mudhal Padi';
    const expectOutput = 'முயற்சி தான் வெற்றியின் முதல் படி';
    
    const actualOutput = await typeAndConvert(page, input);

    console.log('Input:', input);
    console.log('Expected:', expectOutput);
    console.log('Actual:', actualOutput);
    
    expect(actualOutput).toBe(expectOutput);
  });

  test('Pos_Fun_0012 - Big spaces', async ({ page }, testInfo) => {
    const input = 'arivu     enra     selvam     ellaa     selvangalilum     periyathu';
    const expectOutput = 'அறிவு     என்ற     செல்வம்     எல்லா     செல்வங்களிலும்     பெரியது';
    
    const actualOutput = await typeAndConvert(page, input);

    console.log('Input:', input);
    console.log('Expected:', expectOutput);
    console.log('Actual:', actualOutput);
    
    expect(actualOutput).toBe(expectOutput);
  });

  test('Pos_Fun_0013 - Instruction sentence', async ({ page }, testInfo) => {
    const input = 'vinnappaththai muraiyaaga nirappiya pinbu aluvalagaththil oppadaikkavum';
    const expectOutput = 'விண்ணப்பத்தை முறையாக நிரப்பிய பின்பு அலுவலகத்தில் ஒப்படைக்கவும்';
    
    const actualOutput = await typeAndConvert(page, input);

    console.log('Input:', input);
    console.log('Expected:', expectOutput);
    console.log('Actual:', actualOutput);
    
    expect(actualOutput).toBe(expectOutput);
  });

  test('Pos_Fun_0014 - Command sentence', async ({ page }, testInfo) => {
    const input = 'noolagathirku varuvarku munpu ungalathu paathanigalai agatri viddu varavum';
    const expectOutput = 'நூலகத்திற்கு வருவற்கு முன்பு உங்களது பாதணிகளை அகற்றி விட்டு வரவும்';
    
    const actualOutput = await typeAndConvert(page, input);

    console.log('Input:', input);
    console.log('Expected:', expectOutput);
    console.log('Actual:', actualOutput);
    
    expect(actualOutput).toBe(expectOutput);
  });

  test('Pos_Fun_0015 - News line', async ({ page }, testInfo) => {
    const input = 'kadarkarai pagudigalil palaththa kaatru veesum vaayppu ullathu ena echcharikkai vidappaddullathu';
    const expectOutput = 'கடற்கரை பகுதிகளில் பலத்த காற்று வீசும் வாய்ப்பு உள்ளது என எச்சரிக்கை விடப்பட்டுள்ளது';
    
    const actualOutput = await typeAndConvert(page, input);

    console.log('Input:', input);
    console.log('Expected:', expectOutput);
    console.log('Actual:', actualOutput);
    
    expect(actualOutput).toBe(expectOutput);
  });

    test('Pos_Fun_0016 - Announcement', async ({ page }, testInfo) => {
    const input = 'arasu inru puthiya sattaththai amul paduththugirathu';
    const expectOutput = 'அரசு இன்று புதிய சட்டத்தை அமுல் படுத்துகிறது';
    
    const actualOutput = await typeAndConvert(page, input);

    console.log('Input:', input);
    console.log('Expected:', expectOutput);
    console.log('Actual:', actualOutput);
    
    expect(actualOutput).toBe(expectOutput);
  });

  test('Pos_Fun_0017 - Declarative line', async ({ page }, testInfo) => {
    const input = 'avan epothume thaanum thanathu velaiyai mattume paarthuttu iruppaan';
    const expectOutput = 'அவன் எப்போதுமே தானும் தனது வேலையை மட்டுமே பார்த்துட்டு இருப்பான்';
    
    const actualOutput = await typeAndConvert(page, input);

    console.log('Input:', input);
    console.log('Expected:', expectOutput);
    console.log('Actual:', actualOutput);
    
    expect(actualOutput).toBe(expectOutput);
  });

  test('Pos_Fun_0018 -  Respectful form', async ({ page }, testInfo) => {
    const input = 'naam eppothum namakku mooththorukku mariyatha kodukka vendum';
    const expectOutput = 'நாம் எப்போதும் நமக்கு மூத்தோருக்கு மரியாதை கொடுக்க வேண்டும்';
    
    const actualOutput = await typeAndConvert(page, input);

    console.log('Input:', input);
    console.log('Expected:', expectOutput);
    console.log('Actual:', actualOutput);
    
    expect(actualOutput).toBe(expectOutput);
  });

  test('Pos_Fun_0019 - Plural form', async ({ page }, testInfo) => {
    const input = 'pasanga maithaanaththil kilithattu vilaiyaadinaargal';
    const expectOutput = 'பசங்க மைதானத்தில் கிளித்தட்டு விளையாடினார்கள்';
    
    const actualOutput = await typeAndConvert(page, input);

    console.log('Input:', input);
    console.log('Expected:', expectOutput);
    console.log('Actual:', actualOutput);
    
    expect(actualOutput).toBe(expectOutput);
  });

  test('Pos_Fun_0020 - Medium paragraph', async ({ page }, testInfo) => {
    const input = 'kaalaiyil thinamum ezhunthu veettu velaigalai mudiththa pinpu naan enathu palkalaigalagaththirku seluven. Angu senru enathu paadangalai padiththu muditha pinbu veettirkku seluven';
    const expectOutput = 'காலையில் தினமும் எழுந்து வீட்டு வேலைகளை முடித்த பின்பு நான் எனது பல்கலைகழகத்திற்கு செல்லுவேன். அங்கு சென்று எனது பாடங்களை படித்து முடித்த பின்பு வீட்டிற்கு செல்லுவேன்';
    
    const actualOutput = await typeAndConvert(page, input);

    console.log('Input:', input);
    console.log('Expected:', expectOutput);
    console.log('Actual:', actualOutput);
    
    expect(actualOutput).toBe(expectOutput);
  });

    test('Pos_Fun_0021 - Emoji', async ({ page }, testInfo) => {
    const input = 'naan vellikkizhamaiyil asaivam saappida maatten 🫡😣 ';
    const expectOutput = 'நான் வெள்ளிக்கிழமையில் அசைவம் சாப்பிட மாட்டேன் 🫡😣 ';
    
    const actualOutput = await typeAndConvert(page, input);

    console.log('Input:', input);
    console.log('Expected:', expectOutput);
    console.log('Actual:', actualOutput);
    
    expect(actualOutput).toBe(expectOutput);
  });

  test('Pos_Fun_0022 - Punctuation mark', async ({ page }, testInfo) => {
    const input = 'paadasalaikku sella munpu, "kaalai unavu" mukkiyamaga saappida vendum';
    const expectOutput = 'பாடசாலைக்கு செல்ல முன்பு, "காலை உணவு" முக்கியமாக சாப்பிட வேண்டும்';
    
    const actualOutput = await typeAndConvert(page, input);

    console.log('Input:', input);
    console.log('Expected:', expectOutput);
    console.log('Actual:', actualOutput);
    
    expect(actualOutput).toBe(expectOutput);
  });

  test('Pos_Fun_0023 - Emoji with punctuation mark', async ({ page }, testInfo) => {
    const input = 'naalaikku piranthanaal 🎂 kondaadam ondru irukirathu, anaivarum marakaamal varavum 😊 ';
    const expectOutput = 'நாளைக்கு பிறந்தநாள் 🎂 கொண்டாட்டம் ஒன்று இருக்கிறது, அனைவரும் மறக்காமல் வரவும் 😊 ';
    
    const actualOutput = await typeAndConvert(page, input);

    console.log('Input:', input);
    console.log('Expected:', expectOutput);
    console.log('Actual:', actualOutput);
    
    expect(actualOutput).toBe(expectOutput);
  });

  test('Pos_Fun_0024 - Upper case only with Emoji', async ({ page }, testInfo) => {
    const input = 'ADSHAYAA NETRU ORU SIVAPPU THEANEER KOPPAI ☕🍵 VAANGINAAR';
    const expectOutput = 'அட்ஷயா நேற்று ஒரு சிவப்பு தேநீர் கோப்பை ☕🍵 வாங்கினார்';
    
    const actualOutput = await typeAndConvert(page, input);

    console.log('Input:', input);
    console.log('Expected:', expectOutput);
    console.log('Actual:', actualOutput);
    
    expect(actualOutput).toBe(expectOutput);
  });


});
