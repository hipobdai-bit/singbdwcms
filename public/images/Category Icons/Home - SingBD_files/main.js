// Main JavaScript file for SingBD website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate On Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 100
        });
    }
    
    // Initialize all components
    initMobileMenu();
    initContactForms();
    initProductFilters();
    initSmoothScrolling();

    initAboutImageSlider();
    initAboutFeaturesTabs();
    initWhatWeDoTabs();
    initProductCategories();
    initProductsPage();
    initQuickView();
    initAnimations();
    initHeroMapPoints();
    initPartnerSlider();
    
    // Initialize products page functionality (if needed)
    // initProductsPageCategorySwitching(); // Removed - now using separate pages
    
    // Initialize product detail modals for category pages
    initProductDetailModals();
});

// Mobile Menu Toggle
function initMobileMenu() {
    const mobileToggle = document.querySelector('.nav__mobile-toggle');
    const navMenu = document.querySelector('.nav__menu');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('nav__menu--active');
            mobileToggle.classList.toggle('nav__mobile-toggle--active');
        });
    }
    
    // Mobile dropdown functionality - only for mobile menu toggle, not for dropdown behavior
    // Dropdown should work on hover for both desktop and mobile
    const dropdownItems = document.querySelectorAll('.nav__item--dropdown');
    dropdownItems.forEach(item => {
        const link = item.querySelector('.nav__link');
        if (link) {
            // Remove click prevention - let the link work normally
            link.addEventListener('click', function(e) {
                // Only prevent default if we're in mobile menu and want to toggle dropdown
                // But for Products link, we want it to go to products page
                if (window.innerWidth <= 768 && this.textContent.trim() !== 'Products') {
                    e.preventDefault();
                    e.stopPropagation();
                    item.classList.toggle('active');
                }
                // For Products link, let it navigate normally
            });
        }
    });
}

// About Section Image Slider
function initAboutImageSlider() {
    const imageTrack = document.querySelector('.about__image-track');
    const slides = document.querySelectorAll('.about__image-slide');
    const prevBtn = document.querySelector('.about__image-control--prev');
    const nextBtn = document.querySelector('.about__image-control--next');
    const indicators = document.querySelectorAll('.about__indicator');
    
    if (!imageTrack || slides.length === 0) return;
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    let autoSlideInterval;
    
    function updateSlider() {
        const translateX = -currentSlide * 100;
        imageTrack.style.transform = `translateX(${translateX}%)`;
        
        // Update indicators
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('about__indicator--active', index === currentSlide);
        });
        
        // Update button states (optional - remove disabled state for infinite loop)
        if (prevBtn) prevBtn.disabled = false;
        if (nextBtn) nextBtn.disabled = false;
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides; // Loop back to first slide
        updateSlider();
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides; // Loop to last slide
        updateSlider();
    }
    
    function goToSlide(slideIndex) {
        currentSlide = slideIndex;
        updateSlider();
    }
    
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 4000); // 4 seconds
    }
    
    function stopAutoSlide() {
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
        }
    }
    
    // Event listeners
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            stopAutoSlide();
            startAutoSlide(); // Restart auto-slide
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            stopAutoSlide();
            startAutoSlide(); // Restart auto-slide
        });
    }
    
    // Indicator event listeners
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            goToSlide(index);
            stopAutoSlide();
            startAutoSlide(); // Restart auto-slide
        });
    });
    
    // Pause auto-slide on hover
    const slider = document.querySelector('.about__image-slider');
    if (slider) {
        slider.addEventListener('mouseenter', stopAutoSlide);
        slider.addEventListener('mouseleave', startAutoSlide);
    }
    
    // Initialize
    updateSlider();
    startAutoSlide();
}

