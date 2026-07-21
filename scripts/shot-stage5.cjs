/* Capture Voices + FinePrint reference shots at 1200px (Framer desktop canvas width). */
const puppeteer = require('puppeteer-core');

(async () => {
  const base = process.argv[2] || 'http://localhost:5178';
  const out = process.argv[3] || '/home/okoye/tmp-shots';
  const browser = await puppeteer.launch({
    executablePath: process.env.CHROME_PATH || '/usr/bin/chromium',
    args: ['--no-sandbox', '--hide-scrollbars'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 900 });
  await page.goto(base + '/', { waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 1800));

  for (const id of ['voices', 'fine-print']) {
    await page.evaluate((sid) => {
      document.getElementById(sid).scrollIntoView({ block: 'start' });
      window.scrollBy(0, -48);
    }, id);
    await new Promise((r) => setTimeout(r, 2200));
    // scroll through the section so all reveals fire
    await page.evaluate((sid) => {
      const el = document.getElementById(sid);
      const bottom = el.offsetTop + el.offsetHeight;
      window.scrollTo(0, bottom - window.innerHeight);
    }, id);
    await new Promise((r) => setTimeout(r, 2200));
    await page.evaluate((sid) => {
      document.getElementById(sid).scrollIntoView({ block: 'start' });
      window.scrollBy(0, -48);
    }, id);
    await new Promise((r) => setTimeout(r, 1200));
    const el = await page.$(`#${id}`);
    await el.screenshot({ path: `${out}/src-${id}.png` });
    console.log('captured', id);
  }
  await browser.close();
})();
