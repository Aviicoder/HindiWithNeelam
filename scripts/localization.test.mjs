import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const codes=['fr','ja','de','es','nl'];
const copies=codes.map(code=>JSON.parse(fs.readFileSync(`src/data/locales/${code}.json`,'utf8')));
function shape(value){
 if(Array.isArray(value))return value.map(shape);
 if(value&&typeof value==='object')return Object.fromEntries(Object.entries(value).map(([key,v])=>[key,shape(v)]));
 assert.equal(typeof value,'string');assert.ok(value.trim().length>0,'Translation strings must be present');
 assert.ok(!/TODO|PLACEHOLDER|\{\{/.test(value),'Unresolved translation placeholder');
 return 'string';
}
test('all five locale dictionaries have identical, nonempty content structure',()=>{
 const expected=shape(copies[0]);for(const copy of copies)assert.deepEqual(shape(copy),expected);
 for(const copy of copies){assert.equal(copy.hero.length,3);assert.equal(copy.paths.length,3);assert.equal(copy.resources.length,3);assert.equal(copy.faqs.length,4);assert.equal(copy.nav.length,5);}
});
test('each locale has distinct localized metadata and enquiry text',()=>{
 for(const key of ['locale','title','description','message'])assert.equal(new Set(copies.map(c=>c[key])).size,5,key);
 for(let i=0;i<codes.length;i++)assert.equal(copies[i].locale.split('-')[0],codes[i]);
});
