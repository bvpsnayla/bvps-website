/* ================================================================
   BVPS — Bal Vikas Senior Secondary School
   popup.js  |  Admission Popup JavaScript
   ================================================================
   Usage: <script src="popup.js"></script>
   ================================================================ */

(function() {
  var POPUP_KEY   = "bvps_popup_shown";
  var POPUP_DELAY = 5000; // milliseconds

  function showPopup() {
    console.log("Popup Open Function Called");
    var el = document.getElementById("bvpsPopup");
    if (el) el.classList.add("visible");
  }

  function hidePopup() {
    var el = document.getElementById("bvpsPopup");
    if (el) el.classList.remove("visible");
    // Set cookie — 24 ghante ke liye dobara nahi dikhega
    var exp = new Date();
    exp.setTime(exp.getTime() + 24 * 60 * 60 * 1000);
    document.cookie = POPUP_KEY + "=1; expires=" + exp.toUTCString() + "; path=/";
  }

  function getCookie(name) {
    var match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
    return match ? match[2] : null;
  }

  // Close button
  document.getElementById("popupBtn").addEventListener("click", function() {
    // यहाँ अपना Google Maps या जो भी लिंक है उसे डालें
    window.open("https://maps.app.goo.gl/MNDoimf1N1rtmQMp8", "_blank"); 
  });


  // Close button
  document.addEventListener("DOMContentLoaded", function () {

    var closeBtn = document.getElementById("popupClose");
    if (closeBtn) {
        closeBtn.addEventListener("click", hidePopup);
    }

    var overlay = document.getElementById("bvpsPopup");
    if (overlay) {
        overlay.addEventListener("click", function (e) {
            if (e.target === overlay) hidePopup();
        });
    }

    if (!getCookie(POPUP_KEY)) {
        setTimeout(showPopup, POPUP_DELAY);
    }

});

  // Click outside to close
  var overlay = document.getElementById("bvpsPopup");
  if (overlay) {
    overlay.addEventListener("click", function(e) {
      if (e.target === overlay) hidePopup();
    });
  }

  // ESC key to close
  document.addEventListener("keydown", function(e) {
    if (e.key === "Escape") hidePopup();
  });

  // Auto-show after delay (only if not shown in last 24 hours)
  if (!getCookie(POPUP_KEY)) {
    setTimeout(showPopup, POPUP_DELAY);
  }

})();