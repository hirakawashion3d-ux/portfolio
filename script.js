// Native operating system cursor is used. No custom cursor follower.

// LOADER
window.addEventListener('load',()=>setTimeout(()=>document.getElementById('loader').classList.add('done'),1400));

// SCROLL PROGRESS
window.addEventListener('scroll',()=>{
  document.getElementById('spfill').style.width=(window.scrollY/(document.documentElement.scrollHeight-window.innerHeight)*100)+'%';
},{passive:true});
// top-nav: always visible (60: hide on scroll removed per user intent)

// CONTINUOUS PORTFOLIO NAVIGATION
// Every section stays in the document so recruiters can read the work in one scroll.
const pages={};document.querySelectorAll('.page').forEach(p=>pages[p.id.replace('page-','')]=p);
const tabs=document.querySelectorAll('.h-tab[data-page]');
function go(id){
  const target=pages[id];if(!target)return;
  target.scrollIntoView({behavior:'smooth',block:'start'});
}
tabs.forEach(t=>t.addEventListener('click',()=>go(t.dataset.page)));
document.getElementById('logoHome').addEventListener('click',()=>go('home'));
document.querySelectorAll('[data-nav]').forEach(el=>el.addEventListener('click',()=>go(el.dataset.nav)));

// REVEAL
// Each item is observed independently, preventing lower Work entries from
// remaining transparent after navigation or a direct page load.
const revealObserver=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){entry.target.classList.add('on');revealObserver.unobserve(entry.target);}
  });
},{rootMargin:'0px 0px -8% 0px',threshold:.01});
document.querySelectorAll('.rv').forEach(item=>revealObserver.observe(item));

function updateActiveTab(){
  const marker=window.innerHeight*.35;
  let current='home';
  Object.entries(pages).forEach(([id,page])=>{if(page.getBoundingClientRect().top<=marker)current=id;});
  tabs.forEach(tab=>tab.classList.toggle('active',tab.dataset.page===current));
}
window.addEventListener('scroll',updateActiveTab,{passive:true});
updateActiveTab();

// LIGHTBOX
const lb=document.getElementById('lb'),lbImg=document.getElementById('lbImg'),lbCap=document.getElementById('lbCap'),lbCtr=document.getElementById('lbCtr');
let items=[],idx=0;
document.addEventListener('click',e=>{
  const t=e.target.closest('.lb-t');if(!t)return;
  const g=t.dataset.group||'all';
  items=Array.from(document.querySelectorAll('.lb-t[data-group="'+g+'"]'));
  idx=items.indexOf(t);show();
});
function show(){
  const el=items[idx];const i=el.querySelector('img');
  lbImg.src=i?i.src:'';lbImg.alt=el.dataset.cap||'';
  lbCap.textContent=el.dataset.cap||'';lbCtr.textContent=(idx+1)+' / '+items.length;
  lb.classList.add('open');
}
function closeLb(){lb.classList.remove('open');}
document.getElementById('lbClose').addEventListener('click',closeLb);
document.getElementById('lbPrev').addEventListener('click',e=>{e.stopPropagation();idx=(idx-1+items.length)%items.length;show();});
document.getElementById('lbNext').addEventListener('click',e=>{e.stopPropagation();idx=(idx+1)%items.length;show();});
lb.addEventListener('click',e=>{if(e.target===lb||e.target===lb.querySelector('.lb-inner'))closeLb();});
document.querySelector('.lb-inner').addEventListener('click',e=>{if(e.target===document.querySelector('.lb-inner'))closeLb();});
document.addEventListener('keydown',e=>{
  if(!lb.classList.contains('open'))return;
  if(e.key==='Escape')closeLb();
  if(e.key==='ArrowLeft'){idx=(idx-1+items.length)%items.length;show();}
  if(e.key==='ArrowRight'){idx=(idx+1)%items.length;show();}
});
