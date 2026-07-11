// Native operating system cursor is used. No custom cursor follower.

// LOADER
window.addEventListener('load',()=>setTimeout(()=>document.getElementById('loader').classList.add('done'),1400));

// SCROLL PROGRESS
window.addEventListener('scroll',()=>{
  document.getElementById('spfill').style.width=(window.scrollY/(document.documentElement.scrollHeight-window.innerHeight)*100)+'%';
},{passive:true});
// top-nav: always visible (60: hide on scroll removed per user intent)

// TABS
const pages={};document.querySelectorAll('.page').forEach(p=>pages[p.id.replace('page-','')]=p);
const tabs=document.querySelectorAll('.h-tab[data-page]');
function go(id){
  Object.values(pages).forEach(p=>p.classList.remove('active'));
  tabs.forEach(t=>t.classList.remove('active'));
  if(pages[id]){pages[id].classList.add('active');window.scrollTo(0,0);}
  tabs.forEach(t=>{if(t.dataset.page===id)t.classList.add('active');});
  reveal();
}
tabs.forEach(t=>t.addEventListener('click',()=>go(t.dataset.page)));
document.getElementById('logoHome').addEventListener('click',()=>go('home'));
document.querySelectorAll('[data-nav]').forEach(el=>el.addEventListener('click',()=>go(el.dataset.nav)));

// REVEAL
function reveal(){
  setTimeout(()=>{
    document.querySelectorAll('.page.active .rv:not(.on)').forEach(el=>{
      if(el.getBoundingClientRect().top<window.innerHeight*.92)el.classList.add('on');
    });
  },40);
}
window.addEventListener('scroll',reveal,{passive:true});
reveal();

// LIGHTBOX
const lb=document.getElementById('lb'),lbImg=document.getElementById('lbImg'),lbCap=document.getElementById('lbCap'),lbCtr=document.getElementById('lbCtr');
let items=[],idx=0;
document.addEventListener('click',e=>{
  const t=e.target.closest('.lb-t');if(!t)return;
  const g=t.dataset.group||'all';
  items=Array.from(document.querySelectorAll('.page.active .lb-t[data-group="'+g+'"]'));
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