// What We Do Tabs Functionality
function initWhatWeDoTabs() {
    console.log('=== WHAT WE DO TABS INITIALIZATION ===');
    const tabs = document.querySelectorAll('.what-we-do__tab');
    const panels = document.querySelectorAll('.what-we-do__panel');
    
    console.log('Tabs found:', tabs.length);
    console.log('Panels found:', panels.length);
    
    if (tabs.length === 0 || panels.length === 0) {
        console.error('No tabs or panels found!');
        return;
    }
    
    // Animation timings
    const PANEL_TRANSITION_DELAY = 200;
    const CARD_STAGGER_DELAY = 100;
    
    function activateTab(targetTab, clickedTabElement) {
        // Remove active class from all tabs
        tabs.forEach(t => t.classList.remove('what-we-do__tab--active'));
        
        // Add active class to clicked tab
        clickedTabElement.classList.add('what-we-do__tab--active');
        
        // Hide all panels first
        panels.forEach(p => {
            p.classList.remove('what-we-do__panel--active');
            // Reset card animations
            const cards = p.querySelectorAll('.what-we-do__card');
            cards.forEach((card, index) => {
                card.style.animation = 'none';
                card.style.opacity = '0';
                card.style.transform = 'translateY(40px)';
            });
        });
        
        // Show target panel after a short delay
        setTimeout(() => {
            const targetPanel = document.getElementById(targetTab);
            if (targetPanel) {
                targetPanel.classList.add('what-we-do__panel--active');
                
                // Animate cards with staggered delays
                const cards = targetPanel.querySelectorAll('.what-we-do__card');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.animation = `cardSlideUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards`;
                        card.style.animationDelay = `${index * CARD_STAGGER_DELAY}ms`;
                    }, index * CARD_STAGGER_DELAY);
                });
                
                // Re-trigger AOS animations for the new panel
                if (typeof AOS !== 'undefined') {
                    setTimeout(() => {
                        AOS.refresh();
                    }, 300);
                }
            }
        }, PANEL_TRANSITION_DELAY);
    }
    
    // Initialize first tab
    if (tabs.length > 0) {
        tabs[0].classList.add('what-we-do__tab--active');
    }
    if (panels.length > 0) {
        panels[0].classList.add('what-we-do__panel--active');
    }
    
    // Add click handlers
    tabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            const targetTab = this.getAttribute('data-tab');
            
            // Don't do anything if this tab is already active
            if (this.classList.contains('what-we-do__tab--active')) {
                return;
            }
            
            // Add ripple effect
            createRippleEffect(this, e);
            
            // Activate the tab
            activateTab(targetTab, this);
        });
        
        // Add keyboard support
        tab.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    // Ripple effect for tab clicks
    function createRippleEffect(element, event) {
        const rect = element.getBoundingClientRect();
        const ripple = document.createElement('span');
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);
        
        // Remove ripple after animation
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, 600);
    }
}

// About Features Tabs Functionality
function initAboutFeaturesTabs() {
    console.log('=== ABOUT FEATURES TABS INITIALIZATION ===');
    const tabs = document.querySelectorAll('.about__feature-tab');
    const photos = document.querySelectorAll('.about__feature-photo');
    
    console.log('About feature tabs found:', tabs.length);
    console.log('About feature photos found:', photos.length);
    
    if (tabs.length === 0 || photos.length === 0) {
        console.error('No about feature tabs or photos found!');
        return;
    }
    
    function activateTab(targetTab, clickedTabElement) {
        // Remove active class from all tabs
        tabs.forEach(t => t.classList.remove('about__feature-tab--active'));
        
        // Add active class to clicked tab
        clickedTabElement.classList.add('about__feature-tab--active');
        
        // Hide all photos first
        photos.forEach(p => p.classList.remove('about__feature-photo--active'));
        
        // Show target photo
        const targetPhoto = document.getElementById(targetTab + '-photo');
        if (targetPhoto) {
            targetPhoto.classList.add('about__feature-photo--active');
        }
    }
    
    // Initialize first tab
    if (tabs.length > 0) {
        tabs[0].classList.add('about__feature-tab--active');
    }
    if (photos.length > 0) {
        photos[0].classList.add('about__feature-photo--active');
    }
    
    // Add click handlers
    tabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            const targetTab = this.getAttribute('data-tab');
            
            // Don't do anything if this tab is already active
            if (this.classList.contains('about__feature-tab--active')) {
                return;
            }
            
            // Activate the tab
            activateTab(targetTab, this);
        });
        
        // Add keyboard support
        tab.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
}

