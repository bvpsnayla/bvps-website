<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/js/bootstrap.bundle.min.js"></script>
<script>
/* ===== Scroll fade-up animations ===== */
var sObs = new IntersectionObserver(function(entries){
  entries.forEach(function(e){
    if(e.isIntersecting){
      e.target.style.animationPlayState='running';
      sObs.unobserve(e.target);
    }
  });
}, {threshold:0.12});
document.querySelectorAll('.fade-up').forEach(function(el){
  el.style.animationPlayState='paused';
  sObs.observe(el);
});

/* ===== Counter animation ===== */
(function(){
  var started = false;
  function animateCounters(){
    if(started) return;
    started = true;
    document.querySelectorAll('.counter').forEach(function(counter){
      var target = parseInt(counter.getAttribute('data-target'));
      var duration = 2000;
      var step = Math.ceil(target / 80);
      var current = 0;
      var timer = setInterval(function(){
        current += step;
        if(current >= target){
          counter.textContent = target;
          clearInterval(timer);
        } else {
          counter.textContent = current;
        }
      }, duration / 80);
    });
  }
  var cObs = new IntersectionObserver(function(entries){
    if(entries[0].isIntersecting){ animateCounters(); cObs.disconnect(); }
  }, {threshold:0.5});
  var target = document.querySelector('.stats-card');
  if(target) cObs.observe(target);
})();

/* ===== Smooth scroll ===== */
document.querySelectorAll('a[href^="#"]').forEach(function(a){
  a.addEventListener('click', function(e){
    var t = document.querySelector(a.getAttribute('href'));
    if(t){ e.preventDefault(); t.scrollIntoView({behavior:'smooth', block:'start'}); }
  });
});

