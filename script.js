// Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navList = document.querySelector('.nav-list');

navToggle.addEventListener('click', () => {
    navList.classList.toggle('active');
});

// Close navigation when clicking outside
document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navList.contains(e.target)) {
        navList.classList.remove('active');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu after clicking
            navList.classList.remove('active');
        }
    });
});

// Project Modal
const modal = document.getElementById('project-modal');
const modalContent = document.getElementById('modal-content');
const closeModal = document.querySelector('.close-modal');
const projectButtons = document.querySelectorAll('.project-btn');

// Project details
const projectDetails = {
    ctdi: {
        title: 'CTDI Website Prototype',
        description: 'A comprehensive website designed to connect tourists with authentic local experiences in Rwanda. Features include:',
        features: [
            'Interactive map of local communities',
            'Booking system for homestays',
            'Cultural experience listings',
            'Community profiles and stories'
        ],
        technologies: ['HTML', 'CSS', 'JavaScript', 'Google Maps API']
    },
    gpa: {
        title: 'GPA Calculator',
        description: 'A dynamic GPA calculator built with JavaScript that allows students to:',
        features: [
            'Add multiple courses dynamically',
            'Calculate GPA in real-time',
            'Save and load calculations',
            'Export results as PDF'
        ],
        technologies: ['HTML', 'CSS', 'JavaScript', 'PDF.js']
    },
    portfolio: {
        title: 'Portfolio Website',
        description: 'A responsive personal portfolio website showcasing my journey and projects. Features include:',
        features: [
            'Responsive design for all devices',
            'Interactive project showcase',
            'Contact form with validation',
            'Smooth scrolling navigation'
        ],
        technologies: ['HTML', 'CSS', 'JavaScript']
    }
};

// Open modal with project details
projectButtons.forEach(button => {
    button.addEventListener('click', () => {
        const projectId = button.getAttribute('data-project');
        const project = projectDetails[projectId];
        
        if (project) {
            modalContent.innerHTML = `
                <h2>${project.title}</h2>
                <p>${project.description}</p>
                <h3>Key Features:</h3>
                <ul>
                    ${project.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
                <h3>Technologies Used:</h3>
                <div class="tech-stack">
                    ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
            `;
            modal.style.display = 'block';
        }
    });
});

// Close modal
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Form Validation
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // Simple validation
    if (name === '') {
        alert('Please enter your name');
        return;
    }
    
    if (email === '') {
        alert('Please enter your email');
        return;
    }
    
    if (!isValidEmail(email)) {
        alert('Please enter a valid email address');
        return;
    }
    
    if (message === '') {
        alert('Please enter your message');
        return;
    }
    
    // If validation passes, you would typically send the form data to a server
    // For now, we'll just show a success message
    alert('Thank you for your message! I will get back to you soon.');
    contactForm.reset();
});

// Email validation helper function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Add active class to navigation items on scroll
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-list a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').slice(1) === current) {
            item.classList.add('active');
        }
    });
}); 