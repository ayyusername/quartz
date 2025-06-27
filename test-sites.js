import puppeteer from 'puppeteer';

async function checkSites() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  
  console.log('Checking GitHub Pages...');
  await page.goto('https://ayyusername.github.io/quartz/');
  await page.waitForTimeout(3000);
  await page.screenshot({ path: 'github-pages-site.png', fullPage: true });
  
  console.log('Checking Vercel...');
  await page.goto('https://quartz-topaz.vercel.app/');
  await page.waitForTimeout(3000);
  await page.screenshot({ path: 'vercel-site.png', fullPage: true });
  
  console.log('Checking local server...');
  try {
    await page.goto('http://localhost:8080/');
    await page.waitForTimeout(3000);
    await page.screenshot({ path: 'local-site.png', fullPage: true });
  } catch (e) {
    console.log('Local server not running:', e.message);
  }
  
  await browser.close();
  console.log('Screenshots saved!');
}

checkSites().catch(console.error);