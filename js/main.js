/**
 * Mercedes-Benz CLC 350 - Interactive Gallery & Lightbox Controller
 */

// Gallery item database
const galleryData = [
  {
    id: 1,
    base: 'DSC_0275',
    category: 'exterior',
    categoryLabel: 'Exterior',
    title: 'Vista Frontal Directa',
    desc: 'Parrilla deportiva con estrella central cromada, ópticas con lupa proyector y faros antiniebla.',
    isFeatured: true
  },
  {
    id: 2,
    base: 'DSC_0276',
    category: 'exterior',
    categoryLabel: 'Exterior',
    title: 'Perspectiva Frontal 3/4',
    desc: 'Silueta deportiva coupé, paragolpes con tomas aerodinámicas y llantas oscurecidas.',
    isFeatured: true
  },
  {
    id: 3,
    base: 'DSC_0277',
    category: 'exterior',
    categoryLabel: 'Exterior',
    title: 'Perfil Lateral Completo',
    desc: 'Línea de cintura ascendente, cristales con tonalizado suave y despeje deportivo.',
    isFeatured: true
  },
  {
    id: 4,
    base: 'DSC_0278',
    category: 'exterior',
    categoryLabel: 'Exterior',
    title: 'Trasera 3/4 Izquierda',
    desc: 'Ópticas traseras envolventes, alerón sutil en portón y salida de escape cromada.',
    isFeatured: true
  },
  {
    id: 5,
    base: 'DSC_0279',
    category: 'exterior',
    categoryLabel: 'Exterior',
    title: 'Vista Trasera Central',
    desc: 'Insignia CLC 350, luna trasera deportiva y difusor inferior aerodinámico.',
    isFeatured: false
  },
  {
    id: 6,
    base: 'DSC_0280',
    category: 'exterior',
    categoryLabel: 'Exterior',
    title: 'Trasera 3/4 Derecha',
    desc: 'Diseño musculoso del pilar C característico del Sport Coupé de Mercedes-Benz.',
    isFeatured: false
  },
  {
    id: 7,
    base: 'DSC_0281',
    category: 'exterior',
    categoryLabel: 'Exterior',
    title: 'Frontal en Ángulo Bajo',
    desc: 'Postura baja agresiva y ópticas de alta definición con proyectores elipsoidales.',
    isFeatured: false
  },
  {
    id: 8,
    base: 'DSC_0282',
    category: 'detalles',
    categoryLabel: 'Detalles',
    title: 'Alineación de Carrocería & Espejo',
    desc: 'Pintura plata metalizada en estado sobresaliente, espejo con luz de giro integrada.',
    isFeatured: false
  },
  {
    id: 9,
    base: 'DSC_0283',
    category: 'interior',
    categoryLabel: 'Interior',
    title: 'Butacas Deportivas Cuero Bitono',
    desc: 'Tapicería original en cuero negro con centros marfil en impecable estado de conservación.',
    isFeatured: true
  },
  {
    id: 10,
    base: 'DSC_0284',
    category: 'detalles',
    categoryLabel: 'Detalles & Instrumental',
    title: 'Cuadro de Instrumentos (Odómetro)',
    desc: 'Kilometraje real certificado: 216.156 km. Indicador de marchas PRND y computadora digital.',
    isFeatured: true
  },
  {
    id: 11,
    base: 'DSC_0285',
    category: 'interior',
    categoryLabel: 'Interior',
    title: 'Cockpit y Puesto de Conducción',
    desc: 'Volante deportivo multifunción en cuero, consola central ergonómica y selector 7G-TRONIC.',
    isFeatured: true
  },
  {
    id: 12,
    base: 'DSC_0286',
    category: 'interior',
    categoryLabel: 'Interior',
    title: 'Habitáculo Completo',
    desc: 'Panorámica de butacas delanteras y traseras. Excelente mantenimiento del interior.',
    isFeatured: false
  },
  {
    id: 13,
    base: 'DSC_0287',
    category: 'detalles',
    categoryLabel: 'Detalles & Techo',
    title: 'Techo Solar Panorámico de Cristal',
    desc: 'Techo panorámico corredizo eléctrico que aporta luminosidad a todo el interior.',
    isFeatured: true
  },
  {
    id: 14,
    base: 'DSC_0288',
    category: 'interior',
    categoryLabel: 'Interior',
    title: 'Consola y Detalle Acompañante',
    desc: 'Molduras en aluminio cepillado, toberas circulares y alfombrillas de la versión Evolution.',
    isFeatured: false
  },
  {
    id: 15,
    base: 'DSC_0289',
    category: 'interior',
    categoryLabel: 'Interior',
    title: 'Plazas Traseras Anatómicas',
    desc: 'Dos butacas individuales traseras tipo baquet con apoyabrazos y apoyacabezas retráctiles.',
    isFeatured: false
  }
];

