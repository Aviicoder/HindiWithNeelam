import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
const configured = process.env.SITE_URL?.replace(/\/$/, '');
const isPreview = Boolean(process.env.CF_PAGES_BRANCH && process.env.CF_PAGES_BRANCH !== 'main');
const origin = isPreview ? undefined : (configured || undefined);
if (origin && !/^https:\/\/[^/]+$/.test(origin)) throw new Error('SITE_URL must be an HTTPS origin without a path.');
export default defineConfig({site: origin, output:'static', build:{inlineStylesheets:'always'}, trailingSlash:'always', integrations: origin ? [sitemap({filter: url => !url.endsWith('/404/')})] : [], vite:{plugins:[tailwindcss()]}, server:{port:4321}});
