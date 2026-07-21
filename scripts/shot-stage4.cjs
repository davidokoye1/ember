/* Temporary visual-check script — capture the four Stage 4 sections from the source site. */
const puppeteer = require('puppeteer-core');

(async () => {
  const base = process.argv[2] || 'http://localhost:5177';
  const out = process.argv[3] || '/home/okoye/tmp-shots';
  const browser = await puppeteer.launch({
    executablePath: process.env.CHROME_PATH || '/usr/bin/chromium',
    args: ['--no-sandbox', '--hide-scrollbars'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(base + '/', { waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 1800));

  for (const id of ['origins', 'process', 'subscriptions', 'wholesale']) {
    await page.evaluate((sid) => {
      document.getElementById(sid).scrollIntoView({ block: 'start' });
      window.scrollBy(0, -48);
    }, id);
    // real-time wait so framer-motion reveals finish (virtual time false-negatives)
    await new Promise((r) => setTimeout(r, 2200));
    const el = await page.$(`#${id}`);
    await el.screenshot({ path: `${out}/src-${id}.png` });
    console.log('captured', id);
  }
  await browser.close();
})();
