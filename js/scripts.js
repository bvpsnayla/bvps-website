// ─── ANIMATIONS ───
document.addEventListener('DOMContentLoaded', function() {
  const animElements = document.querySelectorAll('.fu, .fade-up');
  animElements.forEach(el => {
    el.style.animationPlayState = 'running';
  });
});

/* =========================================================
   SHARE MENU
   ========================================================= */

function toggleShareMenu() {

    const menu = document.getElementById(
        "socialShareMenu"
    );

    if (!menu) return;

    menu.classList.toggle("active");
}


/* =========================================================
   CLOSE SHARE MENU
   ========================================================= */

function closeShareMenu() {

    const menu = document.getElementById(
        "socialShareMenu"
    );

    if (menu) {
        menu.classList.remove("active");
    }
}


/* =========================================================
   SHARE LINKS
   ========================================================= */

function updateShareLinks() {
    const pageURL = window.location.href;

    const shareText =
        `${currentPhotoTitle} - Bal Vikas Senior Secondary School, Nayla`;

    const telegram = document.getElementById("telegramShare");

    if (telegram) {
        telegram.href =
            "https://t.me/share/url?url=" +
            encodeURIComponent(pageURL) +
            "&text=" +
            encodeURIComponent(shareText);
    }

    const facebook = document.getElementById("facebookShare");

    if (facebook) {
        facebook.href =
            "https://www.facebook.com/sharer/sharer.php?u=" +
            encodeURIComponent(pageURL);
    }

    const twitter = document.getElementById("twitterShare");

    if (twitter) {
        twitter.href =
            "https://twitter.com/intent/tweet?url=" +
            encodeURIComponent(pageURL) +
            "&text=" +
            encodeURIComponent(shareText);
    }
}


/* =========================================================
   WHATSAPP SHARE
   ========================================================= */

function shareWhatsApp() {

    const pageURL = window.location.href;

    const shareText =
        `${currentPhotoTitle}

Bal Vikas Senior Secondary School
Nayla, Jaipur

🌐 View this photo:
${pageURL}`;

    const whatsappURL =
        "https://wa.me/?text=" +
        encodeURIComponent(shareText);

    window.open(
        whatsappURL,
        "_blank"
    );
}


/* =========================================================
   SYSTEM SHARE
   ========================================================= */

async function systemSharePhoto() {

    const pageURL = window.location.href;

    const shareData = {

        title: currentPhotoTitle,

        text:
            `${currentPhotoTitle} - Bal Vikas Senior Secondary School`,

        url: pageURL
    };

    if (!navigator.share) {

        alert(
            "Is browser mein system sharing available nahi hai."
        );

        return;
    }

    try {

        await navigator.share(shareData);

        closeShareMenu();

    } catch (error) {

        console.log(
            "Share cancelled:",
            error
        );

    }
}


/* =========================================================
   BUTTON EVENTS
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const shareBtn =
            document.getElementById("shareBtn");

        if (shareBtn) {

            shareBtn.addEventListener(
                "click",
                toggleShareMenu
            );
        }


        const whatsappBtn =
            document.getElementById("whatsappBtn");

        if (whatsappBtn) {

            whatsappBtn.addEventListener(
                "click",
                shareWhatsApp
            );
        }


        const systemShare =
            document.getElementById("systemShare");

        if (systemShare) {

            systemShare.addEventListener(
                "click",
                systemSharePhoto
            );
        }

    }
);

// ─── INDEPENDENCE DAY 2026 GALLERY ───
document.addEventListener('DOMContentLoaded', function () {
  const galleryGrid = document.querySelector('#gGrid');

  if (!galleryGrid) return;

  const folder = 'assets/images/independence-day-2026/';
  const missingPhotos = new Set([2, 10, 31]);

  for (let photoNumber = 1; photoNumber <= 113; photoNumber++) {
    if (missingPhotos.has(photoNumber)) continue;

    const imagePath = `${folder}15-aug-2026 (${photoNumber}).JPG`;

    const card = document.createElement('div');
    card.className = 'g-item';
    card.dataset.gcat = 'Events';

    card.innerHTML = `
      <img src="${imagePath}"
           alt="Independence Day Celebration 2026 - Photo ${photoNumber}"
           loading="lazy">

      <div class="g-overlay">
        <div class="g-caption">
          <h4>Independence Day Celebration 2026</h4>
          <span><i class="fas fa-calendar"></i>15 August 2026</span>
        </div>
      </div>

      <div class="g-cat gc-ev">Events</div>
      <div class="g-zoom"><i class="fas fa-search-plus"></i></div>
    `;

    card.addEventListener('click', function () {
      openLightbox(
        imagePath,
        `Independence Day Celebration 2026 - Photo ${photoNumber}`,
        'Events'
      );
    });

    galleryGrid.appendChild(card);
  }
});

/* =========================================================
   BVPS PHOTO LIGHTBOX + DOWNLOAD + SHARE
   ========================================================= */

