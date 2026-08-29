// ─── ANIMATIONS ───
document.addEventListener('DOMContentLoaded', function() {
  const animElements = document.querySelectorAll('.fu, .fade-up');
  animElements.forEach(el => {
    el.style.animationPlayState = 'running';
  });
});

// ─── LIGHTBOX ───
// ─── LIGHTBOX ───
let bvpsActiveImage = '';
let bvpsCurrentIndex = -1;
let bvpsGalleryImages = [];
let bvpsWheelLock = false;

function getVisibleGalleryImages() {
  return Array.from(document.querySelectorAll('#gGrid .g-item'))
    .filter(item => getComputedStyle(item).display !== 'none');
}

function openLightbox(imgSrc) {
  const backdrop = document.querySelector('.lb-backdrop') || createLightbox();

  bvpsGalleryImages = getVisibleGalleryImages();

  bvpsCurrentIndex = bvpsGalleryImages.findIndex(item => {
    const cardImage = item.querySelector('img').getAttribute('src');

    return new URL(cardImage, document.baseURI).href ===
      new URL(imgSrc, document.baseURI).href;
  });

  if (bvpsCurrentIndex < 0) bvpsCurrentIndex = 0;

  showGalleryImage(bvpsCurrentIndex);
  backdrop.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const backdrop = document.querySelector('.lb-backdrop');

  if (backdrop) {
    backdrop.classList.remove('open');
    document.body.style.overflow = '';
  }
}

function nextImage() {
  if (bvpsGalleryImages.length < 2) return;

  bvpsCurrentIndex = (bvpsCurrentIndex + 1) % bvpsGalleryImages.length;
  showGalleryImage(bvpsCurrentIndex);
}

function prevImage() {
  if (bvpsGalleryImages.length < 2) return;

  bvpsCurrentIndex =
    (bvpsCurrentIndex - 1 + bvpsGalleryImages.length) % bvpsGalleryImages.length;

  showGalleryImage(bvpsCurrentIndex);
}

function showGalleryImage(index) {
  const item = bvpsGalleryImages[index];
  if (!item) return;

  const mainImage = item.querySelector('img');
  const imagePath = mainImage.getAttribute('src');
  const caption = item.querySelector('.g-caption h4')?.textContent.trim() || mainImage.alt;
  const category = item.getAttribute('data-gcat') || '';

  const previousIndex =
    (index - 1 + bvpsGalleryImages.length) % bvpsGalleryImages.length;

  const nextIndex = (index + 1) % bvpsGalleryImages.length;

  const previousImage = bvpsGalleryImages[previousIndex]
    .querySelector('img')
    .getAttribute('src');

  const nextImagePath = bvpsGalleryImages[nextIndex]
    .querySelector('img')
    .getAttribute('src');

  const backdrop = document.querySelector('.lb-backdrop');

  bvpsActiveImage = imagePath;

  backdrop.querySelector('.lb-main-image').src = imagePath;
  backdrop.querySelector('.lb-main-image').alt = caption;

  backdrop.querySelector('.lb-preview-prev').src = previousImage;
  backdrop.querySelector('.lb-preview-next').src = nextImagePath;

  backdrop.querySelector('.lb-info h4').textContent = caption;
  backdrop.querySelector('.lb-info span').textContent = category;

  const navigationDisplay = bvpsGalleryImages.length > 1 ? 'flex' : 'none';
  backdrop.querySelector('.lb-prev').style.display = navigationDisplay;
  backdrop.querySelector('.lb-next').style.display = navigationDisplay;
}

