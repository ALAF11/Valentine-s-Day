// ─── MENU TOGGLE ───
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const menuOverlay = document.getElementById('menuOverlay');

function toggleMenu() {
  const isOpen = mobileMenu.classList.contains('open');
  menuToggle.classList.toggle('active');
  mobileMenu.classList.toggle('open');
  menuOverlay.classList.toggle('visible');
  document.body.style.overflow = isOpen ? '' : 'hidden';
}

menuToggle.addEventListener('click', toggleMenu);
menuOverlay.addEventListener('click', toggleMenu);

// ─── NAVIGATION ───
function navigateTo(page) {
  if (mobileMenu.classList.contains('open')) {
    toggleMenu();
  }

  // Hide all pages
  document.getElementById('page-home').style.display = 'none';
  document.querySelectorAll('.page-section').forEach(s => s.classList.remove('active'));

  // Show target page
  if (page === 'home') {
    document.getElementById('page-home').style.display = 'block';
  } else {
    const target = document.getElementById('page-' + page);
    if (target) target.classList.add('active');
  }

  // Update active nav link
  document.querySelectorAll('.mobile-menu a').forEach(a => {
    a.classList.toggle('active', a.dataset.page === page);
  });

  window.scrollTo(0, 0);
}

// ─── CTA SMOOTH SCROLL ───
document.getElementById('ctaScroll').addEventListener('click', function(e) {
  e.preventDefault();
  const timerSection = document.getElementById('timer-section');
  if (timerSection) {
    timerSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
});

// ─── LOVE TIMER ───
// Start date: December 7, 2025 at 15:00 (Portugal time)
const LOVE_START = new Date('2025-12-07T15:00:00');

function updateTimer() {
  const now = new Date();
  const diff = now - LOVE_START;

  if (diff < 0) return;

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const daysEl = document.getElementById('timer-days');
  const hoursEl = document.getElementById('timer-hours');
  const minutesEl = document.getElementById('timer-minutes');
  const secondsEl = document.getElementById('timer-seconds');

  if (daysEl) daysEl.textContent = days;
  if (hoursEl) hoursEl.textContent = hours;
  if (minutesEl) minutesEl.textContent = minutes;
  if (secondsEl) secondsEl.textContent = seconds;
}

updateTimer();
setInterval(updateTimer, 1000);

// ─── FLOATING HEARTS ───
function createFloatingHeart() {
  const container = document.getElementById('floatingHearts');
  if (!container) return;

  const heart = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  heart.setAttribute('viewBox', '0 0 24 24');
  heart.classList.add('floating-heart');

  const size = Math.random() * 20 + 12;
  heart.style.width = size + 'px';
  heart.style.height = size + 'px';
  heart.style.left = Math.random() * 100 + '%';
  heart.style.bottom = '-30px';

  const duration = Math.random() * 8 + 8;
  heart.style.animationDuration = duration + 's';
  heart.style.animationDelay = Math.random() * 2 + 's';

  const colors = ['#FFB6C8', '#FDDDE6', '#FF69B4', '#FFD1DC', '#FFC0CB'];
  const color = colors[Math.floor(Math.random() * colors.length)];

  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', 'M12 21S2 14 2 8.5C2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09A6.04 6.04 0 0116.5 3C19.58 3 22 5.42 22 8.5 22 14 12 21 12 21z');
  path.setAttribute('fill', color);

  heart.appendChild(path);
  container.appendChild(heart);

  setTimeout(() => heart.remove(), (duration + 2) * 1000);
}

setInterval(createFloatingHeart, 2500);
for (let i = 0; i < 5; i++) {
  setTimeout(createFloatingHeart, i * 600);
}

// ─── SCROLL REVEAL FOR CARDS ───
function revealCards() {
  const cards = document.querySelectorAll('.reason-card, .timeline-card, .memory-card');
  cards.forEach((card, index) => {
    const rect = card.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (rect.top < windowHeight * 0.88) {
      setTimeout(() => {
        card.classList.add('visible');
      }, index * 100);
    }
  });
}

window.addEventListener('scroll', revealCards, { passive: true });
window.addEventListener('load', revealCards);

// ─── VALENTINE CTA ───

// ─── MEMORY MODAL ───
function openMemory(card) {
  const modal = document.getElementById('memoryModal');
  const imgDiv = card.querySelector('.memory-img');
  const imgTag = imgDiv.querySelector('img');

  if (imgTag) {
    document.getElementById('modalImg').style.backgroundImage = `url('${imgTag.src}')`;
  } else {
    document.getElementById('modalImg').style.background = imgDiv.style.background;
  }
  document.getElementById('modalImg').style.backgroundSize = 'cover';
  document.getElementById('modalImg').style.backgroundPosition = 'center';

  const date = card.querySelector('.memory-date').textContent.trim();
  const name = card.querySelector('.memory-name').textContent;
  const desc = card.querySelector('.memory-desc').textContent;

  document.getElementById('modalDate').textContent = date;
  document.getElementById('modalName').textContent = name;
  document.getElementById('modalDesc').textContent = desc;

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeMemory() {
  const modal = document.getElementById('memoryModal');
  modal.classList.remove('open');
  document.body.style.overflow = '';
}

// ─── ADD MEMORY ───
let uploadedPhotoData = null;

function openAddMemory() {
  document.getElementById('addMemoryModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeAddMemory() {
  document.getElementById('addMemoryModal').classList.remove('open');
  document.body.style.overflow = '';
  resetAddMemoryForm();
}

function resetAddMemoryForm() {
  document.getElementById('photoInput').value = '';
  document.getElementById('photoPreview').style.display = 'none';
  document.getElementById('uploadPlaceholder').style.display = 'flex';
  document.getElementById('memoryDateInput').value = '';
  document.getElementById('memoryTitleInput').value = '';
  document.getElementById('memoryDescInput').value = '';
  uploadedPhotoData = null;
}

// Photo upload handler
document.addEventListener('DOMContentLoaded', function() {
  const photoInput = document.getElementById('photoInput');
  if (photoInput) {
    photoInput.addEventListener('change', function(e) {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function(ev) {
          uploadedPhotoData = ev.target.result;
          const preview = document.getElementById('photoPreview');
          preview.src = uploadedPhotoData;
          preview.style.display = 'block';
          document.getElementById('uploadPlaceholder').style.display = 'none';
        };
        reader.readAsDataURL(file);
      }
    });
  }
});

function saveMemory() {
  const date = document.getElementById('memoryDateInput').value.trim();
  const title = document.getElementById('memoryTitleInput').value.trim();
  const desc = document.getElementById('memoryDescInput').value.trim();

  if (!title) {
    document.getElementById('memoryTitleInput').style.borderColor = '#DC143C';
    setTimeout(() => document.getElementById('memoryTitleInput').style.borderColor = '', 1500);
    return;
  }

  // Build new memory card
  const gallery = document.querySelector('.memories-gallery');
  const addBtn = gallery.querySelector('.add-memory-btn');

  const card = document.createElement('div');
  card.className = 'memory-card visible';
  card.setAttribute('onclick', 'openMemory(this)');

  const imgContent = uploadedPhotoData
    ? `<img src="${uploadedPhotoData}" alt="Memory">`
    : '';

  const fallbackStyle = uploadedPhotoData
    ? ''
    : 'style="background: linear-gradient(135deg, #FDDDE6 0%, #FFF0F3 100%); min-height: 180px;"';

  card.innerHTML = `
    <div class="memory-img" ${fallbackStyle}>${imgContent}</div>
    <div class="memory-info" style="display:none;">
      <div class="memory-date"><span>⭐</span> ${date || 'A special day'}</div>
      <h3 class="memory-name">${title}</h3>
      <p class="memory-desc">${desc || 'A beautiful memory together.'}</p>
    </div>
  `;

  gallery.insertBefore(card, addBtn);

  closeAddMemory();
}
document.getElementById('valentineCta').addEventListener('click', function(e) {
  e.preventDefault();

  // Create full-screen reveal overlay
  const reveal = document.createElement('div');
  reveal.className = 'valentine-reveal';
  reveal.innerHTML = `
    <div class="reveal-content">
      <h2 class="reveal-quote">No matter where life takes us, my heart will always find its way back to you.</h2>
      <svg class="reveal-heart" viewBox="0 0 64 64" fill="none">
        <path d="M32 56S6 38 6 19C6 10.72 12.72 4 21 4c4.96 0 9.36 2.42 12.08 6.14A16.95 16.95 0 0144 4C52.28 4 59 10.72 59 19 59 38 32 56 32 56z" fill="white"/>
      </svg>
      <p class="reveal-tagline">Forever. Always. You.</p>
    </div>
  `;
  document.body.appendChild(reveal);

  // Trigger animation
  requestAnimationFrame(() => {
    reveal.classList.add('visible');
  });

  // Close on tap
  reveal.addEventListener('click', function() {
    reveal.classList.remove('visible');
    setTimeout(() => reveal.remove(), 500);
  });
});