let currentPhotoURL = "";
let currentPhotoTitle = "";
let currentPhotoCategory = "";


/* =========================================================
   OPEN LIGHTBOX
   ========================================================= */

function openLightbox(imageURL, title, category) {

    const lightbox = document.getElementById("photoLightbox");
    const image = document.getElementById("lbImage");
    const titleEl = document.getElementById("lbTitle");
    const categoryEl = document.getElementById("lbCategory");

    if (!lightbox || !image) {
        console.error("Photo Lightbox HTML not found.");
        return;
    }

    currentPhotoURL = imageURL;
    currentPhotoTitle = title || "Bal Vikas Senior Secondary School";
    currentPhotoCategory = category || "Gallery";

    image.src = imageURL;

    titleEl.textContent = currentPhotoTitle;
    categoryEl.textContent = currentPhotoCategory;

    lightbox.classList.add("show");

    document.body.style.overflow = "hidden";

    updateShareLinks();
}


/* =========================================================
   CLOSE LIGHTBOX
   ========================================================= */

function closeLightbox() {

    const lightbox =
        document.getElementById("photoLightbox");

    if (!lightbox) return;

    lightbox.classList.remove("show");

    document.body.style.overflow = "";

    closeShareMenu();
}


/* =========================================================
   CLOSE BUTTON
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const closeBtn =
        document.getElementById("lbClose");

    if (closeBtn) {
        closeBtn.addEventListener(
            "click",
            closeLightbox
        );
    }


    /* Close by clicking background */

    const lightbox =
        document.getElementById("photoLightbox");

    if (lightbox) {

        lightbox.addEventListener(
            "click",
            function (e) {

                if (e.target === lightbox) {
                    closeLightbox();
                }

            }
        );
    }


    /* ESC */

    document.addEventListener(
        "keydown",
        function (e) {

            if (e.key === "Escape") {
                closeLightbox();
            }

        }
    );


    /* =====================================================
       DOWNLOAD BUTTON
       ===================================================== */

    const downloadBtn =
        document.getElementById("downloadBtn");

    if (downloadBtn) {

        downloadBtn.addEventListener(
            "click",
            downloadPhoto
        );

    }


    /* =====================================================
       SHARE BUTTON
       ===================================================== */

    const shareBtn =
        document.getElementById("shareBtn");

    if (shareBtn) {

        shareBtn.addEventListener(
            "click",
            toggleShareMenu
        );

    }


    /* =====================================================
       WHATSAPP
       ===================================================== */

    const whatsappBtn =
        document.getElementById("whatsappBtn");

    if (whatsappBtn) {

        whatsappBtn.addEventListener(
            "click",
            shareWhatsApp
        );

    }


    /* =====================================================
       SYSTEM SHARE
       ===================================================== */

    const systemShare =
        document.getElementById("systemShare");

    if (systemShare) {

        systemShare.addEventListener(
            "click",
            systemSharePhoto
        );

    }

});


/* =========================================================
   DOWNLOAD PHOTO
   ========================================================= */

async function downloadPhoto() {

    if (!currentPhotoURL) return;

    try {

        const response =
            await fetch(currentPhotoURL);

        const blob =
            await response.blob();

        /*
         * IMPORTANT:
         * Browser cannot reliably add a watermark
         * to an image using a simple download link.
         *
         * Therefore canvas is used.
         */

        const img = new Image();

        img.onload = function () {

            const canvas =
                document.createElement("canvas");

            const ctx =
                canvas.getContext("2d");

            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;

            /* Original image */

            ctx.drawImage(
                img,
                0,
                0
            );


            /* Watermark */

            const fontSize =
                Math.max(
                    24,
                    Math.floor(
                        canvas.width * 0.025
                    )
                );

            ctx.font =
                `600 ${fontSize}px Arial`;

            ctx.fillStyle =
                "rgba(255,255,255,0.65)";

            ctx.textAlign = "right";

            ctx.textBaseline = "bottom";

            ctx.shadowColor =
                "rgba(0,0,0,0.5)";

            ctx.shadowBlur = 4;

            ctx.fillText(
                "Bal Vikas Senior Secondary School | bvpsnayla.in",
                canvas.width - 30,
                canvas.height - 25
            );


            canvas.toBlob(
                function (watermarkedBlob) {

                    const url =
                        URL.createObjectURL(
                            watermarkedBlob
                        );

                    const a =
                        document.createElement("a");

                    a.href = url;

                    a.download =
                        "BVPS-" +
                        currentPhotoTitle
                            .replace(/[^a-z0-9]/gi, "-")
                            .toLowerCase() +
                        ".jpg";

                    document.body.appendChild(a);

                    a.click();

                    a.remove();

                    URL.revokeObjectURL(url);

                },
                "image/jpeg",
                0.92
            );

        };


        /*
         * Needed when images are hosted on another domain.
         * Your GitHub/local assets should normally be same-origin.
         */

        img.src =
            URL.createObjectURL(blob);

    }

    catch (error) {

        console.error(
            "Download failed:",
            error
        );

        alert(
            "Photo download nahi ho pa raha. Please try again."
        );

    }

}