function createLightbox() {
  const html = `
    <div class="lb-backdrop">
      <div class="lb-inner">

        <div class="lb-stage">
          <img class="lb-side-preview lb-preview-prev" src="" alt="">
          <img class="lb-main-image" src="" alt="">
          <img class="lb-side-preview lb-preview-next" src="" alt="">

          <button class="lb-download" type="button" aria-label="Download photo">
            <i class="fas fa-download"></i>
            <span>Download</span>
          </button>

          <button class="lb-close" type="button" aria-label="Close photo">
            <i class="fas fa-times"></i>
          </button>

          <button class="lb-nav lb-prev" type="button" aria-label="Previous photo">
            <i class="fas fa-chevron-left"></i>
          </button>

          <button class="lb-nav lb-next" type="button" aria-label="Next photo">
            <i class="fas fa-chevron-right"></i>
          </button>
        </div>

        <div class="lb-info">
          <h4></h4>
          <span></span>
        </div>
      </div>
    </div>
  `;

  const div = document.createElement('div');
  div.innerHTML = html;

  const backdrop = div.firstElementChild;
  const stage = backdrop.querySelector('.lb-stage');
  let touchStartX = 0;

  backdrop.querySelector('.lb-close').addEventListener('click', closeLightbox);
  backdrop.querySelector('.lb-download').addEventListener('click', downloadWatermarkedPhoto);
  backdrop.querySelector('.lb-prev').addEventListener('click', prevImage);
  backdrop.querySelector('.lb-next').addEventListener('click', nextImage);

  /* Mobile swipe */
  stage.addEventListener('pointerdown', function (event) {
    touchStartX = event.clientX;
  });

  stage.addEventListener('pointerup', function (event) {
    const distance = event.clientX - touchStartX;

    if (distance <= -40) nextImage();
    if (distance >= 40) prevImage();
  });

  /* Desktop mouse wheel/scroll */
  stage.addEventListener('wheel', function (event) {
    if (Math.abs(event.deltaY) < 10 || bvpsWheelLock) return;

    event.preventDefault();
    bvpsWheelLock = true;

    if (event.deltaY > 0) {
      nextImage();
    } else {
      prevImage();
    }

    setTimeout(() => {
      bvpsWheelLock = false;
    }, 350);
  }, { passive: false });

  backdrop.addEventListener('click', function (event) {
    if (event.target === backdrop) closeLightbox();
  });

  document.body.appendChild(backdrop);
  return backdrop;
}

function downloadWatermarkedPhoto() {
  if (!bvpsActiveImage) return;

  const originalImage = new Image();
  originalImage.src = bvpsActiveImage;

  originalImage.onload = function () {
    const canvas = document.createElement('canvas');
    canvas.width = originalImage.naturalWidth;
    canvas.height = originalImage.naturalHeight;

    const context = canvas.getContext('2d');
    context.drawImage(originalImage, 0, 0);

    const fontSize = Math.max(24, Math.round(canvas.width * 0.032));
    const padding = Math.round(canvas.width * 0.035);

    context.save();
    context.globalAlpha = 0.62;
    context.fillStyle = '#ffffff';
    context.textAlign = 'right';
    context.textBaseline = 'bottom';

    context.font = `600 ${fontSize}px Arial`;
    context.fillText(
      'Bal Vikas Senior Secondary School, Nayla',
      canvas.width - padding,
      canvas.height - padding - fontSize
    );

    context.font = `500 ${Math.round(fontSize * 0.7)}px Arial`;
    context.fillText(
      '© BVPS Nayla',
      canvas.width - padding,
      canvas.height - padding
    );

    context.restore();

    const link = document.createElement('a');
    const imageName = bvpsActiveImage.split('/').pop().replace(/\.[^/.]+$/, '');

    link.href = canvas.toDataURL('image/jpeg', 0.92);
    link.download = `${imageName}-bvps-nayla.jpg`;
    link.click();
  };

  originalImage.onerror = function () {
    alert('Photo download नहीं हो सकी। कृपया दोबारा कोशिश करें।');
  };
}

document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') closeLightbox();
  if (event.key === 'ArrowRight') nextImage();
  if (event.key === 'ArrowLeft') prevImage();
});

// ─── INDEPENDENCE DAY 2026 GALLERY ───
document.addEventListener('DOMContentLoaded', function () {
  const galleryGrid = document.querySelector('#gGrid');

  if (!galleryGrid) return;

  const folder = 'assets/images/independence-day-2026/';
  const missingPhotos = new Set([2, 10]);

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