// Helper to get image filepaths
function getImagePaths(item) {
  return {
    thumb: `assets/images/thumbs/${item.base}.webp`,
    large: `assets/images/large/${item.base}.webp`,
    orig: `assets/images/large/${item.base}.webp`
  };
}

// State
let currentFilter = 'all';
let currentLightboxIndex = 0;
let currentLightboxList = [...galleryData];
let touchStartX = 0;
let touchEndX = 0;

// DOM Elements
const galleryGrid = document.getElementById('galleryGrid');
const filterButtons = document.querySelectorAll('.filter-btn');
const lightboxModal = document.getElementById('lightboxModal');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxTitle = document.getElementById('lightboxTitle');
const lightboxDesc = document.getElementById('lightboxDesc');
const lightboxCounter = document.getElementById('lightboxCounter');
const lightboxOrigLinkTop = document.getElementById('lightboxOrigLinkTop');
const lightboxOrigLinkBottom = document.getElementById('lightboxOrigLinkBottom');
const lightboxCloseBtn = document.getElementById('lightboxCloseBtn');
const lightboxPrevBtn = document.getElementById('lightboxPrevBtn');
const lightboxNextBtn = document.getElementById('lightboxNextBtn');
const btnCopyPhone = document.getElementById('btnCopyPhone');
const copyToast = document.getElementById('copyToast');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');

// Render Gallery Cards
function renderGallery(filter = 'all') {
  currentFilter = filter;
  const filtered = filter === 'all' 
    ? galleryData 
    : galleryData.filter(item => item.category === filter);

  currentLightboxList = filtered;

  galleryGrid.innerHTML = '';

  filtered.forEach((item, index) => {
    const paths = getImagePaths(item);
    const card = document.createElement('div');
    card.className = 'gallery-card';
    card.setAttribute('data-category', item.category);
    card.setAttribute('data-id', item.id);
    card.tabIndex = 0;

    card.innerHTML = `
      <img src="${paths.thumb}" alt="${item.title}" loading="lazy" width="600" height="400" />
      <div class="gallery-card-overlay">
        <div class="gallery-tag-row">
          <span class="gallery-category">${item.categoryLabel}</span>
          <svg class="gallery-zoom-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            <line x1="11" y1="8" x2="11" y2="14"></line>
            <line x1="8" y1="11" x2="14" y2="11"></line>
          </svg>
        </div>
        <h4 class="gallery-title">${item.title}</h4>
        <p class="gallery-desc">${item.desc}</p>
      </div>
    `;

    card.addEventListener('click', () => {
      openLightbox(index);
    });

    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(index);
      }
    });

    galleryGrid.appendChild(card);
  });
}

// Lightbox Open & Update
function openLightbox(index) {
  if (index < 0 || index >= currentLightboxList.length) return;
  currentLightboxIndex = index;
  updateLightbox();
  lightboxModal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightboxModal.classList.remove('active');
  document.body.style.overflow = '';
}

function updateLightbox() {
  const item = currentLightboxList[currentLightboxIndex];
  if (!item) return;

  const paths = getImagePaths(item);

  // Set image and data
  lightboxImg.src = paths.large;
  lightboxImg.alt = item.title;
  lightboxTitle.textContent = item.title;
  lightboxDesc.textContent = item.desc;
  lightboxCounter.textContent = `${currentLightboxIndex + 1} / ${currentLightboxList.length}`;
  if (lightboxOrigLinkTop) lightboxOrigLinkTop.href = paths.orig;
  if (lightboxOrigLinkBottom) lightboxOrigLinkBottom.href = paths.orig;

  // Preload next image for buttery smoothness
  const nextIdx = (currentLightboxIndex + 1) % currentLightboxList.length;
  const nextPaths = getImagePaths(currentLightboxList[nextIdx]);
  const preloader = new Image();
  preloader.src = nextPaths.large;
}

