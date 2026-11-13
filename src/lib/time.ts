export const zones = [
 ['New York / New Jersey / Washington / Atlanta / Philadelphia','America/New_York'],
 ['Chicago / Dallas / Houston','America/Chicago'],
 ['San Francisco / San Jose / Los Angeles','America/Los_Angeles'],
 ['Melbourne','Australia/Melbourne'],['Sydney / Canberra','Australia/Sydney'],
 ['Brisbane','Australia/Brisbane'],['Perth','Australia/Perth'],['Adelaide','Australia/Adelaide']
] as const;
export function localToInstants(local:string, zone:string):Date[] {
 if(!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(local)) return [];
 const raw=new Date(local+'Z');
 if(!Number.isFinite(raw.getTime())||raw.toISOString().slice(0,16)!==local) return [];
 const fmt=new Intl.DateTimeFormat('en-CA',{timeZone:zone,year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',hourCycle:'h23'});
 const results:Date[]=[];
 for(let offset=-14*60;offset<=14*60;offset+=15){
  const instant=new Date(raw.getTime()-offset*60000);
  const p=Object.fromEntries(fmt.formatToParts(instant).map(x=>[x.type,x.value]));
  if(`${p.year}-${p.month}-${p.day}T${p.hour}:${p.minute}`===local) results.push(instant);
 }
 return results.sort((a,b)=>a.getTime()-b.getTime());
}
export function indiaTime(date:Date):string {
 return new Intl.DateTimeFormat('en-IN',{timeZone:'Asia/Kolkata',weekday:'short',day:'numeric',month:'short',year:'numeric',hour:'numeric',minute:'2-digit',hour12:true}).format(date)+' IST';
}
export function enquiryText(values:{name:string;city:string;goal:string;notes:string}):string {
 return ['Hello Neelam, I would like to enquire about online Hindi lessons.',values.name?`My name: ${values.name}`:'',`City / time zone: ${values.city}`,`Learning focus: ${values.goal}`,values.notes?`A little more: ${values.notes}`:'','Please let me know about suitability, lesson format, fees and available times.'].filter(Boolean).join('\n');
}
