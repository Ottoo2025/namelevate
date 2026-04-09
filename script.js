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

// hero section 
/*
const words = ["organization", "business", "school", "church", "clinic", "company"];
let i = 0;
let counter = 0;
const target = document.getElementById("typewriter");

function type() {
    let currentWord = words[i];
    if (counter < currentWord.length) {
        target.textContent += currentWord.charAt(counter);
        counter++;
        setTimeout(type, 100);
    } else {
        setTimeout(erase, 5000); // Stay for 5 seconds
    }
}

function erase() {
    if (counter > 0) {
        target.textContent = target.textContent.slice(0, -1);
        counter--;
        setTimeout(erase, 50); // Fast delete
    } else {
        i = (i + 1) % words.length;
        setTimeout(type, 500);
    }
}     */

    /* --- SINGLE SOURCE DUAL TYPEWRITER --- */
// We only declare these ONCE at the top of the script

const typewriterWords = ["NGO", "business", "school", "church", "clinic", "company"];
let typewriterIndex = 0;
let typewriterCharCounter = 0;

function handleTypewriting() {
    // Get both targets (Hero and What We Do)
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
        setTimeout(handleErasure, 5000); // Wait 5 seconds
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

/* --- UPDATED INITIALIZE --- */
// Make sure this is the ONLY window.onload in your file
window.onload = () => {
    handleTypewriting(); 
    if(typeof startAutoCycle === "function") {
        startAutoCycle(); 
    }
};

// Modal Logic 

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
    const modal = document.getElementById('contactModal');
    if (event.target == modal) { closeModal(); }
}

function closeModal() {
    document.getElementById('contactModal').style.display = "none";
}

window.onload = type;  
// form loader
const contactForm = document.querySelector('.contact-form');
const submitBtn = document.getElementById('submitBtn');
const btnText = document.getElementById('btnText');
const btnSpinner = document.getElementById('btnSpinner');

contactForm.addEventListener('submit', function() {
    // 1. Change button appearance
    submitBtn.classList.add('processing');
    
    // 2. Hide text and show spinner
    btnText.innerText = "Sending...";
    btnSpinner.style.display = "inline-block";
    
    // The form will now naturally proceed to mail.php
});

// Problem section
const sectorData = {
    ngo: {
        title: "Funding & Partnerships at Risk",
        desc: "Potential partners and donors search for you before they commit. If you aren't there, they can't trust your impact. A website is your digital proof of credibility."
    },
    school: {
        title: "Losing Students to Modern Competitors",
        desc: "Parents research the best schools online. If they can't find comprehensive info about your curriculum and facilities, they simply enroll elsewhere."
    },
    church: {
        title: "Missing the Next Generation",
        desc: "People look for spiritual homes online today. If your church is invisible, seekers will move to the one that welcomed them digitally first."
    },
    business: {
        title: "Your Clients are Online. Are You?",
        desc: "Every day you are invisible is a day your clients run to your competitors. Don't let your business be the best-kept secret in town."
    },
    clinic: {
        title: "Patients Search Before They Visit",
        desc: "In a medical emergency or for routine care, patients choose clinics with a strong online presence. Without it, they choose your visible competitors."
    }
};

function showDetail(sector) {
    const box = document.getElementById('detail-box');
    const title = document.getElementById('detail-title');
    const desc = document.getElementById('detail-desc');

    // Add a quick fade effect
    box.style.opacity = 0;
    
    setTimeout(() => {
        title.innerText = sectorData[sector].title;
        desc.innerText = sectorData[sector].desc;
        box.style.opacity = 1;
        box.style.borderLeft = "5px solid #ff8c00";
    }, 200);
}

// Add this to your existing script.js
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
    }, 3000); // Cycles every 3 seconds until they touch it
}