/* =========================================================
   PHOTO SHARE
   ========================================================= */

async function sharePhotoImage() {

    if (!currentPhotoURL) {
        alert("Photo available nahi hai.");
        return;
    }

    try {

        // Current photo fetch karo
        const response = await fetch(currentPhotoURL);

        if (!response.ok) {
            throw new Error("Photo fetch failed");
        }

        const blob = await response.blob();

        // Image file create karo
        const file = new File(
            [blob],
            "BVPS-Photo.jpg",
            {
                type: blob.type || "image/jpeg"
            }
        );

        // Browser actual image sharing support karta hai?
        if (
            navigator.share &&
            navigator.canShare &&
            navigator.canShare({ files: [file] })
        ) {

            await navigator.share({
                files: [file]
            });

            closeShareMenu();
            return;
        }

        // Agar image sharing supported nahi hai
        alert(
            "Is browser mein direct photo sharing available nahi hai. " +
            "Mobile Chrome/Android par try karein."
        );

    } catch (error) {

        if (error.name !== "AbortError") {

            console.error(
                "Photo sharing failed:",
                error
            );

            alert(
                "Photo share nahi ho pa rahi. Please try again."
            );
        }
    }
}


/* =========================================================
   SHARE MENU
   ========================================================= */

function toggleShareMenu() {

    const menu =
        document.getElementById("socialShareMenu");

    if (!menu) return;

    menu.classList.toggle("active");
}


function closeShareMenu() {

    const menu =
        document.getElementById("socialShareMenu");

    if (menu) {
        menu.classList.remove("active");
    }
}


/* =========================================================
   SHARE BUTTON EVENTS
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const shareBtn =
        document.getElementById("shareBtn");

    if (shareBtn) {

        shareBtn.addEventListener(
            "click",
            toggleShareMenu
        );
    }


    const systemShare =
        document.getElementById("systemShare");

    if (systemShare) {

        systemShare.addEventListener(
            "click",
            sharePhotoImage
        );
    }

});


/* =========================================================
   CLOSE SHARE MENU
   ========================================================= */

function closeShareMenu() {

    const menu =
        document.getElementById(
            "socialShareMenu"
        );

    if (menu) {
        menu.classList.remove("active");
    }

}


/* =========================================================
   SHARE LINKS
   ========================================================= */

function updateShareLinks() {

    const pageURL =
        window.location.href;

    const shareText =
        `${currentPhotoTitle} - Bal Vikas Senior Secondary School\n${pageURL}`;


    /* Telegram */

    const telegram =
        document.getElementById(
            "telegramShare"
        );

    if (telegram) {

        telegram.href =
            "https://t.me/share/url?url=" +
            encodeURIComponent(pageURL) +
            "&text=" +
            encodeURIComponent(
                currentPhotoTitle +
                " - Bal Vikas Senior Secondary School"
            );

    }


    /* Facebook */

    const facebook =
        document.getElementById(
            "facebookShare"
        );

    if (facebook) {

        facebook.href =
            "https://www.facebook.com/sharer/sharer.php?u=" +
            encodeURIComponent(pageURL);

    }


    /* X / Twitter */

    const twitter =
        document.getElementById(
            "twitterShare"
        );

    if (twitter) {

        twitter.href =
            "https://twitter.com/intent/tweet?url=" +
            encodeURIComponent(pageURL) +
            "&text=" +
            encodeURIComponent(
                currentPhotoTitle
            );

    }

}


/* =========================================================
   WHATSAPP SHARE
   ========================================================= */

