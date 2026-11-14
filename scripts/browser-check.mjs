import fs from 'node:fs';import assert from 'node:assert/strict';import {chromium} from 'playwright';
const base=process.env.TEST_URL||'http://127.0.0.1:4322';
const localeCodes=['fr','ja','de','es','nl'];
const localeCopies=Object.fromEntries(localeCodes.map(code=>[code,JSON.parse(fs.readFileSync(`src/data/locales/${code}.json`,'utf8'))]));
const structures=new Map();
const content=JSON.parse(fs.readFileSync('src/data/pages.json','utf8'));const routes=['/',...content.map(p=>'/'+p.slug+'/'),...localeCodes.map(code=>`/${code}/`)];
fs.mkdirSync('test-results',{recursive:true});
const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||(fs.existsSync('/usr/bin/chromium')?'/usr/bin/chromium':undefined),args:['--no-sandbox']});const page=await browser.newPage();const errors=[];const failures=[];page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400&&r.url().startsWith(base))failures.push({url:r.url(),status:r.status()});});
const report={pages:[],accessibility:[],interactions:{},errors,failures};
for(const width of [1440,390]){
 await page.setViewportSize({width,height:960});
 for(const route of routes){const response=await page.goto(base+route,{waitUntil:'networkidle'});await page.evaluate(()=>document.fonts.ready);assert.equal(response.status(),200,route);const state=await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth,h1:document.querySelectorAll('h1').length,brokenImages:[...document.images].filter(i=>i.complete&&!i.naturalWidth).map(i=>i.src)}));assert.equal(state.overflow,false,route+' overflow at '+width);assert.equal(state.h1,1);assert.deepEqual(state.brokenImages,[],route);report.pages.push({route,width,...state});
 const visibleCopy=await page.locator('body').innerText();
 assert.ok(!visibleCopy.includes('learnwithneelamy@gmail.com'),route+' should use a labelled email hyperlink');
 assert.ok(!/99710[\s-]*55356/.test(visibleCopy),route+' should use a labelled call hyperlink');
 assert.equal(await page.locator('.contact-strip a[href="tel:+919971055356"]').count(),1);
 assert.equal(await page.locator('.contact-strip a[href="mailto:learnwithneelamy@gmail.com"]').count(),1);
 if(route==='/time-zones/')assert.equal(await page.locator('.planner-next-step a[href="/contact/"]').count(),1);
 const policyActions={ '/editorial-policy/':'Suggest a correction', '/privacy/':'Ask a privacy question', '/accessibility/':'Report an accessibility issue' };
 if(policyActions[route])assert.ok((await page.getByRole('link',{name:policyActions[route],exact:true}).getAttribute('href')).startsWith('mailto:learnwithneelamy@gmail.com?subject='));

 const code=route.split('/')[1];
 if(localeCodes.includes(code)){
  const copy=localeCopies[code];
  assert.equal(await page.locator('html').getAttribute('lang'),copy.locale);
  assert.equal(await page.title(),copy.title);
  assert.equal(await page.locator('#paths .path-card').count(),3);
  assert.equal(await page.locator('#resources .resource-card').count(),3);
  assert.equal(await page.locator('.faq-list details').count(),4);
  assert.equal(await page.locator('.contact-strip a[href="tel:+919971055356"]').count(),1);
  const whatsapp=new URL(await page.locator('.contact-strip a[href^="https://wa.me/"]').getAttribute('href'));
  assert.equal(whatsapp.pathname,'/919971055356');assert.equal(whatsapp.searchParams.get('text'),copy.message);
  assert.equal(await page.locator('.contact-strip a[href="mailto:learnwithneelamy@gmail.com"]').count(),1);
  assert.equal(await page.locator('.language-links a').count(),6);
  const structure=await page.evaluate(()=>[...document.body.querySelectorAll('*')].map(el=>[el.tagName,el.getAttribute('class'),el.getAttribute('role'),el.children.length]));
  if(structures.has(width))assert.deepEqual(structure,structures.get(width),route+' must retain identical localized DOM structure');else structures.set(width,structure);
  const sections=['paths','teacher','resources','questions','contact'];
  for(const id of sections)assert.equal(await page.locator('#'+id).count(),1);
  await page.locator('.faq-list summary').first().click();assert.equal(await page.locator('.faq-list details').first().getAttribute('open'),'');
  await page.screenshot({path:`test-results/${code}-${width}.png`,fullPage:true});
 }

 if(width===1440){await page.addScriptTag({path:'node_modules/axe-core/axe.min.js'});const a=await page.evaluate(async()=>{const r=await window.axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa']}});return r.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>n.target)}));});report.accessibility.push({route,violations:a});}
 }
}
await page.goto(base+'/',{waitUntil:'networkidle'});await page.screenshot({path:'test-results/home-mobile.png',fullPage:true});await page.locator('.mobile-nav summary').click();assert.equal(await page.getByRole('navigation',{name:'Mobile navigation'}).isVisible(),true);await page.getByRole('navigation',{name:'Mobile navigation'}).getByRole('link',{name:'Australia',exact:true}).click();await page.waitForURL('**/australia/');report.interactions.mobileNavigation=true;
await page.goto(base+'/',{waitUntil:'networkidle'});const faq=page.locator('.faq-list details').first();await faq.locator('summary').click();assert.equal(await faq.getAttribute('open'),'');await faq.locator('summary').click();assert.equal(await faq.getAttribute('open'),null);report.interactions.faq=true;
await page.setViewportSize({width:1440,height:1000});await page.goto(base+'/',{waitUntil:'networkidle'});await page.screenshot({path:'test-results/home-desktop.png',fullPage:true});await page.screenshot({path:'test-results/home-hero.png'});
await page.goto(base+'/time-zones/',{waitUntil:'networkidle'});await page.locator('#date').fill('2026-01-17');await page.locator('#time').fill('08:00');const latency=await page.evaluate(()=>{const start=performance.now();document.querySelector('#time-form').dispatchEvent(new Event('submit',{bubbles:true,cancelable:true}));return performance.now()-start;});assert.match(await page.locator('#time-result').innerText(),/6:30 pm IST/);assert.ok(latency<300,'Planner processing exceeded 300 ms');report.interactions.plannerProcessingMs=latency;
await page.locator('#date').fill('2026-03-08');await page.locator('#time').fill('02:30');await page.getByRole('button',{name:'Check India time'}).click();assert.match(await page.locator('#time-result').innerText(),/does not exist/);await page.locator('#date').fill('2026-11-01');await page.locator('#time').fill('01:30');await page.getByRole('button',{name:'Check India time'}).click();assert.match(await page.locator('#time-result').innerText(),/occurs twice/);report.interactions.daylightSavingEdgeCases=true;
await page.goto(base+'/contact/?city=Melbourne',{waitUntil:'networkidle'});assert.equal(await page.locator('#city').inputValue(),'Melbourne');await page.getByRole('button',{name:'Prepare my message'}).click();assert.equal(await page.locator('#enquiry-output').isVisible(),false);await page.locator('#name').fill('Test & Parent');await page.locator('#notes').fill('Age 7–9; weekend times. <b>Hindi</b>');await page.locator('input[name="adult"]').check();const formLatency=await page.evaluate(()=>{const start=performance.now();document.querySelector('#enquiry-form').dispatchEvent(new Event('submit',{bubbles:true,cancelable:true}));return performance.now()-start;});assert.ok(formLatency<300);assert.equal(await page.locator('#message-preview b').count(),0);const wa=new URL(await page.locator('#whatsapp-message').getAttribute('href'));assert.equal(wa.hostname,'wa.me');assert.match(wa.searchParams.get('text'),/Test & Parent/);assert.match(wa.searchParams.get('text'),/Melbourne/);assert.ok((await page.locator('#email-message').getAttribute('href')).startsWith('mailto:'));await page.locator('#notes').fill('Changed enquiry');assert.equal(await page.locator('#enquiry-output').isVisible(),false);report.interactions.enquiryProcessingMs=formLatency;report.interactions.enquiryValidationAndSafeHandoff=true;
const pdf=await page.request.get(base+'/resources/hindi-vowel-practice.pdf');assert.equal(pdf.status(),200);assert.ok((await pdf.body()).subarray(0,4).toString()==='%PDF');report.interactions.pdfDownload=true;
const nojs=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});const np=await nojs.newPage();await np.goto(base+'/');assert.equal(await np.locator('h1').count(),1);await np.locator('.mobile-nav summary').click();await np.getByRole('navigation',{name:'Mobile navigation'}).getByRole('link',{name:'Resources',exact:true}).click();await np.waitForURL('**/resources/');await np.goto(base+'/contact/');assert.equal(await np.getByRole('link',{name:'email Neelam directly'}).isVisible(),true);report.interactions.javascriptDisabled=true;for(const code of localeCodes){await np.goto(base+`/${code}/`);assert.equal(await np.locator('h1').count(),1);assert.equal(await np.locator('#contact a[href^="https://wa.me/"]').count(),1);await np.locator('.mobile-nav summary').click();assert.equal(await np.locator('.mobile-nav nav').isVisible(),true);}
await nojs.close();
const missing=await page.request.get(base+'/this-page-does-not-exist/');assert.equal(missing.status(),404);report.interactions.notFound=true;
fs.writeFileSync('test-results/browser-results.json',JSON.stringify(report,null,2));await browser.close();
const violations=report.accessibility.flatMap(r=>r.violations.map(v=>({route:r.route,...v})));console.log(JSON.stringify({pageChecks:report.pages.length,interactions:report.interactions,errors,failures,accessibilityViolations:violations},null,2));assert.deepEqual(errors,[]);assert.deepEqual(failures,[]);assert.deepEqual(violations,[]);