function showDetail(sector) {
    hasInteracted = true; // Stops the auto-cycle once they hover/tap
    const box = document.getElementById('detail-box');
    const title = document.getElementById('detail-title');
    const desc = document.getElementById('detail-desc');

    // Visual feedback on the list item
    document.querySelectorAll('.sector-item').forEach(item => {
        item.style.borderLeft = "none";
        item.style.background = "white";
        item.style.color = "var(--navy)";
    });

    // Highlight the active one
    const activeItem = document.querySelector(`[onmouseover="showDetail('${sector}')"]`);
    if(activeItem) {
        activeItem.style.borderLeft = "5px solid var(--orange)";
        activeItem.style.background = "#fff3e6"; // Very light orange tint
    }

    box.style.transform = "translateY(10px)";
    box.style.opacity = 0;
    
    setTimeout(() => {
        title.innerText = sectorData[sector].title;
        desc.innerText = sectorData[sector].desc;
        box.style.opacity = 1;
        box.style.transform = "translateY(0)";
    }, 200);
}

// Start the cycle when the page loads
window.addEventListener('load', startAutoCycle);

// solutions section
/* --- SOLUTIONS SECTION: SCROLL REVEAL --- */
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

// Set initial state for cards
document.querySelectorAll('.solution-card').forEach(card => {
    card.style.opacity = "0";
    card.style.transform = "translateY(50px)";
    card.style.transition = "all 0.6s ease-out";
});

window.addEventListener('scroll', revealCards);

// what we do section
/* --- DUAL TYPEWRITER LOGIC --- */

const words = ["NGO", "business", "school", "church", "clinic", "company"];
let i = 0;
let counter = 0;

// Targets for both sections
const targetHero = document.getElementById("typewriter");
const targetWWD = document.getElementById("typewriter2");

function type() {
    let currentWord = words[i];
    if (counter < currentWord.length) {
        let char = currentWord.charAt(counter);
        if(targetHero) targetHero.textContent += char;
        if(targetWWD) targetWWD.textContent += char;
        counter++;
        setTimeout(type, 100);
    } else {
        setTimeout(erase, 5000);
    }
}

function erase() {
    if (counter > 0) {
        let sliced = targetHero ? targetHero.textContent.slice(0, -1) : "";
        if(targetHero) targetHero.textContent = sliced;
        if(targetWWD) targetWWD.textContent = sliced;
        counter--;
        setTimeout(erase, 50);
    } else {
        i = (i + 1) % words.length;
        setTimeout(type, 500);
    }
}

/* --- UPDATED INITIALIZE --- */ 
window.onload = () => {
    type();           // This now updates BOTH typewriter sections at once!
    if(typeof startAutoCycle === "function") startAutoCycle(); 
};  


// customization request prefill
// This function tells your existing contact form what the user wants
function prefillCustomRequest() {
    const messageBox = document.querySelector('#contact textarea'); // Finds your contact message box
    if(messageBox) {
        messageBox.value = "I am interested in a custom digital project with Namelevate Technologies. Please contact me for a consultation.";
    }
}

// FAQ Section
document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        const faqItem = button.parentElement;
        
        // 1. Check if the item is already active
        const isActive = faqItem.classList.contains('active');
        
        // 2. Close all other FAQ items
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // 3. If the clicked item wasn't active, open it
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});


// Package script
function openPackageModal(packageName) {
    document.getElementById('packageModal').style.display = "block";
    document.getElementById('displayPackageName').innerText = packageName;
    document.getElementById('hiddenPackageInput').value = packageName;
}

function closePackageModal() {
    document.getElementById('packageModal').style.display = "none";
}

