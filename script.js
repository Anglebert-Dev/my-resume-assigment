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
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');

// Validation rules
const validationRules = {
    name: {
        minLength: 2,
        maxLength: 50,
        pattern: /^[a-zA-Z\s]*$/,
        errorMessages: {
            required: 'Name is required',
            minLength: 'Name must be at least 2 characters',
            maxLength: 'Name must be less than 50 characters',
            pattern: 'Name can only contain letters and spaces'
        }
    },
    email: {
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        errorMessages: {
            required: 'Email is required',
            pattern: 'Please enter a valid email address'
        }
    },
    message: {
        minLength: 10,
        maxLength: 500,
        errorMessages: {
            required: 'Message is required',
            minLength: 'Message must be at least 10 characters',
            maxLength: 'Message must be less than 500 characters'
        }
    }
};

// Real-time validation
function validateField(field, value) {
    const rules = validationRules[field];
    const errorElement = document.getElementById(`${field}-error`);
    const inputElement = document.getElementById(field);
    
    // Reset previous states
    errorElement.classList.remove('show');
    inputElement.classList.remove('error', 'success');
    
    // Check if empty
    if (!value.trim()) {
        showError(field, rules.errorMessages.required);
        return false;
    }
    
    // Validate based on field type
    switch(field) {
        case 'name':
            if (value.length < rules.minLength) {
                showError(field, rules.errorMessages.minLength);
                return false;
            }
            if (value.length > rules.maxLength) {
                showError(field, rules.errorMessages.maxLength);
                return false;
            }
            if (!rules.pattern.test(value)) {
                showError(field, rules.errorMessages.pattern);
                return false;
            }
            break;
            
        case 'email':
            if (!rules.pattern.test(value)) {
                showError(field, rules.errorMessages.pattern);
                return false;
            }
            break;
            
        case 'message':
            if (value.length < rules.minLength) {
                showError(field, rules.errorMessages.minLength);
                return false;
            }
            if (value.length > rules.maxLength) {
                showError(field, rules.errorMessages.maxLength);
                return false;
            }
            break;
    }
    
    // If validation passes
    showSuccess(field);
    return true;
}

function showError(field, message) {
    const errorElement = document.getElementById(`${field}-error`);
    const inputElement = document.getElementById(field);
    
    errorElement.textContent = message;
    errorElement.classList.add('show');
    inputElement.classList.add('error');
    inputElement.classList.remove('success');
}

function showSuccess(field) {
    const errorElement = document.getElementById(`${field}-error`);
    const inputElement = document.getElementById(field);
    
    errorElement.classList.remove('show');
    inputElement.classList.remove('error');
    inputElement.classList.add('success');
}

// Add input event listeners for real-time validation
nameInput.addEventListener('input', () => validateField('name', nameInput.value));
emailInput.addEventListener('input', () => validateField('email', emailInput.value));
messageInput.addEventListener('input', () => validateField('message', messageInput.value));

// Form submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();
    
    // Validate all fields
    const isNameValid = validateField('name', name);
    const isEmailValid = validateField('email', email);
    const isMessageValid = validateField('message', message);
    
    if (isNameValid && isEmailValid && isMessageValid) {
        // If all validations pass, show success message
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
        
        // Reset all validation states
        [nameInput, emailInput, messageInput].forEach(input => {
            input.classList.remove('error', 'success');
            document.getElementById(`${input.id}-error`).classList.remove('show');
        });
    }
});

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