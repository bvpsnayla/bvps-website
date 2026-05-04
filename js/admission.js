/* ================================================================
   BVPS — Bal Vikas Senior Secondary School
   admission.js  |  Admissions Page JavaScript
   ================================================================ */

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

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, addDoc, collection } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyB4lKzImQCbBBew884TdVRMNX05oZq_U84",
  authDomain: "bvps-web-app.firebaseapp.com",
  projectId: "bvps-web-app",
  storageBucket: "bvps-web-app.firebasestorage.app",
  messagingSenderId: "686596817462",
  appId: "1:686596817462:web:ce55286d301d024b30ce97"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.addEventListener("DOMContentLoaded", () => {

  // =====================
  // 🔵 FULL ADMISSION FORM
  // =====================
  const admissionForm = document.getElementById("admissionForm");

  if (admissionForm) {
    admissionForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const mobile = admissionForm.mobile.value.replace(/\D/g, "").slice(0, 10);

      if (mobile.length !== 10) {
        alert("Enter valid mobile number");
        return;
      }

      const data = {
        student_name: admissionForm.student_name.value,
        father_name: admissionForm.father_name.value,
        mobile: mobile,
        class_apply: admissionForm.class_apply.value,
        createdAt: new Date()
      };

      const btn = document.getElementById("finalBtn");
      if (btn) {
        btn.disabled = true;
        btn.innerHTML = "Submitting...";
      }

      try {
        await addDoc(collection(db, "admissions"), data);

        alert("Admission Form Submitted ✅");
        admissionForm.reset();

      } catch (err) {
        alert("Error: " + err.message);
      }

      if (btn) {
        btn.disabled = false;
        btn.innerHTML = "Submit";
      }
    });
  }

  // =====================
  // 🟢 QUICK ENQUIRY FORM
  // =====================
  const qBtn = document.getElementById("qBtn");

  if (qBtn) {
    qBtn.addEventListener("click", async (e) => {
      e.preventDefault();

      const box = document.getElementById("enquiryForm");

      const inputs = box.querySelectorAll("input");
      const select = box.querySelector("select");
      const textarea = box.querySelector("textarea");

      const mobile = inputs[2].value.replace(/\D/g, "").slice(0, 10);

      if (!inputs[0].value || !inputs[1].value || !select.value || mobile.length !== 10) {
        alert("Fill all required fields correctly");
        return;
      }

      const data = {
        studentName: inputs[0].value,
        fatherName: inputs[1].value,
        classApplied: select.value,
        mobile: mobile,
        message: textarea.value,
        createdAt: new Date()
      };

      qBtn.disabled = true;
      qBtn.innerHTML = "Sending...";

      try {
        await addDoc(collection(db, "enquiries"), data);

        alert("Enquiry Submitted ✅");

        inputs.forEach(i => i.value = "");
        select.selectedIndex = 0;
        textarea.value = "";

      } catch (err) {
        alert("Error: " + err.message);
      }

      qBtn.disabled = false;
      qBtn.innerHTML = "Send Enquiry";
    });
  }

});