// Close if user clicks outside the white box
window.onclick = function(event) {
    let modal = document.getElementById('packageModal');
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


// Loader starts
function startLoader() {
    let percentage = 0;
    const countElement = document.getElementById('load-pc');
    const barFill = document.getElementById('bar-fill');
    const loader = document.getElementById('loader-wrapper');

    const interval = setInterval(() => {
        // Increment percentage
        percentage += Math.floor(Math.random() * 5) + 2; 
        
        if (percentage >= 100) {
            percentage = 100;
            clearInterval(interval);
            
            // Short delay at 100% for a smooth "medical" finish
            setTimeout(() => {
                loader.classList.add('loader-hidden');
            }, 500);
        }

        countElement.innerText = percentage + "%";
        barFill.style.width = percentage + "%";
    }, 50); // Speed of the progress
}

// Run immediately when script loads
startLoader();


//sliding script
document.addEventListener("DOMContentLoaded", function() {
    const observerOptions = {
        threshold: 0.15 // Trigger when 15% of the element is visible
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("reveal-active");
                // Optional: Stop observing once revealed to save memory
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Target all elements with reveal classes
    const revealElements = document.querySelectorAll('.reveal-left, .reveal-right, .reveal-bottom');
    
    revealElements.forEach(el => {
        revealObserver.observe(el);
    });
});


// Advanced services section - Scroll Reveal
// Hardcoded content for the Pop-up Modal
const solutionData = {
    'custom-sys': {
        title: "Custom Business Systems",
        body: "<ul><li>Manage records (students, members, clients) easily</li><li>Reduce paperwork and manual errors</li><li>Access everything from one dashboard</li></ul><p><strong>Ideal for:</strong> Schools, NGOs, clinics, businesses</p>"
    },
    'mobile-apps': {
        title: "Mobile Applications (Android & iOS)",
        body: "<ul><li>Direct access from client phones</li><li>Send push notifications instantly</li><li>Improve engagement and convenience</li></ul><p><strong>Example:</strong> School apps, church apps, booking platforms</p>"
    },
    'web-portals': {
        title: "Advanced Web Portals",
        body: "<ul><li>Online portals (student, staff login)</li><li>Booking automation systems</li><li>Turns your website into a working software, not just info.</li></ul>"
    },
    'payments': {
        title: "Payments & Booking Systems",
        body: "<ul><li>Accept money anytime (online/offline)</li><li>Automate appointments</li><li>Reduce missed client opportunities</li></ul>"
    },
    'data-reporting': {
        title: "Data Management & Reporting",
        body: "<ul><li>Track performance (students, patients, clients)</li><li>Generate reports instantly</li><li>Make data-driven decisions with ease</li></ul>"
    },
    'secure-portals': {
        title: "Secure Login & User Portals",
        body: "<ul><li>Personalized dashboards for students or staff</li><li>Secure, encrypted access</li><li>Users only see the data they need</li></ul>"
    },
    'automation': {
        title: "Automation & Workflow Systems",
        body: "<ul><li>Automatic email/SMS notifications</li><li>Digital registration systems</li><li>Save hours of manual approval work</li></ul>"
    },
    'ecommerce': {
        title: "E-commerce & Online Stores",
        body: "<ul><li>Reach customers beyond your physical location</li><li>Accept orders 24/7</li><li>Integrated inventory tracking</li></ul>"
    },
    'integration': {
        title: "System Integration",
        body: "<ul><li>Connect website, payments, and communication</li><li>No more scattered or double data entry</li><li>One smooth, unified operation</li></ul>"
    },
    'cloud': {
        title: "Cloud-Based Solutions",
        body: "<ul><li>No need for expensive physical servers</li><li>Work securely from anywhere in the world</li><li>Reliable data storage and backups</li></ul>"
    }
};

function openSolModal(key) {
    const modal = document.getElementById('solDetailModal');
    const contentArea = document.getElementById('solModalDynamicContent');
    const data = solutionData[key];

    if(data) {
        contentArea.innerHTML = `
            <h3>${data.title}</h3>
            <div class="modal-list-body">${data.body}</div>
        `;
        modal.style.display = "block";
    }
}

function closeSolModal() {
    document.getElementById('solDetailModal').style.display = "none";
}