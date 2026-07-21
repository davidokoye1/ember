/* Temporary visual-check script — safe to delete. Real-time (not virtual-time)
   because framer-motion opacity reveals false-negative under virtual time.
   Drives real wheel events so Lenis (which intercepts wheel) is exercised. */
const puppeteer = require('puppeteer-core');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: process.env.CHROME_PATH || '/usr/bin/chromium',
    args: ['--no-sandbox', '--hide-scrollbars'],
  });
  const page = await browser.newPage();
  const out = process.argv[2] || '.';
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:5199/', { waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 1600));

  // 1) Lenis smoothing: one big wheel burst → scroll should keep gliding after
  await page.mouse.move(720, 450);
  for (let i = 0; i < 10; i++) {
    await page.mouse.wheel({ deltaY: 400 });
    await new Promise((r) => setTimeout(r, 30));
  }
  const yJustAfter = await page.evaluate(() => window.scrollY);
  await new Promise((r) => setTimeout(r, 250));
  const yLater = await page.evaluate(() => window.scrollY);
  await new Promise((r) => setTimeout(r, 1500));
  const ySettled = await page.evaluate(() => window.scrollY);
  console.log('lenis glide:', { yJustAfter, yLater, ySettled, gliding: yLater > yJustAfter });
  await page.screenshot({ path: `${out}/scroll-1-after-wheel.png` });

  // 2) Marquee position moves over time (velocity-driven drift)
  const mx1 = await page.evaluate(() => {
    const el = document.querySelector('.bg-ember.py-3 > div, .bg-ember.md\\:py-4 > div');
    return el ? getComputedStyle(el).transform : null;
  });
  await new Promise((r) => setTimeout(r, 800));
  const mx2 = await page.evaluate(() => {
    const el = document.querySelector('.bg-ember.py-3 > div, .bg-ember.md\\:py-4 > div');
    return el ? getComputedStyle(el).transform : null;
  });
  console.log('marquee drift:', { mx1, mx2, moving: mx1 !== mx2 });

  // 3) Anchor glide: click nav "Roasts" → should end at #roasts below topbar
  await page.click('a[href="#roasts"]');
  await new Promise((r) => setTimeout(r, 2500));
  const anchorCheck = await page.evaluate(() => {
    const r = document.getElementById('roasts').getBoundingClientRect();
    return { top: Math.round(r.top) };
  });
  console.log('anchor land (expect ~48):', anchorCheck);
  await page.screenshot({ path: `${out}/scroll-2-roasts.png` });

  // 4) Parallax: process image transform at two scroll positions
  await page.evaluate(() => document.getElementById('process').scrollIntoView());
  await new Promise((r) => setTimeout(r, 400));
  const p1 = await page.evaluate(() => {
    const fig = document.querySelector('#process figure img');
    return getComputedStyle(fig).transform;
  });
  for (let i = 0; i < 6; i++) {
    await page.mouse.wheel({ deltaY: 300 });
    await new Promise((r) => setTimeout(r, 40));
  }
  await new Promise((r) => setTimeout(r, 1200));
  const p2 = await page.evaluate(() => {
    const fig = document.querySelector('#process figure img');
    return getComputedStyle(fig).transform;
  });
  console.log('process parallax:', { p1, p2, differs: p1 !== p2 });

  // 5) Footer wordmark scrub: transform near bottom vs at bottom
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight - 1600));
  await new Promise((r) => setTimeout(r, 600));
  const f1 = await page.evaluate(() => {
    const el = document.querySelector('footer .display.text-\\[20vw\\]');
    return el ? getComputedStyle(el).transform : null;
  });
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await new Promise((r) => setTimeout(r, 800));
  const f2 = await page.evaluate(() => {
    const el = document.querySelector('footer .display.text-\\[20vw\\]');
    return el ? getComputedStyle(el).transform : null;
  });
  console.log('footer scrub:', { f1, f2, differs: f1 !== f2 });
  await page.screenshot({ path: `${out}/scroll-3-footer.png` });

  // 6) Hero parallax on the way back up
  await page.evaluate(() => window.scrollTo(0, 300));
  await new Promise((r) => setTimeout(r, 600));
  const heroMid = await page.evaluate(() => {
    const mark = document.querySelector('h1 > span');
    return getComputedStyle(mark).transform;
  });
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise((r) => setTimeout(r, 600));
  const heroTop = await page.evaluate(() => {
    const mark = document.querySelector('h1 > span');
    return getComputedStyle(mark).transform;
  });
  console.log('hero wordmark parallax:', { heroMid, heroTop, differs: heroMid !== heroTop });
  await page.screenshot({ path: `${out}/scroll-4-hero.png` });

  await browser.close();
})();
