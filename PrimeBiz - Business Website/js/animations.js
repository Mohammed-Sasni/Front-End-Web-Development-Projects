// Animate elements when they come into view
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.service-card, .value-card, .team-member, .portfolio-item, .testimonial-card, .story-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    elements.forEach(element => {
        observer.observe(element);
    });
};

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
    animateOnScroll();
});

// Portfolio Filtering
const portfolioFilter = () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            // Filter items
            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category').includes(filterValue)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
};

// Initialize portfolio filtering if on portfolio page
if (document.querySelector('.portfolio-filter')) {
    portfolioFilter();
}

// Testimonial Slider
const testimonialSlider = () => {
    const testimonials = document.querySelectorAll('.testimonial');
    let currentIndex = 0;
    
    if (testimonials.length === 0) return;
    
    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            testimonial.style.display = i === index ? 'block' : 'none';
        });
    }
    
    // Initialize
    showTestimonial(currentIndex);
    
    // Auto-rotate testimonials
    setInterval(() => {
        currentIndex = (currentIndex + 1) % testimonials.length;
        showTestimonial(currentIndex);
    }, 5000);
};

// Initialize testimonial slider if on testimonials page
if (document.querySelector('.testimonial-slider')) {
    testimonialSlider();
}

// Modal functionality for portfolio case studies
const portfolioModal = () => {
    const modal = document.getElementById('caseStudyModal');
    const modalContent = document.querySelector('.modal-body');
    const closeBtn = document.querySelector('.close-modal');
    const portfolioLinks = document.querySelectorAll('.portfolio-link');
    
    if (!modal) return;
    
    // Close modal
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    closeBtn.addEventListener('click', closeModal);
    
    // Close when clicking outside modal
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Close with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
    
    // Open modal with case study content
    portfolioLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // In a real implementation, you would fetch the case study content
            // Here we're just showing placeholder content
            const projectTitle = link.closest('.portfolio-overlay').querySelector('h3').textContent;
            
            modalContent.innerHTML = `
                <h2>${projectTitle}</h2>
                <p>This would be a detailed case study about the project, including:</p>
                <ul>
                    <li>Client background and challenges</li>
                    <li>Our approach and solutions</li>
                    <li>Technologies used</li>
                    <li>Results and impact</li>
                </ul>
                <p>In a real implementation, this content would be dynamically loaded based on which project was clicked.</p>
                <div class="case-study-images">
                    <img src="https://via.placeholder.com/800x500" alt="Project screenshot">
                    <img src="https://via.placeholder.com/800x500" alt="Project screenshot">
                </div>
            `;
            
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });
};

// Initialize portfolio modal if on portfolio page
if (document.getElementById('caseStudyModal')) {
    portfolioModal();
}