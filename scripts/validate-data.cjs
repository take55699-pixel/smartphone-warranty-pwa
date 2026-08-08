const fs=require('fs');
const vm=require('vm');

function fail(msg){ console.error(`VALIDATION ERROR: ${msg}`); process.exit(1); }
function assert(cond,msg){ if(!cond) fail(msg); }

const context={window:{}};
vm.createContext(context);
for(const file of ['data.js','extra-data.js']){
  const src=fs.readFileSync(file,'utf8');
  new vm.Script(src,{filename:file}).runInContext(context);
}
const rows=context.window.WARRANTY_DATA;
assert(Array.isArray(rows),'WARRANTY_DATA must be an array');
assert(rows.length===26,`expected 26 entries, got ${rows.length}`);

const required=['type','status','byod','brand','reception','service','monthly','cost','coverage','bring','theft','join','note','links'];
const types=new Set(['MNO','オンライン/サブ','MVNO','保険会社']);
const statuses=new Set(['受付中','一部受付中','新規受付終了','自動付帯','既存回線のみ','提供終了','月額補償なし']);
const byodValues=new Set(['yes','conditional','no']);
const brands=new Set();

for(const [i,x] of rows.entries()){
  for(const k of required) assert(Object.prototype.hasOwnProperty.call(x,k),`${i}: missing ${k}`);
  assert(!brands.has(x.brand),`duplicate brand: ${x.brand}`); brands.add(x.brand);
  assert(types.has(x.type),`${x.brand}: invalid type ${x.type}`);
  assert(statuses.has(x.status),`${x.brand}: invalid status ${x.status}`);
  assert(byodValues.has(x.byod),`${x.brand}: invalid byod ${x.byod}`);
  assert(Array.isArray(x.links)&&x.links.length>0,`${x.brand}: no official link`);
  for(const l of x.links){
    assert(l&&typeof l.href==='string'&&l.href.startsWith('https://'),`${x.brand}: non-HTTPS link`);
    assert(typeof l.name==='string'&&l.name.trim(),`${x.brand}: link without name`);
  }
}

const get=b=>rows.find(x=>x.brand===b)||fail(`missing audited entry: ${b}`);
assert(get('イオンモバイル MVNO').byod==='yes','AEON bring-your-own warranty regression');
assert(get('イオンモバイル MVNO').service.includes('持ちこみ保証'),'AEON carry-in service missing');
assert(get('povo 2.0 オンライン/サブ').cost.includes('11,000')&&get('povo 2.0 オンライン/サブ').cost.includes('22,000'),'povo exchange burden regression');
assert(get('楽天モバイル MNO').service.includes('Rakuten認定中古iPhone'),'Rakuten Certified coverage regression');
assert(get('NifMo MVNO').monthly.includes('550円'),'NifMo monthly fee regression');
assert(get('NifMo MVNO').cost.includes('38,500'),'NifMo tax-inclusive exchange fee regression');
assert(get('さくら少額短期保険 保険会社').theft.includes('紛失・置き忘れ：×'),'Sakura loss exclusion regression');
assert(get('J:COM MOBILE MVNO').byod==='no','J:COM carrier row must not inherit independent insurance BYOD');
assert(get('J:COM MOBILE MVNO').cost.includes('Pixel 8a'),'J:COM Pixel 8a exception regression');
assert(get('ジェイコム少額短期保険 保険会社').byod==='yes','J:COM insurance BYOD regression');
assert(get('ジェイコム少額短期保険 保険会社').service==='家族のスマホ保険','J:COM insurance separation regression');

const index=fs.readFileSync('index.html','utf8');
assert(index.includes('./data.js')&&index.includes('./extra-data.js'),'index must load both data files');
const sw=fs.readFileSync('sw.js','utf8');
assert(sw.includes("'./extra-data.js'"),'service worker must cache extra-data.js');

console.log(`OK: ${rows.length} unique entries validated`);
