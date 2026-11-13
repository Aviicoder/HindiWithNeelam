import source from './pages.json';
export interface City { name:string; zone:string; path:string; note:string; anchor:string }
export interface Page { slug:string; title:string; description:string; eyebrow:string; lead:string; heading:string; sections:{title:string;body:string}[]; kind?:string; strap?:string; related:string[]; cities?:City[]; city?:string; zone?:string; parent?:string; locale?:string }
export const pages = source as Page[];
export const findPage = (slug:string) => pages.find(page=>page.slug===slug);
export const href = (slug:string) => `/${slug}/`;
export const brand = {name:'Hindi with Neelam',email:'learnwithneelamy@gmail.com',phone:'+919971055356'};
export const vowels = [['अ','a'],['आ','aa'],['इ','i'],['ई','ee'],['उ','u'],['ऊ','oo'],['ए','e'],['ऐ','ai'],['ओ','o'],['औ','au']];
export const phrases = [['नमस्ते','Namaste','Hello'],['आप कैसे हैं?','Aap kaise hain?','How are you? (respectful)'],['मेरा नाम … है।','Mera naam … hai.','My name is …'],['धन्यवाद','Dhanyavaad','Thank you'],['फिर मिलेंगे।','Phir milenge.','See you again.']];