function prevLightbox() {
  currentLightboxIndex = (currentLightboxIndex - 1 + currentLightboxList.length) % currentLightboxList.length;
  updateLightbox();
}

function nextLightbox() {
  currentLightboxIndex = (currentLightboxIndex + 1) % currentLightboxList.length;
  updateLightbox();
}

// Handle Touch Swipes for Mobile Lightbox
lightboxModal.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

lightboxModal.addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
}, { passive: true });

function handleSwipe() {
  const diff = touchEndX - touchStartX;
  if (Math.abs(diff) > 45) {
    if (diff > 0) {
      prevLightbox();
    } else {
      nextLightbox();
    }
  }
}

// Lightbox Event Listeners
lightboxCloseBtn.addEventListener('click', closeLightbox);
lightboxPrevBtn.addEventListener('click', prevLightbox);
lightboxNextBtn.addEventListener('click', nextLightbox);

// Close on backdrop click
lightboxModal.addEventListener('click', (e) => {
  if (e.target === lightboxModal || e.target.classList.contains('lightbox-body') || e.target.classList.contains('lightbox-img-wrap')) {
    closeLightbox();
  }
});

// Keyboard controls
document.addEventListener('keydown', (e) => {
  if (!lightboxModal.classList.contains('active')) return;

  if (e.key === 'Escape') {
    closeLightbox();
  } else if (e.key === 'ArrowLeft') {
    prevLightbox();
  } else if (e.key === 'ArrowRight') {
    nextLightbox();
  }
});

// Filter Buttons
filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.getAttribute('data-filter');
    renderGallery(filter);
  });
});

// Copy Phone Number Functionality
if (btnCopyPhone) {
  btnCopyPhone.addEventListener('click', () => {
    const phoneNumber = '+5491137664460';
    const displayPhone = '11 3766-4460';

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(phoneNumber).then(() => {
        showCopyToast('¡Número copiado: ' + displayPhone + '!');
      }).catch(() => {
        fallbackCopy(phoneNumber);
      });
    } else {
      fallbackCopy(phoneNumber);
    }
  });
}

function fallbackCopy(text) {
  const tempInput = document.createElement('input');
  tempInput.value = text;
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand('copy');
  document.body.removeChild(tempInput);
  showCopyToast('¡Número copiado: 11 3766-4460!');
}

function showCopyToast(msg) {
  if (!copyToast) return;
  copyToast.textContent = msg;
  copyToast.classList.add('show');
  setTimeout(() => {
    copyToast.classList.remove('show');
  }, 2500);
}

// Mobile Menu Toggle
if (mobileMenuBtn && navLinks) {
  mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('mobile-open');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('mobile-open');
    });
  });
}

// Hero Thumbnails Quick Click
document.querySelectorAll('.hero-thumb-item').forEach(thumb => {
  thumb.addEventListener('click', () => {
    const targetBase = thumb.getAttribute('data-base');
    const targetIdx = currentLightboxList.findIndex(item => item.base === targetBase);
    if (targetIdx !== -1) {
      openLightbox(targetIdx);
    } else {
      // Find index in full galleryData
      const fullIdx = galleryData.findIndex(item => item.base === targetBase);
      if (fullIdx !== -1) {
        currentLightboxList = [...galleryData];
        openLightbox(fullIdx);
      }
    }
  });
});

// Main Hero Image Click
const heroMainCard = document.getElementById('heroMainCard');
if (heroMainCard) {
  heroMainCard.addEventListener('click', () => {
    currentLightboxList = [...galleryData];
    openLightbox(0);
  });
}

// Navbar Shadow on Scroll
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (navbar) {
    if (window.scrollY > 30) {
      navbar.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.6)';
    } else {
      navbar.style.boxShadow = 'none';
    }
  }
});

// Initialize gallery on page load
document.addEventListener('DOMContentLoaded', () => {
  renderGallery('all');
});

