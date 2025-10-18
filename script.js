
const galleryData = [
    {
        id: 1,
        title: 'Mountain Peak',
        category: 'nature',
        image: "./Mountain Peak.jpg"
    },
    {
        id: 2,
        title: 'Forest Path',
        category: 'nature',
        image: './Forest Path.jpg'
    },
    {
        id: 3,
        title: 'City Lights',
        category: 'urban',
        image:'./City Lights.jpeg'
    },
    {
        id: 4,
        title: 'Urban Architecture',
        category: 'urban',
        image: './Urban Architecture.jpeg'
    },
    {
        id: 5,
        title: 'Portrait Study',
        category: 'portrait',
        image: './Portrait Study.jpeg'
    },
    {
        id: 6,
        title: 'Ocean Waves',
        category: 'nature',
        image: './Ocean Waves.jpeg'
    },
    {
        id: 7,
        title: 'Street Photography',
        category: 'urban',
        image: './Street Photography.jpeg'
    },
    {
        id: 8,
        title: 'Portrait Elegance',
        category: 'portrait',
        image: './Portrait Elegance.jpeg'
    },
    {
        id: 9,
        title: 'Sunset Valley',
        category: 'nature',
        image: './Sunset Valley.jpeg'
    }
];

let currentFilter = 'all';
let currentLightboxIndex = 0;
let filteredImages = [...galleryData];

const galleryGrid = document.getElementById('galleryGrid');
const filterBtns = document.querySelectorAll('.filter-btn');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxTitle = document.getElementById('lightboxTitle');
const closeLightbox = document.getElementById('closeLightbox');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const currentIndexSpan = document.getElementById('currentIndex');
const totalImagesSpan = document.getElementById('totalImages');

function renderGallery(images) {
    galleryGrid.innerHTML = '';
    
    images.forEach((image, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.innerHTML = `
            <img src="${image.image}" alt="${image.title}" class="gallery-item-image">
            <div class="gallery-item-overlay">
                <div class="gallery-item-info">
                    <p class="gallery-item-title">${image.title}</p>
                    <p class="gallery-item-category">${image.category}</p>
                </div>
            </div>
        `;
        
        galleryItem.addEventListener('click', () => openLightbox(index));
        galleryGrid.appendChild(galleryItem);
    });
}


filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        
        currentFilter = btn.dataset.filter;
        if (currentFilter === 'all') {
            filteredImages = [...galleryData];
        } else {
            filteredImages = galleryData.filter(img => img.category === currentFilter);
        }
        
    
        renderGallery(filteredImages);
    });
});

function openLightbox(index) {
    currentLightboxIndex = index;
    updateLightbox();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightboxModal() {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function updateLightbox() {
    const image = filteredImages[currentLightboxIndex];
    lightboxImage.src = image.image;
    lightboxTitle.textContent = image.title;
    currentIndexSpan.textContent = currentLightboxIndex + 1;
    totalImagesSpan.textContent = filteredImages.length;
}

function nextImage() {
    currentLightboxIndex = (currentLightboxIndex + 1) % filteredImages.length;
    updateLightbox();
}

function prevImage() {
    currentLightboxIndex = (currentLightboxIndex - 1 + filteredImages.length) % filteredImages.length;
    updateLightbox();
}


closeLightbox.addEventListener('click', closeLightboxModal);
nextBtn.addEventListener('click', nextImage);
prevBtn.addEventListener('click', prevImage);


lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightboxModal();
    }
});


document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
    if (e.key === 'Escape') closeLightboxModal();
});

renderGallery(filteredImages);