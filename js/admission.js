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
  apiKey: "",
  authDomain: "bvps-web-app.firebaseapp.com",
  projectId: "bvps-web-app",
  storageBucket: "bvps-web-app.firebasestorage.app",
  messagingSenderId: "686596817462",
  appId: ""
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

  /* =========================================================
   BVPS QUICK ENQUIRY FORM
   Google Apps Script Backend
========================================================= */

const scriptURL =
  "https://script.google.com/macros/s/AKfycbxcGIOMamV2EO1aXlC3S-5ozrfnjgs-NGZd3yNxSMRAlbVZn7A1Q2xg6MIyJnTAZrY7/exec";


const qBtn = document.getElementById("qBtn");

if (qBtn) {

  qBtn.addEventListener("click", async function () {

    const studentName =
      document.getElementById("studentName").value.trim();

    const fatherName =
      document.getElementById("fatherName").value.trim();

    const classApplied =
      document.getElementById("classApplied").value;

    const mobile =
      document.getElementById("mobile").value.trim();

    const message =
      document.getElementById("message").value.trim();

    const status =
      document.getElementById("formStatus");


    /* Validation */

    if (!studentName || !fatherName || !classApplied || !mobile) {

      status.style.color = "#dc2626";
      status.textContent =
        "Please fill all required fields.";

      return;
    }


    /* Mobile validation */

    const cleanMobile =
      mobile.replace(/\D/g, "");

    if (!/^[0-9]{10}$/.test(cleanMobile)) {

      status.style.color = "#dc2626";
      status.textContent =
        "Please enter a valid 10 digit mobile number.";

      return;
    }


    /* Loading */

    qBtn.disabled = true;

    qBtn.innerHTML =
      '<i class="fas fa-spinner fa-spin"></i> Sending...';

    status.style.color = "#2563eb";
    status.textContent =
      "Please wait...";


    /* Data */

    const data = {

      studentName: studentName,

      fatherName: fatherName,

      classApplied: classApplied,

      mobile: cleanMobile,

      message: message

    };


    try {

      const formData = new URLSearchParams();

formData.append("studentName", studentName);
formData.append("fatherName", fatherName);
formData.append("classApplied", classApplied);
formData.append("mobile", cleanMobile);
formData.append("message", message);

const response = await fetch(scriptURL, {
  method: "POST",
  body: formData
});

      const result = await response.json();


      if (result.result === "success") {

        status.style.color = "#16a34a";

        status.textContent =
          "✓ Enquiry submitted successfully! We will contact you soon.";


        /* Clear form */

        document.getElementById("studentName").value = "";

        document.getElementById("fatherName").value = "";

        document.getElementById("classApplied").selectedIndex = 0;

        document.getElementById("mobile").value = "";

        document.getElementById("message").value = "";


      } else {
    console.log("Google Apps Script response:", result);

    status.style.color = "#dc2626";
    status.textContent =
      "Submission failed: " + (result.message || "Unknown error");
}


    } catch (error) {

      console.error(error);

      status.style.color = "#dc2626";

      status.textContent =
        "Something went wrong. Please try again.";

    }


    /* Reset button */

    qBtn.disabled = false;

    qBtn.innerHTML =
      '<i class="fas fa-paper-plane"></i> Send Enquiry';

  });

}

});

const mobileInput = document.getElementById("mobile");

if (mobileInput) {
    mobileInput.addEventListener("input", function () {
        this.value = this.value.replace(/[^0-9]/g, "").slice(0, 10);
    });

    mobileInput.addEventListener("keydown", function (e) {
        // केवल digits + जरूरी control keys
        if (
            !/[0-9]/.test(e.key) &&
            !["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab", "Home", "End"].includes(e.key)
        ) {
            e.preventDefault();
        }
    });
}