// Product data - Global for access by multiple functions
const productData = {
        'woven-tops': {
            title: 'Woven Tops',
            description: 'High-quality woven tops including shirts, blouses, and tunics. Made from premium fabrics with attention to detail and comfort.',
            images: [
                'Website Visuals/Product Category Overview/Woven Top/dsrgdb.webp?v=2',
                'Website Visuals/Product Category Overview/Woven Top/dr bdxf.webp',
                'Website Visuals/Product Category Overview/Woven Top/Woven-top3.jpg',
                'Website Visuals/Product Category Overview/Woven Top/Woven-top1.jpg',
                'Website Visuals/Product Category Overview/Woven Top/Woven-top2.jpg'
            ],
            overviewPhoto: 'Website Visuals/Product Category Overview/Woven Top/dsrgdb.webp?v=2',
            bottomPhotos: [
                'Website Visuals/Product Category Overview/Woven Top/dr bdxf.webp',
                'Website Visuals/Product Category Overview/Woven Top/Woven-top3.jpg'
            ]
        },
        'coats-jackets': {
            title: 'Coats & Jackets',
            description: 'Stylish and functional outerwear for all seasons. From lightweight jackets to heavy winter coats.',
            images: [
                'Website Visuals/Product Category Overview/Coats_&_Jacket/_Z5A0220.webp',
                'Website Visuals/Product Category Overview/Coats_&_Jacket/_Z5A0203.webp',
                'Website Visuals/Product Category Overview/Coats_&_Jacket/_Z5A0203 (2).webp'
            ],
            overviewPhoto: 'Website Visuals/Product Category Overview/Coats_&_Jacket/_Z5A0220.webp',
            bottomPhotos: [
                'Website Visuals/Product Category Overview/Coats_&_Jacket/_Z5A0203.webp',
                'Website Visuals/Product Category Overview/Coats_&_Jacket/_Z5A0203 (2).webp'
            ]
        },
        'sportswear': {
            title: 'Sportswear',
            description: 'Performance-driven athletic wear designed for comfort and functionality during physical activities.',
            images: [
                'Website Visuals/Product Category Overview/Sportswear/dsrgdb.webp',
                'Website Visuals/Product Category Overview/Sportswear/_Z5A0225.webp',
                'Website Visuals/Product Category Overview/Sportswear/244.webp'
            ],
            overviewPhoto: 'Website Visuals/Product Category Overview/Sportswear/dsrgdb.webp',
            bottomPhotos: [
                'Website Visuals/Product Category Overview/Sportswear/_Z5A0225.webp',
                'Website Visuals/Product Category Overview/Sportswear/244.webp'
            ]
        },
        'woven-bottoms': {
            title: 'Woven Bottoms',
            description: 'Classic and contemporary bottom wear including trousers, pants, and skirts.',
            images: [
                'Website Visuals/Product Category Overview/Woven Bottom/safv.webp',
                'Website Visuals/Product Category Overview/Woven Bottom/pg nfv.webp',
                'Website Visuals/Product Category Overview/Woven Bottom/IMG_8297.webp',
                'Website Visuals/Product Category Overview/Woven Bottom/111.webp'
            ],
            overviewPhoto: 'Website Visuals/Product Category Overview/Woven Bottom/safv.webp',
            bottomPhotos: [
                'Website Visuals/Product Category Overview/Woven Bottom/pg nfv.webp',
                'Website Visuals/Product Category Overview/Woven Bottom/IMG_8297.webp'
            ]
        },
        'knitwear': {
            title: 'Knitwear',
            description: 'Soft and comfortable knit garments perfect for layering and everyday wear.',
            images: [
                'Website Visuals/Product Category Overview/Knitwear/_Z5A0835.webp',
                'Website Visuals/Product Category Overview/Knitwear/_Z5A0233.webp',
                'Website Visuals/Product Category Overview/Knitwear/_Z5A0200.webp'
            ],
            overviewPhoto: 'Website Visuals/Product Category Overview/Knitwear/_Z5A0835.webp',
            bottomPhotos: [
                'Website Visuals/Product Category Overview/Knitwear/_Z5A0233.webp',
                'Website Visuals/Product Category Overview/Knitwear/_Z5A0200.webp'
            ]
        },
        'homeware': {
            title: 'Homeware',
            description: 'Beautiful and functional home textiles and accessories for modern living.',
            images: [
                'Website Visuals/Product Category Overview/Homewear/sdbb.webp',
                'Website Visuals/Product Category Overview/Homewear/fgvdxb.webp',
                'Website Visuals/Product Category Overview/Homewear/afav s.webp'
            ],
            overviewPhoto: 'Website Visuals/Product Category Overview/Homewear/sdbb.webp',
            bottomPhotos: [
                'Website Visuals/Product Category Overview/Homewear/fgvdxb.webp',
                'Website Visuals/Product Category Overview/Homewear/afav s.webp'
            ]
        },
        'handicrafts': {
            title: 'Handicrafts',
            description: 'Artisanal handcrafted items showcasing traditional craftsmanship and unique designs.',
            images: [
                'Website Visuals/Product Category Overview/Handicrafts/qefc.webp',
                'Website Visuals/Product Category Overview/Handicrafts/arfa.webp',
                'Website Visuals/Product Category Overview/Handicrafts/3w42.webp'
            ],
            overviewPhoto: 'Website Visuals/Product Category Overview/Handicrafts/qefc.webp',
            bottomPhotos: [
                'Website Visuals/Product Category Overview/Handicrafts/arfa.webp',
                'Website Visuals/Product Category Overview/Handicrafts/3w42.webp'
            ]
        },
        'sweater': {
            title: 'Sweater',
            description: 'Premium sweater collection with intricate designs and superior quality materials.',
            images: [
                'Website Visuals/Product Category Overview/Sweater/Sweater-1.jpg',
                'Website Visuals/Product Category Overview/Sweater/Sweater-1.jpg',
                'Website Visuals/Product Category Overview/Sweater/_Z5A0724.webp',
                'Website Visuals/Product Category Overview/Sweater/Sweater-2.jpg',
                'Website Visuals/Product Category Overview/Sweater/Our Collection.webp',
                'Website Visuals/Product Category Overview/Sweater/Sweater-1.jpg'
            ],
            overviewPhoto: 'Website Visuals/Product Category Overview/Sweater/Sweater-2.jpg',
            bottomPhotos: [
                'Website Visuals/Product Category Overview/Sweater/_Z5A0724.webp',
                'Website Visuals/Product Category Overview/Sweater/Sweater-1.jpg'
            ]
        },
        'workwear': {
            title: 'Workwear',
            description: 'Professional and safety wear. Durable, comfortable, and compliant with industry standards.',
            images: [
                'Website Visuals/Product Category Overview/Workwear/wef.webp',
                'Website Visuals/Product Category Overview/Workwear/sfef.webp',
                'Website Visuals/Product Category Overview/Workwear/q2.webp'
            ],
            overviewPhoto: 'Website Visuals/Product Category Overview/Workwear/wef.webp',
            bottomPhotos: [
                'Website Visuals/Product Category Overview/Workwear/sfef.webp',
                'Website Visuals/Product Category Overview/Workwear/q2.webp'
            ]
        },
        'denim': {
            title: 'Denim',
            description: 'Classic denim garments and accessories. Timeless style with modern comfort and durability.',
            images: [
                'Website Visuals/Product Category Overview/Denim/_Z5A0203.webp',
                'Website Visuals/Product Category Overview/Denim/1dd08.webp',
                'Website Visuals/Product Category Overview/Denim/108.webp',
                'Website Visuals/Product Category Overview/Denim/106wr.webp',
                'Website Visuals/Product Category Overview/Denim/106.webp'
            ],
            overviewPhoto: 'Website Visuals/Product Category Overview/Denim/_Z5A0203.webp',
            bottomPhotos: [
                'Website Visuals/Product Category Overview/Denim/1dd08.webp',
                'Website Visuals/Product Category Overview/Denim/108.webp'
            ]
        }
    };

