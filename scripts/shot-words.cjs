/* Temporary visual-check script — safe to delete. Real-time (not virtual-time)
   because framer-motion opacity/transform reveals false-negative under virtual
   time. Drives real wheel bursts so Lenis smooth-scroll is exercised. */
const puppeteer = require('puppeteer-core');

const SECTIONS = [
  'our-story', 'origins', 'process', 'roasts', 'voices',
  'subscriptions', 'wholesale', 'fine-print',
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/* Real-time wheel burst to drive Lenis to a target scrollY, then settle. */
async function wheelTo(page, targetY, settle = 1600) {
  await page.mouse.move(720, 450);
  for (let guard = 0; guard < 60; guard++) {
    const y = await page.evaluate(() => window.scrollY);
    if (Math.abs(y - targetY) < 40) break;
    const dir = targetY > y ? 1 : -1;
    await page.mouse.wheel({ deltaY: dir * 380 });
    await sleep(30);
  }
  await sleep(settle);
}

async function metrics(page, selector) {
  return page.evaluate((sel) => {
    const el = document.querySelector(sel);
    if (!el) return null;
    const inner = el.querySelector('span > span, .inline-block');
    const cs = inner ? getComputedStyle(inner) : null;
    const r = el.getBoundingClientRect();
    return {
      transform: cs ? cs.transform : null,
      bottom: Math.round(r.bottom),
      top: Math.round(r.top),
    };
  }, selector);
}

(async () => {
  const browser = await puppeteer.launch({
    executablePath: process.env.CHROME_PATH || '/usr/bin/chromium',
    args: ['--no-sandbox', '--hide-scrollbars'],
  });
  const page = await browser.newPage();
  const out = process.argv[2] || '/tmp';
  await page.setViewport({ width: 1440, height: 900 });

  // 1) Normal pass
  await page.goto('http://localhost:5199/', { waitUntil: 'networkidle0' });
  await sleep(2000);
  await page.screenshot({ path: `${out}/words-0-hero.png` });

  for (const id of SECTIONS) {
    const targetY = await page.evaluate((s) => {
      const el = document.getElementById(s);
      return el ? window.scrollY + el.getBoundingClientRect().top - 80 : 0;
    }, id);

    // Mid-animation capture for 'process': screenshot shortly after arrival.
    if (id === 'process') {
      await wheelTo(page, targetY, 120);
      await page.screenshot({ path: `${out}/words-process-MID.png` });
      await sleep(1600);
      await page.screenshot({ path: `${out}/words-${id}.png` });
    } else {
      await wheelTo(page, targetY, 1600);
      await page.screenshot({ path: `${out}/words-${id}.png` });
    }
  }

  // Footer at very bottom
  const bottomY = await page.evaluate(() => document.body.scrollHeight);
  await wheelTo(page, bottomY, 1600);
  await page.screenshot({ path: `${out}/words-9-footer.png` });

  // 2) Reduced-motion pass — text must be fully visible immediately
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
  await page.goto('http://localhost:5199/', { waitUntil: 'networkidle0' });
  await page.evaluate(() => {
    const el = document.getElementById('process');
    if (el) el.scrollIntoView();
  });
  await sleep(300);
  await page.screenshot({ path: `${out}/words-rm-process.png` });
  await page.evaluate(() => window.scrollTo(0, 0));
  await sleep(300);
  await page.screenshot({ path: `${out}/words-rm-hero.png` });

  await browser.close();
})();
