const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:3000');
  // Wait for the blog card to load
  await page.waitForSelector('.home-blog-section .blog-card');
  
  // Get all classes of the blog cards
  const cards = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('.home-blog-section .blog-card')).map(el => ({
      text: el.querySelector('h3').innerText,
      className: el.className,
      gridColumn: window.getComputedStyle(el).gridColumn,
      parentClassName: el.parentElement.className
    }));
  });

  console.log('Cards found:', JSON.stringify(cards, null, 2));
  await browser.close();
})();
