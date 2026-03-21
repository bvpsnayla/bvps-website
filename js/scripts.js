// ─── ANIMATIONS ───
document.addEventListener('DOMContentLoaded', function() {
  const animElements = document.querySelectorAll('.fu, .fade-up');
  animElements.forEach(el => {
    el.style.animationPlayState = 'running';
  });
});

// ─── GALLERY FILTER ───
function filterGal(category, button) {
  const items = document.querySelectorAll('#gGrid .g-item');
  
  items.forEach(item => {
    if (category === 'all' || item.getAttribute('data-gcat') === category) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
  
  // Update button states
  const buttons = document.querySelectorAll('.gfbtn');
  buttons.forEach(btn => btn.classList.remove('active'));
  button.classList.add('active');
}

// ─── LIGHTBOX ───
function openLightbox(imgSrc, caption, category) {
  const backdrop = document.querySelector('.lb-backdrop') || createLightbox();
  const img = backdrop.querySelector('.lb-inner img');
  const title = backdrop.querySelector('.lb-info h4');
  
  img.src = imgSrc;
  img.alt = caption;
  title.textContent = caption;
  
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

function createLightbox() {
  const html = `
    <div class="lb-backdrop">
      <div class="lb-inner">
        <img src="" alt="">
        <div class="lb-info">
          <h4></h4>
          <span></span>
        </div>
        <div class="lb-close" onclick="closeLightbox()"></div>
        <div class="lb-nav lb-prev" onclick="prevImage()"></div>
        <div class="lb-nav lb-next" onclick="nextImage()"></div>
      </div>
    </div>
  `;
  
  const div = document.createElement('div');
  div.innerHTML = html;
  document.body.appendChild(div.firstElementChild);
  
  return document.querySelector('.lb-backdrop');
}

// ─── NEWS FILTER ───
function filterNews(category, button) {
  const items = document.querySelectorAll('#newsGrid .n-item');
  
  items.forEach(item => {
    if (category === 'all' || item.getAttribute('data-cat') === category) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
  
  // Update button states
  const buttons = document.querySelectorAll('.fbtn');
  buttons.forEach(btn => btn.classList.remove('active'));
  button.classList.add('active');
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
