// Navbar Shadow on Scroll
const header = document.querySelector("header");

window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        header.style.boxShadow = "0 5px 20px rgba(0, 0, 0, 0.25)";
    } else {
        header.style.boxShadow = "none";
    }
});

// Scroll Reveal Animation
const sections = document.querySelectorAll(".section");

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    },
    { threshold: 0.15 }
);

sections.forEach((section) => {
    observer.observe(section);
});

// Mobile Nav Toggle
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("active");
        navToggle.classList.toggle("active", isOpen);
        navToggle.setAttribute("aria-expanded", isOpen);
    });

    navLinks.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("active");
            navToggle.classList.remove("active");
            navToggle.setAttribute("aria-expanded", "false");
        });
    });
}

// Project Card Animation Delay
const projectCards = document.querySelectorAll(".project-card");
projectCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 100}ms`;
});

// Theme Toggle Functionality
const themeToggleBtn = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");
const themeText = document.getElementById("theme-text");

if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
        document.body.classList.toggle("light-theme");
        const isLight = document.body.classList.contains("light-theme");
        
        themeIcon.textContent = isLight ? "☀️" : "🌙";
        themeText.textContent = isLight ? "Light" : "Dark";
    });
}

document.getElementById("emailButton").addEventListener("click", function (event) {
    event.preventDefault();

    const email = "sharmamitash23@gmail.com";

    // Detect mobile devices
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    if (isMobile) {
        // Let the phone open Gmail or its default email app
        window.location.href = `mailto:${email}`;
    } else {
        // Desktop: open Gmail Compose
        const gmailUrl =
            `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}`;

        window.open(gmailUrl, "_blank");
    }
});