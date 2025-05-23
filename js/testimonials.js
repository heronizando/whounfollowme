// Testimonials slider functionality
(function() {
    const testimonials = document.querySelectorAll('.testimonial');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;
    
    // Initialize testimonials slider
    function initTestimonials() {
        if (!testimonials.length) return;
        
        // Hide all testimonials except the first one
        testimonials.forEach((testimonial, index) => {
            if (index !== 0) {
                testimonial.style.display = 'none';
            }
        });
        
        // Next button functionality
        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                testimonials[currentSlide].style.display = 'none';
                currentSlide = (currentSlide + 1) % testimonials.length;
                testimonials[currentSlide].style.display = 'block';
            });
        }
        
        // Previous button functionality
        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                testimonials[currentSlide].style.display = 'none';
                currentSlide = (currentSlide - 1 + testimonials.length) % testimonials.length;
                testimonials[currentSlide].style.display = 'block';
            });
        }
    }
    
    // Initialize testimonials
    initTestimonials();
})();