async function sharePhoto() {

    if (!currentPhotoURL) return;

    const pageURL = window.location.href;

    const shareText =
        `${currentPhotoTitle}

Bal Vikas Senior Secondary School
Nayla, Jaipur

🌐 View this photo:
${pageURL}`;


    try {

        // Photo fetch करो
        const response = await fetch(currentPhotoURL);

        const blob = await response.blob();

        // File बनाओ
        const file = new File(
            [blob],
            "BVPS-Photo.jpg",
            {
                type: blob.type || "image/jpeg"
            }
        );


        // Check करो browser image sharing support करता है या नहीं
        if (
            navigator.share &&
            navigator.canShare &&
            navigator.canShare({
                files: [file]
            })
        ) {

            await navigator.share({

                title: currentPhotoTitle,

                text: shareText,

                url: pageURL,

                files: [file]

            });

            return;
        }


        // अगर image sharing support नहीं है
        if (navigator.share) {

            await navigator.share({

                title: currentPhotoTitle,

                text: shareText,

                url: pageURL

            });

            return;
        }


        // पुराने browser के लिए WhatsApp fallback

        const whatsappURL =
            "https://wa.me/?text=" +
            encodeURIComponent(shareText);

        window.open(
            whatsappURL,
            "_blank"
        );

    }

    catch (error) {

        console.log(
            "Share cancelled or failed:",
            error
        );

    }
}


/* =========================================================
   SHARE PHOTO — IMAGE ONLY
   Supports JPG, JPEG, PNG, WEBP, GIF, AVIF, BMP, SVG, TIFF...
   ========================================================= */

async function sharePhotoImage() {

    if (!currentPhotoURL) {
        alert("Photo available nahi hai.");
        return;
    }

    // Web Share API available?
    if (!navigator.share || !navigator.canShare) {
        alert(
            "Is browser mein photo sharing supported nahi hai. " +
            "Mobile Chrome/Android par try karein."
        );
        return;
    }

    try {

        /* -------------------------------------------------
           1. Original photo fetch
        ------------------------------------------------- */

        const response =
            await fetch(currentPhotoURL);

        if (!response.ok) {
            throw new Error("Photo fetch failed");
        }

        const blob =
            await response.blob();


        /* -------------------------------------------------
           2. Detect image MIME type
        ------------------------------------------------- */

        let mimeType = blob.type;

        if (!mimeType || !mimeType.startsWith("image/")) {

            const extension =
                currentPhotoURL
                    .split("?")[0]
                    .split("#")[0]
                    .split(".")
                    .pop()
                    .toLowerCase();

            const mimeTypes = {

                jpg: "image/jpeg",
                jpeg: "image/jpeg",
                jfif: "image/jpeg",
                pjpeg: "image/jpeg",

                png: "image/png",

                gif: "image/gif",

                webp: "image/webp",

                avif: "image/avif",

                bmp: "image/bmp",

                svg: "image/svg+xml",

                svgz: "image/svg+xml",

                ico: "image/x-icon",

                tif: "image/tiff",
                tiff: "image/tiff"

            };

            mimeType =
                mimeTypes[extension] ||
                "image/jpeg";
        }


        /* -------------------------------------------------
           3. Get correct file extension
        ------------------------------------------------- */

        const extensionMap = {

            "image/jpeg": "jpg",
            "image/png": "png",
            "image/gif": "gif",
            "image/webp": "webp",
            "image/avif": "avif",
            "image/bmp": "bmp",
            "image/svg+xml": "svg",
            "image/x-icon": "ico",
            "image/tiff": "tiff"

        };

        const extension =
            extensionMap[mimeType] || "jpg";


        /* -------------------------------------------------
           4. Create actual image File
        ------------------------------------------------- */

        const file =
            new File(
                [blob],
                `BVPS-Photo.${extension}`,
                {
                    type: mimeType
                }
            );


        /* -------------------------------------------------
           5. Check whether THIS file can be shared
        ------------------------------------------------- */

        if (
            !navigator.canShare({
                files: [file]
            })
        ) {

            alert(
                "Is device/browser mein " +
                mimeType +
                " image sharing supported nahi hai."
            );

            return;
        }


        /* -------------------------------------------------
           6. SHARE ONLY IMAGE
           
           No:
           ❌ text
           ❌ URL
           ❌ title
           
           Only:
           ✅ image file
        ------------------------------------------------- */

        await navigator.share({

            files: [file]

        });


        /* -------------------------------------------------
           7. Close menu after successful share
        ------------------------------------------------- */

        closeShareMenu();


    } catch (error) {

        /* User cancelled sharing */

        if (error.name === "AbortError") {
            return;
        }


        console.error(
            "Image sharing failed:",
            error
        );


        alert(
            "Photo share nahi ho pa rahi. Please try again."
        );
    }
}


