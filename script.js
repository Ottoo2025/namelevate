// script.js
const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.nav-menu');
const closeBtn = document.querySelector('#close-btn');

// Display Mobile Menu
menu.addEventListener('click', function() {
    menuLinks.classList.toggle('active');
});

// Close Mobile Menu
closeBtn.addEventListener('click', function() {
    menuLinks.classList.remove('active');
});

// Close Mobile Menu when clicking a link
document.querySelectorAll('.nav-links').forEach(n => n.addEventListener('click', () => {
    menuLinks.classList.remove('active');
}));


/* --- SINGLE SOURCE DUAL TYPEWRITER --- */
const typewriterWords = ["NGO", "business", "school", "church", "clinic", "company"];
let typewriterIndex = 0;
let typewriterCharCounter = 0;

function handleTypewriting() {
    const targetHero = document.getElementById("typewriter");
    const targetWWD = document.getElementById("typewriter2");
    
    let currentWord = typewriterWords[typewriterIndex];

    if (typewriterCharCounter < currentWord.length) {
        let char = currentWord.charAt(typewriterCharCounter);
        if(targetHero) targetHero.textContent += char;
        if(targetWWD) targetWWD.textContent += char;
        typewriterCharCounter++;
        setTimeout(handleTypewriting, 100);
    } else {
        setTimeout(handleErasure, 5000); 
    }
}

function handleErasure() {
    const targetHero = document.getElementById("typewriter");
    const targetWWD = document.getElementById("typewriter2");

    if (typewriterCharCounter > 0) {
        if(targetHero) targetHero.textContent = targetHero.textContent.slice(0, -1);
        if(targetWWD) targetWWD.textContent = targetWWD.textContent.slice(0, -1);
        typewriterCharCounter--;
        setTimeout(handleErasure, 50);
    } else {
        typewriterIndex = (typewriterIndex + 1) % typewriterWords.length;
        setTimeout(handleTypewriting, 500);
    }
}

/* --- TRIGGER TYPEWRITER IMMEDIATELY --- */
// We call this outside of any 'load' event so it starts while images are still downloading
handleTypewriting();

/* --- MODAL LOGIC --- */
function openModal(type) {
    const modal = document.getElementById('contactModal');
    const msg = document.getElementById('modalMessage');
    const title = document.getElementById('modalTitle');
    
    modal.style.display = "block";
    if(type === 'demo') {
        title.innerText = "Request a Demo";
        msg.value = "I am interested in seeing a demo of how Namelevate can transform my business/organization's digital presence.";
    } else {
        title.innerText = "Get Your Professional Website";
        msg.value = "I would like you to build a professional website for my organization/business. Please contact me with the next steps.";
    }
}  

function closeModal() {
    document.getElementById('contactModal').style.display = "none";
}

// Close when clicking outside the white box
window.onclick = function(event) {
    const contactModal = document.getElementById('contactModal');
    const packageModal = document.getElementById('packageModal');
    if (event.target == contactModal) { closeModal(); }
    if (event.target == packageModal) { closePackageModal(); }
}

// Form loader logic
const contactForm = document.querySelector('.contact-form');
const submitBtn = document.getElementById('submitBtn');
const btnText = document.getElementById('btnText');
const btnSpinner = document.getElementById('btnSpinner');

if(contactForm) {
    contactForm.addEventListener('submit', function() {
        submitBtn.classList.add('processing');
        btnText.innerText = "Sending...";
        btnSpinner.style.display = "inline-block";
    });
}

// Problem section Data
const sectorData = {
    ngo: { title: "Funding & Partnerships at Risk", desc: "Potential partners and donors search for you before they commit. If you aren't there, they can't trust your impact." },
    school: { title: "Losing Students to Modern Competitors", desc: "Parents research the best schools online. If they can't find info, they simply enroll elsewhere." },
    church: { title: "Missing the Next Generation", desc: "People look for spiritual homes online today. seekers will move to the one that welcomed them digitally first." },
    business: { title: "Your Clients are Online. Are You?", desc: "Every day you are invisible is a day your clients run to your competitors." },
    clinic: { title: "Patients Search Before They Visit", desc: "In a medical emergency, patients choose clinics with a strong online presence." }
};

let autoCycle;
let hasInteracted = false;

function startAutoCycle() {
    const sectors = Object.keys(sectorData);
    let index = 0;
    
    autoCycle = setInterval(() => {
        if (!hasInteracted) {
            showDetail(sectors[index]);
            index = (index + 1) % sectors.length;
        } else {
            clearInterval(autoCycle);
        }
    }, 9000);
}

function showDetail(sector) {
    // Stops the auto-cycle once they interact
    if(event && (event.type === 'mouseover' || event.type === 'click')) {
        hasInteracted = true; 
    }
    
    const box = document.getElementById('detail-box');
    const title = document.getElementById('detail-title');
    const desc = document.getElementById('detail-desc');

    document.querySelectorAll('.sector-item').forEach(item => {
        item.style.borderLeft = "none";
        item.style.background = "white";
        item.style.color = "var(--navy)";
    });

    const activeItem = document.querySelector(`[onmouseover="showDetail('${sector}')"]`);
    if(activeItem) {
        activeItem.style.borderLeft = "5px solid var(--orange)";
        activeItem.style.background = "#fff3e6";
    }

    if(box) {
        box.style.transform = "translateY(10px)";
        box.style.opacity = 0;
        
        setTimeout(() => {
            title.innerText = sectorData[sector].title;
            desc.innerText = sectorData[sector].desc;
            box.style.opacity = 1;
            box.style.transform = "translateY(0)";
        }, 200);
    }
}

