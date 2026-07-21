/* Temporary visual-check script — safe to delete. Real-time (not virtual-time)
   because framer-motion opacity reveals false-negative under virtual time. */
const puppeteer = require('puppeteer-core');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: process.env.CHROME_PATH || '/usr/bin/chromium',
    args: ['--no-sandbox', '--hide-scrollbars'],
  });
  const page = await browser.newPage();
  const out = process.argv[2] || '.';

  const shots = [
    { w: 1440, h: 900, name: 'subs-desktop' },
    { w: 390, h: 844, name: 'subs-mobile' },
  ];

  for (const s of shots) {
    await page.setViewport({ width: s.w, height: s.h });
    await page.goto('http://localhost:5199/#subscriptions', { waitUntil: 'networkidle0' });
    await page.evaluate(() => document.getElementById('subscriptions').scrollIntoView());
    await new Promise((r) => setTimeout(r, 1800));
    const el = await page.$('#subscriptions');
    await el.screenshot({ path: `${out}/${s.name}.png` });
  }

  // Weekly cadence — most stamps on the calendar
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:5199/#subscriptions', { waitUntil: 'networkidle0' });
  await page.evaluate(() => document.getElementById('subscriptions').scrollIntoView());
  await new Promise((r) => setTimeout(r, 1200));
  const btns = await page.$$('#subscriptions [role="radio"]');
  await btns[0].click();
  await new Promise((r) => setTimeout(r, 1200));
  const el = await page.$('#subscriptions');
  await el.screenshot({ path: `${out}/subs-weekly.png` });

  await browser.close();
})();