/* ===== Navbar shadow on scroll ===== */
window.addEventListener('scroll', function(){
  var nav = document.querySelector('.main-nav');
  if(window.scrollY > 50){
    nav.style.boxShadow = '0 4px 30px rgba(23,66,86,.15)';
  } else {
    nav.style.boxShadow = '0 2px 20px rgba(23,66,86,.09)';
  }
});
</script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/js/bootstrap.bundle.min.js"></script>
<script>
var _o=new IntersectionObserver(function(e){e.forEach(function(x){if(x.isIntersecting){x.target.style.animationPlayState='running';_o.unobserve(x.target);}});},{threshold:.1});
document.querySelectorAll('.fu').forEach(function(el){_o.observe(el);});
document.querySelectorAll('a[href^="#"]').forEach(function(a){a.addEventListener('click',function(e){var t=document.querySelector(a.getAttribute('href'));if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth',block:'start'});}});});
</script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/js/bootstrap.bundle.min.js"></script>
<script>
var sObs=new IntersectionObserver(function(e){e.forEach(function(en){if(en.isIntersecting){en.target.style.animationPlayState='running';sObs.unobserve(en.target)}})},{threshold:.12});
document.querySelectorAll('.fade-up').forEach(function(el){el.style.animationPlayState='paused';sObs.observe(el)});
document.querySelectorAll('a[href^="#"]').forEach(function(a){a.addEventListener('click',function(e){var t=document.querySelector(a.getAttribute('href'));if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth',block:'start'})}})});
</script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/js/bootstrap.bundle.min.js"></script>
<script>
/* Scroll animations */
var sObs=new IntersectionObserver(function(e){e.forEach(function(en){if(en.isIntersecting){en.target.style.animationPlayState='running';sObs.unobserve(en.target)}})},{threshold:.12});
document.querySelectorAll('.fade-up').forEach(function(el){el.style.animationPlayState='paused';sObs.observe(el)});

/* Smooth scroll */
document.querySelectorAll('a[href^="#"]').forEach(function(a){a.addEventListener('click',function(e){var t=document.querySelector(a.getAttribute('href'));if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth',block:'start'})}})});

/* ===== PROFILE MODAL ===== */
function openProfile(card){
  var o=document.getElementById('profileOverlay');
  document.getElementById('mName').textContent=card.dataset.name||'—';
  document.getElementById('mRole').textContent=card.dataset.role||'—';
  document.getElementById('mSubject').textContent=card.dataset.subject||'—';
  document.getElementById('mQual').textContent=card.dataset.qual||'—';
  document.getElementById('mExp').textContent=card.dataset.exp||'—';
  document.getElementById('mSpec').textContent=card.dataset.spec||'—';

  var achEl=document.getElementById('mAch');
  var achs=card.dataset.ach||'';
  if(achs){
    var parts=achs.split(',');
    var html='<div class="achievement-tags">';
    parts.forEach(function(a){html+='<span class="ach-tag">'+a.trim()+'</span>'});
    html+='</div>';
    achEl.innerHTML=html;
  }else{achEl.textContent='—'}

  var emailW=document.getElementById('mEmailWrap');
  var emailV=document.getElementById('mEmail');
  if(card.dataset.email){emailW.style.display='block';emailV.textContent=card.dataset.email}
  else{emailW.style.display='none'}

  var photoC=document.getElementById('mPhoto');
  if(card.dataset.photo){photoC.innerHTML='<img src="'+card.dataset.photo+'" alt="'+card.dataset.name+'">';}
  else{photoC.innerHTML='<div class="photo-placeholder"><i class="fas fa-user"></i></div>'}

  o.classList.add('active');
  document.body.style.overflow='hidden';
}

function closeProfile(){
  document.getElementById('profileOverlay').classList.remove('active');
  document.body.style.overflow='';
}

function closeProfileOutside(e){
  if(e.target===document.getElementById('profileOverlay')) closeProfile();
}

document.addEventListener('keydown',function(e){if(e.key==='Escape') closeProfile()});
</script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/js/bootstrap.bundle.min.js"></script>
<script>
/* Scroll animations */
var sObs = new IntersectionObserver(function(entries){
  entries.forEach(function(e){ if(e.isIntersecting){ e.target.style.animationPlayState='running'; sObs.unobserve(e.target); } });
}, {threshold:0.12});
document.querySelectorAll('.fade-up').forEach(function(el){ el.style.animationPlayState='paused'; sObs.observe(el); });

/* Smooth scroll */
document.querySelectorAll('a[href^="#"]').forEach(function(a){
  a.addEventListener('click', function(e){
    var t = document.querySelector(a.getAttribute('href'));
    if(t){ e.preventDefault(); t.scrollIntoView({behavior:'smooth', block:'start'}); }
  });
});

/* ===== TOGGLE ===== */
function switchMode(mode) {
  var slider = document.getElementById('tSlider');
  var bOff = document.getElementById('btnOff');
  var bOn = document.getElementById('btnOn');
  var hint = document.getElementById('tHint');
  var offSec = document.getElementById('offlineSection');
  var onSec = document.getElementById('onlineSection');

  if (mode === 'online') {
    slider.classList.add('is-online');
    bOff.classList.remove('active'); bOn.classList.add('active');
    hint.textContent = 'Fill the form below and submit online';
    offSec.style.display = 'none'; onSec.style.display = 'block';
    setTimeout(function(){
      var fw = document.getElementById('oFormWrap');
      if(fw) fw.scrollIntoView({behavior:'smooth', block:'start'});
    }, 220);
  } else {
    slider.classList.remove('is-online');
    bOff.classList.add('active'); bOn.classList.remove('active');
    hint.textContent = 'Visit school office with your documents';
    offSec.style.display = 'block'; onSec.style.display = 'none';
  }
}

/* ===== MULTI-STEP FORM ===== */
var curStep = 1;
var pcts = [20, 40, 60, 80, 100];

function goStep(n) {
  var cur = document.getElementById('sp' + curStep);
  var nxt = document.getElementById('sp' + n);
  if (!cur || !nxt) return;
  cur.classList.remove('active');
  nxt.classList.add('active');
  document.querySelectorAll('.ps').forEach(function(p){
    var sn = parseInt(p.getAttribute('data-s'));
    p.classList.remove('active','done');
    if(sn < n) p.classList.add('done');
    if(sn === n) p.classList.add('active');
  });
  document.getElementById('progFill').style.width = pcts[n-1] + '%';
  curStep = n;
  var fw = document.getElementById('oFormWrap');
  if(fw) setTimeout(function(){ fw.scrollIntoView({behavior:'smooth', block:'start'}); }, 50);
}

/* Special needs toggle */
function toggleSN(el) {
  var txt = document.getElementById('snText');
  if(txt) txt.style.display = (el.value === 'yes') ? 'block' : 'none';
}

/* Photo preview */
function previewPhoto(inp) {
  if(!inp.files || !inp.files[0]) return;
  var fr = new FileReader();
  fr.onload = function(e) {
    var zone = document.getElementById('photoZone');
    var old = zone.querySelector('.pz-preview');
    if(old) old.remove();
    var img = document.createElement('img');
    img.src = e.target.result; img.className = 'pz-preview';
    zone.appendChild(img);
    zone.style.border = '2.5px solid #22c55e';
    var icon = document.getElementById('photoIcon');
    if(icon) icon.style.display = 'none';
  };
  fr.readAsDataURL(inp.files[0]);
}

/* Mark doc uploaded */
function markDoc(stId, inp) {
  if(!inp.files || !inp.files.length) return;
  var el = document.getElementById(stId);
  var nm = inp.files[0].name;
  if(nm.length > 18) nm = nm.substring(0,16) + '...';
  el.innerHTML = '<i class="fas fa-check-circle"></i> ' + nm;
  el.classList.add('done');
}

/* Submit */
function submitApp() {

  var c1 = document.getElementById('dc1');
  var c2 = document.getElementById('dc2');

  if (!c1.checked || !c2.checked) {
    alert("Please accept declaration.");
    return;
  }

  var btn = document.getElementById("finalBtn");
  btn.disabled = true;
  btn.innerHTML = "Uploading...";

  var form = document.getElementById("admissionForm");
  var formData = new FormData(form);

  fetch("https://script.google.com/macros/s/AKfycbzKbIY3Ld81MVEfhexfQF-GRXz0cpCx05fnlTEMcQQOJuPwvqYxXFQZwrGTt3VUIYHv/exec", {
    method: "POST",
    body: formData
  })
  .then(res => res.json())
  .then(response => {

    btn.style.display = "none";

    document.getElementById("successBox").style.display = "block";
    document.getElementById("refNum").textContent = response.admission_id;

    form.style.display = "none";

  })
  .catch(err => {
    alert("Upload Failed");
    btn.disabled = false;
    btn.innerHTML = "Submit Application";
  });
}
/* Quick enquiry */
var qb = document.getElementById('qBtn');
if(qb) {
  qb.addEventListener('click', function(e){
    e.preventDefault();
    qb.innerHTML = '<i class="fas fa-check-circle"></i> Enquiry Sent! We\'ll contact you soon.';
    qb.style.background = 'linear-gradient(135deg,#16a34a,#22c55e)';
    setTimeout(function(){
      qb.innerHTML = '<i class="fas fa-paper-plane"></i> Send Enquiry';
      qb.style.background = '';
    }, 4000);
  });
}
</script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/js/bootstrap.bundle.min.js"></script>
<script>
var _o=new IntersectionObserver(function(e){e.forEach(function(x){if(x.isIntersecting){x.target.style.animationPlayState='running';_o.unobserve(x.target);}});},{threshold:.1});
document.querySelectorAll('.fu').forEach(function(el){_o.observe(el);});
document.querySelectorAll('a[href^="#"]').forEach(function(a){a.addEventListener('click',function(e){var t=document.querySelector(a.getAttribute('href'));if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth',block:'start'});}});});
</script>
<script>
function filterNews(cat,btn){
  document.querySelectorAll('.fbtn').forEach(function(b){b.classList.remove('active');});
  btn.classList.add('active');
  document.querySelectorAll('.n-item').forEach(function(item){
    if(cat==='all'||item.dataset.cat===cat){
      item.style.display='';
      item.style.animation='none';
      setTimeout(function(){item.style.animation='fu .4s ease forwards';},10);
    }else{item.style.display='none';}
  });
}
</script>

