// CURSOR
const cdot=document.getElementById('cdot'),cring=document.getElementById('cring');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;cdot.style.left=mx+'px';cdot.style.top=my+'px';});
(function ar(){rx+=(mx-rx)*.1;ry+=(my-ry)*.1;cring.style.left=rx+'px';cring.style.top=ry+'px';requestAnimationFrame(ar);})();

// LOADER
window.addEventListener('load',()=>setTimeout(()=>document.getElementById('loader').classList.add('done'),1400));

// SCROLL PROGRESS
window.addEventListener('scroll',()=>{
  document.getElementById('spfill').style.width=(window.scrollY/(document.documentElement.scrollHeight-window.innerHeight)*100)+'%';
},{passive:true});
let lastY=0;const nav=document.getElementById('topNav');
window.addEventListener('scroll',()=>{const y=window.scrollY;nav.classList.toggle('hide',y>lastY&&y>100);lastY=y;},{passive:true});

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
document.getElementById('lbClose').addEventListener('click',()=>lb.classList.remove('open'));
document.getElementById('lbPrev').addEventListener('click',()=>{idx=(idx-1+items.length)%items.length;show();});
document.getElementById('lbNext').addEventListener('click',()=>{idx=(idx+1)%items.length;show();});
document.addEventListener('keydown',e=>{
  if(!lb.classList.contains('open'))return;
  if(e.key==='Escape')lb.classList.remove('open');
  if(e.key==='ArrowLeft'){idx=(idx-1+items.length)%items.length;show();}
  if(e.key==='ArrowRight'){idx=(idx+1)%items.length;show();}
});
lb.addEventListener('click',e=>{if(e.target===lb)lb.classList.remove('open');});