// Product Categories
function initProductCategories() {
    const categoryItems = document.querySelectorAll('.category__item');
    const productTitle = document.querySelector('.categories__product-title');
    const productDescription = document.querySelector('.categories__product-description');
    const galleryGrid = document.querySelector('.categories__gallery');
    
    if (categoryItems.length === 0) return;
    
    function updateProductDisplay(category) {
        const data = productData[category];
        if (!data) return;
        
        // Update title and description
        if (productTitle) productTitle.textContent = data.title;
        if (productDescription) productDescription.textContent = data.description;
        
        // Update gallery slider
        if (galleryGrid) {
            const slider = galleryGrid.querySelector('.categories__gallery-slider');
            const controls = galleryGrid.querySelector('.categories__gallery-controls');
            
            if (slider) {
                slider.innerHTML = data.images.map((image, index) => `
                    <div class="categories__gallery-slide">
                        <img src="images/${image}" alt="${data.title} ${index + 1}" class="categories__gallery-image">
                    </div>
                `).join('');
            }
            
            if (controls) {
                controls.innerHTML = data.images.map((_, index) => `
                    <div class="categories__gallery-dot ${index === 0 ? 'categories__gallery-dot--active' : ''}" data-slide="${index}"></div>
                `).join('');
            }
            
            // Reset slider position
            if (slider) {
                slider.style.transform = 'translateX(0)';
            }
            
            // Reinitialize slider functionality
            initCategorySlider();
        }
    }
    
    categoryItems.forEach(item => {
        item.addEventListener('click', function() {
            const category = this.dataset.category;
            
            // Remove active class from all items
            categoryItems.forEach(i => i.classList.remove('category__item--active'));
            
            // Add active class to clicked item
            this.classList.add('category__item--active');
            
            // Update product display
            updateProductDisplay(category);
        });
    });
    
    // Initialize slider for first category
    initCategorySlider();
}

// Initialize Products Page functionality
function initProductsPage() {
    // Check if we're on the products page
    if (!window.location.pathname.includes('products.php')) {
        return; // Not on products page
    }

    // Since we're now using the products-hero structure,
    // the category switching is handled by initProductsPageCategorySwitching
    console.log('Products page initialized');
}

