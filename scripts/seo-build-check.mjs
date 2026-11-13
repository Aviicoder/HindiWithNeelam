import assert from 'node:assert/strict';import fs from 'node:fs';import {execFileSync} from 'node:child_process';
const env={...process.env,ASTRO_TELEMETRY_DISABLED:'1'};
const build=(extra)=>execFileSync('npm',['run','build'],{env:{...env,...extra},stdio:'pipe'});
try {
 build({SITE_URL:'https://example.com',CF_PAGES_BRANCH:'main'});
 const home=fs.readFileSync('dist/index.html','utf8');assert.match(home,/<link rel="canonical" href="https:\/\/example.com\/"/);assert.match(home,/content="index, follow"/);
 const sitemap=fs.readFileSync('dist/sitemap-0.xml','utf8');assert.equal((sitemap.match(/<loc>/g)||[]).length,25);assert.ok(!sitemap.includes('404'));assert.ok(sitemap.includes('https://example.com/australia/melbourne/'));assert.match(fs.readFileSync('dist/robots.txt','utf8'),/Sitemap: https:\/\/example.com\/sitemap-index.xml/);assert.match(fs.readFileSync('dist/404.html','utf8'),/noindex, nofollow/);
 console.log('PASS production origin: canonical, indexability, 25 sitemap URLs, robots and noindex 404.');
 build({SITE_URL:'https://example.com',CF_PAGES_BRANCH:'feature-test'});
 assert.match(fs.readFileSync('dist/index.html','utf8'),/noindex, nofollow/);assert.ok(!fs.existsSync('dist/sitemap-index.xml'));assert.equal(fs.readFileSync('dist/robots.txt','utf8'),'User-agent: *\nDisallow: /\n');console.log('PASS preview branch: noindex, crawling disallowed, no sitemap.');
} finally {build({SITE_URL:'',CF_PAGES_BRANCH:''});}
assert.ok(!fs.readFileSync('dist/index.html','utf8').includes('https://example.com'));console.log('Restored an unconfigured, noindex local preview build.');