// Solutions Section: Scroll Reveal
const revealCards = () => {
    const cards = document.querySelectorAll('.solution-card');
    const triggerBottom = window.innerHeight / 5 * 4;

    cards.forEach(card => {
        const cardTop = card.getBoundingClientRect().top;
        if(cardTop < triggerBottom) {
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
        }
    });
};

document.querySelectorAll('.solution-card').forEach(card => {
    card.style.opacity = "0";
    card.style.transform = "translateY(50px)";
    card.style.transition = "all 0.6s ease-out";
});

window.addEventListener('scroll', revealCards);

// Package scripts
function openPackageModal(packageName) {
    document.getElementById('packageModal').style.display = "block";
    document.getElementById('displayPackageName').innerText = packageName;
    document.getElementById('hiddenPackageInput').value = packageName;
}

function closePackageModal() {
    document.getElementById('packageModal').style.display = "none";
}

// Loader starts
function startLoader() {
    let percentage = 0;
    const countElement = document.getElementById('load-pc');
    const barFill = document.getElementById('bar-fill');
    const loader = document.getElementById('loader-wrapper');

    const interval = setInterval(() => {
        percentage += Math.floor(Math.random() * 5) + 2; 
        if (percentage >= 100) {
            percentage = 100;
            clearInterval(interval);
            setTimeout(() => {
                loader.classList.add('loader-hidden');
            }, 500);
        }
        if(countElement) countElement.innerText = percentage + "%";
        if(barFill) barFill.style.width = percentage + "%";
    }, 50);
}

startLoader();

// Intersection Observer for Sliders
document.addEventListener("DOMContentLoaded", function() {
    const observerOptions = { threshold: 0.15 };
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("reveal-active");
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal-left, .reveal-right, .reveal-bottom');
    revealElements.forEach(el => revealObserver.observe(el));
    
    // Start auto cycle after DOM is ready
    startAutoCycle();
});

// Advanced services modal logic
const solutionData = {
    'custom-sys': { title: "Custom Business Systems", body: "<ul><li>Manage records easily</li><li>Reduce paperwork</li><li>Access everything from one dashboard</li></ul><p><strong>Ideal for:</strong> Schools, NGOs, clinics, businesses</p>" },
    'mobile-apps': { title: "Mobile Applications (Android & iOS)", body: "<ul><li>Direct access from phones</li><li>Push notifications</li><li>Improve engagement</li></ul>" },
    'web-portals': { title: "Advanced Web Portals", body: "<ul><li>Online portals</li><li>Booking automation</li><li>Turns website into a working system</li></ul>" },
    'payments': { title: "Payments & Booking Systems", body: "<ul><li>Accept money anytime</li><li>Automate appointments</li></ul>" },
    'data-reporting': { title: "Data Management & Reporting", body: "<ul><li>Track performance</li><li>Generate reports instantly</li></ul>" },
    'secure-portals': { title: "Secure Login & User Portals", body: "<ul><li>Personalized dashboards</li><li>Encrypted access</li></ul>" },
    'automation': { title: "Automation & Workflow Systems", body: "<ul><li>Automatic email/SMS</li><li>Save hours of manual work</li></ul>" },
    'ecommerce': { title: "E-commerce & Online Stores", body: "<ul><li>Reach global customers</li><li>Accept orders 24/7</li></ul>" },
    'integration': { title: "System Integration", body: "<ul><li>Connect website, payments, and communication</li></ul>" },
    'cloud': { title: "Cloud-Based Solutions", body: "<ul><li>No physical servers needed</li><li>Work securely from anywhere</li></ul>" }
};

function openSolModal(key) {
    const modal = document.getElementById('solDetailModal');
    const contentArea = document.getElementById('solModalDynamicContent');
    const data = solutionData[key];

    if(data) {
        contentArea.innerHTML = `<h3>${data.title}</h3><div class="modal-list-body">${data.body}</div>`;
        modal.style.display = "block";
    }
}

function closeSolModal() {
    document.getElementById('solDetailModal').style.display = "none";
}

// --- FAQ Section Logic ---
function initFAQ() {
    const faqButtons = document.querySelectorAll('.faq-question');
    
    if (faqButtons.length > 0) {
        faqButtons.forEach(button => {
            button.addEventListener('click', () => {
                const faqItem = button.parentElement;
                
                // 1. Check if the item is already active
                const isActive = faqItem.classList.contains('active');
                
                // 2. Close all other FAQ items for a clean "Accordion" effect
                document.querySelectorAll('.faq-item').forEach(item => {
                    item.classList.remove('active');
                });
                
                // 3. If the clicked item wasn't active, open it
                if (!isActive) {
                    faqItem.classList.add('active');
                }
            });
        });
    }
}

// Add this to your DOMContentLoaded listener so it fires early
document.addEventListener("DOMContentLoaded", function() {
    // ... your other intersection observer code ...
    initFAQ(); 
});