// Quick View Modal
function initQuickView() {
    // Handle both product cards (if they exist) and product items
    const quickViewButtons = document.querySelectorAll('.product-card__quick-view');
    const productItems = document.querySelectorAll('.product-item');
    
    // Handle product card quick view buttons (existing functionality)
    quickViewButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            
            const card = this.closest('.product-card');
            const title = card.querySelector('.product-card__title').textContent;
            const description = card.querySelector('.product-card__description').textContent;
            const image = card.querySelector('.product-card__img').src;
            const category = card.querySelector('.product-card__category').textContent;
            const code = card.querySelector('.product-card__code').textContent;
            
            openProductModal(title, description, image, category, code);
        });
    });
    
    // Handle product items (new functionality for products page)
    productItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            const title = this.querySelector('.product-item__title').textContent;
            const description = this.querySelector('.product-item__description').textContent;
            const image = this.querySelector('.product-item__image').src;
            
            // Get category from the parent container
            const categoryContainer = this.closest('.product-category');
            const category = categoryContainer ? categoryContainer.querySelector('.product-category__title').textContent.replace(' Collection', '') : 'Product';
            
            // Generate a simple code based on title
            const code = title.replace(/\s+/g, '-').toUpperCase();
            
            openProductModal(title, description, image, category, code);
        });
        
        // Add hover effect to indicate clickability
        item.style.cursor = 'pointer';
        item.style.transition = 'transform 0.2s ease, box-shadow 0.2s ease';
        
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
}