// ─── FACULTY PROFILE MODAL ───
function openProfile(card) {
  const name = card.getAttribute('data-name');
  const role = card.getAttribute('data-role');
  const subject = card.getAttribute('data-subject');
  const qual = card.getAttribute('data-qual');
  const exp = card.getAttribute('data-exp');
  const spec = card.getAttribute('data-spec');
  const ach = card.getAttribute('data-ach');
  const email = card.getAttribute('data-email');
  
  const overlay = document.querySelector('.modal-overlay') || createProfileModal();
  const modal = overlay.querySelector('.profile-modal');
  
  modal.querySelector('.modal-name').textContent = name;
  modal.querySelector('.modal-role').textContent = role;
  
  const detailGrid = modal.querySelector('.detail-grid');
  detailGrid.innerHTML = `
    <div class="detail-item">
      <div class="di-label"><i class="fas fa-briefcase"></i>Position</div>
      <div class="di-value">${role}</div>
    </div>
    <div class="detail-item">
      <div class="di-label"><i class="fas fa-book"></i>Subject</div>
      <div class="di-value">${subject || 'N/A'}</div>
    </div>
    <div class="detail-item">
      <div class="di-label"><i class="fas fa-graduation-cap"></i>Qualification</div>
      <div class="di-value">${qual || 'N/A'}</div>
    </div>
    <div class="detail-item">
      <div class="di-label"><i class="fas fa-clock"></i>Experience</div>
      <div class="di-value">${exp || 'N/A'}</div>
    </div>
    <div class="detail-item detail-full">
      <div class="di-label"><i class="fas fa-star"></i>Specialization</div>
      <div class="di-value">${spec || 'N/A'}</div>
    </div>
    <div class="detail-item detail-full">
      <div class="di-label"><i class="fas fa-award"></i>Achievements</div>
      <div class="achievement-tags">
        ${ach ? ach.split(',').map(a => `<span class="ach-tag">${a.trim()}</span>`).join('') : 'N/A'}
      </div>
    </div>
  `;
  
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeProfile() {
  const overlay = document.querySelector('.modal-overlay');
  if (overlay) {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function createProfileModal() {
  const html = `
    <div class="modal-overlay">
      <div class="profile-modal">
        <div class="modal-close" onclick="closeProfile()"><i class="fas fa-times"></i></div>
        <div class="modal-header-bg"></div>
        <div class="modal-body-content">
          <div class="modal-photo">
            <div class="photo-placeholder"><i class="fas fa-user"></i></div>
          </div>
          <h2 class="modal-name"></h2>
          <div class="modal-role"></div>
          <div class="modal-divider"></div>
          <div class="detail-grid"></div>
        </div>
      </div>
    </div>
  `;
  
  const div = document.createElement('div');
  div.innerHTML = html;
  document.body.appendChild(div.firstElementChild);
  
  document.querySelector('.modal-overlay').addEventListener('click', function(e) {
    if (e.target === this) closeProfile();
  });
  
  return document.querySelector('.modal-overlay');
}

// ─── CLICK OUTSIDE TO CLOSE ───
document.addEventListener('click', function(e) {
  const overlay = document.querySelector('.modal-overlay');
  if (overlay && overlay.classList.contains('active') && e.target === overlay) {
    closeProfile();
  }
  
  const lightbox = document.querySelector('.lb-backdrop');
  if (lightbox && lightbox.classList.contains('open') && e.target === lightbox) {
    closeLightbox();
  }
});

// ─── KEYBOARD CLOSE ───
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeLightbox();
    closeProfile();
  }
});

// ─── TOGGLE ANIMATION ON SCROLL ───
document.addEventListener('DOMContentLoaded', function() {
  const animElements = document.querySelectorAll('.fu, .fade-up');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
      }
    });
  }, { threshold: 0.1 });
  
  animElements.forEach(el => observer.observe(el));
});

// ─── NAVBAR ACTIVE STATE ───
document.addEventListener('DOMContentLoaded', function() {
  const links = document.querySelectorAll('.main-nav .nav-link');
  const currentPath = window.location.pathname;
  
  links.forEach(link => {
    const href = link.getAttribute('href');
    if (currentPath.includes(href) && href !== '/') {
      link.classList.add('active');
    } else if (href === '/' && currentPath === '/') {
      link.classList.add('active');
    }
  });
});

// ─── SMOOTH SCROLL ───
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#') {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
});