// Function to open product modal with given information
function openProductModal(title, description, image, category, code) {
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'quick-view-modal';
    modal.innerHTML = `
        <div class="quick-view-modal__overlay">
            <div class="quick-view-modal__content">
                <button class="quick-view-modal__close">&times;</button>
                <div class="quick-view-modal__body">
                    <div class="quick-view-modal__image">
                        <img src="${image}" alt="${title}">
                    </div>
                    <div class="quick-view-modal__info">
                        <h3>${title}</h3>
                        <p>${description}</p>
                        <div class="quick-view-modal__meta">
                            <span class="quick-view-modal__category">${category}</span>
                            <span class="quick-view-modal__code">${code}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Prevent body scrolling when modal is open
    document.body.style.overflow = 'hidden';
    
    // Close modal functionality
    const closeBtn = modal.querySelector('.quick-view-modal__close');
    const overlay = modal.querySelector('.quick-view-modal__overlay');
    
    function closeModal() {
        // Restore body scrolling
        document.body.style.overflow = '';
        modal.remove();
    }
    
    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
            closeModal();
        }
    });
    
    // ESC key to close
    document.addEventListener('keydown', function handleEscape(e) {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', handleEscape);
        }
    });
}

// Category Slider Functionality
function initCategorySlider() {

    
    const slider = document.querySelector('.categories__gallery-slider');
    const dots = document.querySelectorAll('.categories__gallery-dot');
    const prevBtn = document.querySelector('.categories__gallery-nav--prev');
    const nextBtn = document.querySelector('.categories__gallery-nav--next');
    
    if (!slider || dots.length === 0) return;
    
    let currentSlide = 0;
    const totalSlides = dots.length;
    
    function updateSlider() {
        slider.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('categories__gallery-dot--active', index === currentSlide);
        });
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlider();
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateSlider();
    }
    
    function goToSlide(slideIndex) {
        currentSlide = slideIndex;
        updateSlider();
    }
    
    // Event listeners
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
    }
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => goToSlide(index));
    });
    
    // Auto-slide
    let autoSlideInterval = setInterval(nextSlide, 5000);
    
    // Pause auto-slide on hover
    slider.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });
    
    slider.addEventListener('mouseleave', () => {
        autoSlideInterval = setInterval(nextSlide, 5000);
    });
}

// Hero Map Points Animation
function initHeroMapPoints() {
    const mapPoints = document.querySelectorAll('.hero__map-point');
    
    mapPoints.forEach((point, index) => {
        // Add staggered animation delay
        point.style.animationDelay = `${index * 0.5}s`;
        
        // Add click interaction
        point.addEventListener('click', function() {
            const location = this.dataset.location;
            showLocationInfo(location);
        });
    });
}

function showLocationInfo(location) {
    const locationInfo = {
        'singapore': 'Our headquarters in Singapore serves as the central hub for global operations and client relations.',
        'bangladesh': 'Major manufacturing facilities in Bangladesh with state-of-the-art production capabilities.',
        'vietnam': 'Strategic manufacturing partnerships in Vietnam for specialized garment production.'
    };
    
    const info = locationInfo[location];
    if (info) {
        showNotification(info, 'info');
    }
}

// Contact Form Handling
function initContactForms() {
    const contactForms = document.querySelectorAll('.contact__form, .contact-form');
    
    contactForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const submitButton = form.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            // Show loading state
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            // Submit form data
            fetch('/process_contact.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    showNotification('Message sent successfully!', 'success');
                    form.reset();
                } else {
                    showNotification(data.message || 'Error sending message. Please try again.', 'error');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                showNotification('Error sending message. Please try again.', 'error');
            })
            .finally(() => {
                // Reset button state
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            });
        });
    });
}

// Product Filtering (for products page)
function initProductFilters() {
    const filterButtons = document.querySelectorAll('.filter__button');
    const productsGrid = document.getElementById('productsGrid');
    
    if (filterButtons.length && productsGrid) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const category = this.dataset.category;
                
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('filter__button--active'));
                this.classList.add('filter__button--active');
                
                // Filter products (this would be implemented with actual product data)
                filterProducts(category);
            });
        });
    }
}

// Product filtering function
function filterProducts(category) {
    // This would be implemented to filter actual product data
    console.log('Filtering products by category:', category);
    
    // Example implementation:
    // const products = document.querySelectorAll('.product-item');
    // products.forEach(product => {
    //     if (category === 'all' || product.dataset.category === category) {
    //         product.style.display = 'block';
    //     } else {
    //         product.style.display = 'none';
    //     }
    // });
}

// Smooth Scrolling for Anchor Links
function initSmoothScrolling() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}



// Animations
function initAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.section__title, .section__subtitle, .about__stat, .team__member, .client__logo');
    animateElements.forEach(el => observer.observe(el));
}

// Notification System
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <div class="notification__content">
            <span class="notification__message">${message}</span>
            <button class="notification__close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 1rem;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        max-width: 300px;
        animation: slideIn 0.3s ease;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Close button functionality
    const closeButton = notification.querySelector('.notification__close');
    closeButton.addEventListener('click', () => {
        notification.remove();
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Add CSS animation for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// Utility Functions

// Debounce function for performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Form validation helper
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\+]?[1-9][\d]{0,15}$/;
    return re.test(phone);
}

// Lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading if images exist
if (document.querySelectorAll('img[data-src]').length > 0) {
    initLazyLoading();
}

// Parallax effect for hero section
function initParallax() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    window.addEventListener('scroll', throttle(() => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        const heroBackground = hero.querySelector('.hero__background');
        if (heroBackground) {
            heroBackground.style.transform = `translateY(${rate}px)`;
        }
    }, 16));
}

// Initialize parallax
initParallax();

// Partner Logo Slider with Mouse Control
function initPartnerSlider() {
    const slider = document.querySelector('.partners__slider');
    const track = document.querySelector('.partners__track');
    
    if (!slider || !track) return;
    
    let isMouseDown = false;
    let startX = 0;
    let scrollLeft = 0;
    let animationPaused = false;
    
    // Pause animation on mouse enter
    slider.addEventListener('mouseenter', () => {
        if (!isMouseDown) {
            track.style.animationPlayState = 'paused';
            animationPaused = true;
        }
    });
    
    // Resume animation on mouse leave (if not dragging)
    slider.addEventListener('mouseleave', () => {
        if (!isMouseDown) {
            track.style.animationPlayState = 'running';
            animationPaused = false;
        }
    });
    
    // Mouse down event
    slider.addEventListener('mousedown', (e) => {
        isMouseDown = true;
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = track.scrollLeft;
        
        // Pause animation during drag
        track.style.animationPlayState = 'paused';
        animationPaused = true;
        
        slider.style.cursor = 'grabbing';
    });
    
    // Mouse leave event
    slider.addEventListener('mouseleave', () => {
        isMouseDown = false;
        slider.style.cursor = 'grab';
        
        // Resume animation if it was paused
        if (animationPaused) {
            track.style.animationPlayState = 'running';
            animationPaused = false;
        }
    });
    
    // Mouse up event
    slider.addEventListener('mouseup', () => {
        isMouseDown = false;
        slider.style.cursor = 'grab';
        
        // Resume animation if it was paused
        if (animationPaused) {
            track.style.animationPlayState = 'running';
            animationPaused = false;
        }
    });
    
    // Mouse move event
    slider.addEventListener('mousemove', (e) => {
        if (!isMouseDown) return;
        
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 2; // Scroll speed multiplier
        
        // Calculate the scroll position
        const scrollPosition = scrollLeft - walk;
        
        // Apply scroll transform
        track.style.transform = `translateX(${scrollPosition}px)`;
    });
    
    // Prevent default drag behavior on images
    const partnerImages = document.querySelectorAll('.partner__image');
    partnerImages.forEach(img => {
        img.addEventListener('dragstart', (e) => {
            e.preventDefault();
        });
    });
    
    // Add touch support for mobile devices
    let touchStartX = 0;
    let touchStartY = 0;
    
    slider.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        
        // Pause animation on touch
        track.style.animationPlayState = 'paused';
        animationPaused = true;
    });
    
    slider.addEventListener('touchmove', (e) => {
        if (!touchStartX || !touchStartY) return;
        
        e.preventDefault();
        
        const touchX = e.touches[0].clientX;
        const touchY = e.touches[0].clientY;
        
        const diffX = touchStartX - touchX;
        const diffY = touchStartY - touchY;
        
        // Only handle horizontal scrolling
        if (Math.abs(diffX) > Math.abs(diffY)) {
            const walk = diffX * 2;
            track.style.transform = `translateX(${-walk}px)`;
        }
    });
    
    slider.addEventListener('touchend', () => {
        touchStartX = 0;
        touchStartY = 0;
        
        // Resume animation
        if (animationPaused) {
            track.style.animationPlayState = 'running';
            animationPaused = false;
        }
    });
}

// Initialize bottom overview photos navigation
function initOverviewPhotosNavigation() {
    const prevBtn = document.getElementById('overview-prev-btn');
    const nextBtn = document.getElementById('overview-next-btn');
    const overviewPhoto1 = document.getElementById('overview-photo-1');
    const overviewPhoto2 = document.getElementById('overview-photo-2');
    
    if (!prevBtn || !nextBtn || !overviewPhoto1 || !overviewPhoto2) return;
    
    let currentPhotoIndex = 0;
    let currentCategory = 'woven-tops';
    
    function updateOverviewPhotos(category) {
        currentCategory = category;
        const data = productData[category];
        if (!data || !data.images || data.images.length < 2) return;
        
        // Show first two photos
        if (data.images.length >= 1) {
            overviewPhoto1.src = `images/${data.images[1]}`;
            overviewPhoto1.alt = `${data.title} Manufacturing Process 1`;
        }
        
        if (data.images.length >= 2) {
            overviewPhoto2.src = `images/${data.images[2]}`;
            overviewPhoto2.alt = `${data.title} Manufacturing Process 2`;
        }
        
        currentPhotoIndex = 0;
        updateNavigationButtons();
    }
    
    function updateNavigationButtons() {
        const data = productData[currentCategory];
        if (!data || !data.images) return;
        
        const totalPhotos = data.images.length;
        
        // Show/hide navigation buttons based on available photos
        if (totalPhotos <= 2) {
            prevBtn.style.display = 'none';
            nextBtn.style.display = 'none';
        } else {
            prevBtn.style.display = 'flex';
            nextBtn.style.display = 'flex';
        }
    }
    
    function showNextPhotos() {
        const data = productData[currentCategory];
        if (!data || !data.images) return;
        
        const totalPhotos = data.images.length;
        if (totalPhotos <= 2) return;
        
        currentPhotoIndex = (currentPhotoIndex + 2) % totalPhotos;
        
        // Show next two photos
        const photo1Index = currentPhotoIndex;
        const photo2Index = (currentPhotoIndex + 1) % totalPhotos;
        
        overviewPhoto1.src = `images/${data.images[photo1Index]}`;
        overviewPhoto1.alt = `${data.title} Manufacturing Process ${photo1Index + 1}`;
        
        overviewPhoto2.src = `images/${data.images[photo2Index]}`;
        overviewPhoto2.alt = `${data.title} Manufacturing Process ${photo2Index + 1}`;
    }
    
    function showPrevPhotos() {
        const data = productData[currentCategory];
        if (!data || !data.images) return;
        
        const totalPhotos = data.images.length;
        if (totalPhotos <= 2) return;
        
        currentPhotoIndex = (currentPhotoIndex - 2 + totalPhotos) % totalPhotos;
        
        // Show previous two photos
        const photo1Index = currentPhotoIndex;
        const photo2Index = (currentPhotoIndex + 1) % totalPhotos;
        
        overviewPhoto1.src = `images/${data.images[photo1Index]}`;
        overviewPhoto1.alt = `${data.title} Manufacturing Process ${photo1Index + 1}`;
        
        overviewPhoto2.src = `images/${data.images[photo2Index]}`;
        overviewPhoto2.alt = `${data.title} Manufacturing Process ${photo2Index + 1}`;
    }
    
    // Event listeners
    nextBtn.addEventListener('click', showNextPhotos);
    prevBtn.addEventListener('click', showPrevPhotos);
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
            showNextPhotos();
        } else if (e.key === 'ArrowLeft') {
            showPrevPhotos();
        }
    });
    
    // Return the update function so it can be called from category switching
    return updateOverviewPhotos;
}

// Product Detail Modals for Category Pages
function initProductDetailModals() {
    const productItems = document.querySelectorAll('.product-item[data-product-name]');
    
    productItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const productName = this.getAttribute('data-product-name');
            const productDescription = this.getAttribute('data-product-description');
            const productImage = this.getAttribute('data-product-image');
            const productCategory = this.getAttribute('data-product-category');
            
            // Generate a simple code based on title
            const productCode = productName.replace(/\s+/g, '-').toUpperCase();
            
            openProductModal(productName, productDescription, productImage, productCategory, productCode);
        });
        
        // Add hover effect to indicate clickability (desktop only)
        if (window.innerWidth > 768) {
            item.style.transition = 'transform 0.2s ease, box-shadow 0.2s ease';
            
            item.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-2px)';
                this.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = 'none';
            });
        }
        
        // Add touch feedback for mobile
        if (window.innerWidth <= 768) {
            item.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.98)';
                this.style.transition = 'transform 0.1s ease';
            });
            
            item.addEventListener('touchend', function() {
                this.style.transform = 'scale(1)';
            });
        }
    });
}

// Products Page Category Switching Functionality
function initProductsPageCategorySwitching() {
    // Only run on products page
    console.log('Current pathname:', window.location.pathname);
    if (!window.location.pathname.includes('products.php')) {
        console.log('Not on products page, pathname:', window.location.pathname);
        return;
    }
    
    console.log('Initializing products page category switching...');
    
    const categoryItems = document.querySelectorAll('.category__card');
    const productTitle = document.querySelector('.categories__product-title');
    const productDescription = document.querySelector('.categories__product-description');
    const singlePhoto = document.querySelector('#category-single-photo');
    const overviewSubtitle = document.querySelector('#category-overview-subtitle');
    const overviewPhoto1 = document.querySelector('#overview-photo-1');
    const overviewPhoto2 = document.querySelector('#overview-photo-2');
    const productCategories = document.querySelectorAll('.product-category');
    
    console.log('Found elements:', {
        categoryItems: categoryItems.length,
        productTitle: !!productTitle,
        productDescription: !!productDescription,
        singlePhoto: !!singlePhoto,
        overviewSubtitle: !!overviewSubtitle,
        overviewPhoto1: !!overviewPhoto1,
        overviewPhoto2: !!overviewPhoto2,
        productCategories: productCategories.length,
    });
    
    if (categoryItems.length === 0) {
        console.log('No category items found');
        return;
    }
    
    function switchCategory(category) {
        console.log('Switching to category:', category);
        const data = productData[category];
        if (!data) {
            console.log('No data found for category:', category);
            return;
        }
        
        console.log('Category data:', data);
        
        // Update title and description
        if (productTitle) {
            productTitle.textContent = data.title;
        }
        if (productDescription) {
            productDescription.textContent = data.description;
        }
        
        
        // Update single photo (top section)
        if (singlePhoto) {
            singlePhoto.src = `images/${data.overviewPhoto}`;
            singlePhoto.alt = `${data.title} Overview`;
        }
        
        // Update overview subtitle
        if (overviewSubtitle) {
            overviewSubtitle.textContent = `Additional insights into our ${data.title.toLowerCase()} manufacturing process`;
        }
        
        // Update bottom overview photos
        if (overviewPhoto1 && overviewPhoto2 && data.bottomPhotos && data.bottomPhotos.length >= 2) {
            overviewPhoto1.src = `images/${data.bottomPhotos[0]}`;
            overviewPhoto1.alt = `${data.title} Manufacturing Process 1`;
            
            overviewPhoto2.src = `images/${data.bottomPhotos[1]}`;
            overviewPhoto2.alt = `${data.title} Manufacturing Process 2`;
        }
        
        // Update overview photos navigation for this category
        if (window.updateOverviewPhotos) {
            window.updateOverviewPhotos(category);
        }
        
        // Update product category visibility
        productCategories.forEach(cat => {
            cat.classList.remove('product-category--active');
        });
        
        const activeCategory = document.getElementById(`${category}-products`);
        if (activeCategory) {
            activeCategory.classList.add('product-category--active');
        }
        
        // Update active category item
        categoryItems.forEach(item => {
            item.classList.remove('category__card--active');
        });
        
        const activeItem = document.querySelector(`[data-category="${category}"]`);
        if (activeItem) {
            activeItem.classList.add('category__card--active');
        }
        
        // Scroll to product listings section
        const productListingsSection = document.getElementById('product-listings');
        if (productListingsSection) {
            productListingsSection.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
    
    // Add click event listeners to category items
    categoryItems.forEach(item => {
        item.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            console.log('Category item clicked:', category);
            switchCategory(category);
        });
    });
    
    // Initialize with first category
    if (categoryItems.length > 0) {
        const firstCategory = categoryItems[0].getAttribute('data-category');
        console.log('Initializing with first category:', firstCategory);
        switchCategory(firstCategory);
    }
    
    // Initialize overview photos navigation and get the update function
    const updateOverviewPhotosFunc = initOverviewPhotosNavigation();
    if (updateOverviewPhotosFunc) {
        window.updateOverviewPhotos = updateOverviewPhotosFunc;
    }
}