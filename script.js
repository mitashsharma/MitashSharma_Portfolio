/* ============================================================
   Mitash Sharma — Portfolio
   Single shared script for EVERY page. Light theme only.
   Pure vanilla JS — no frameworks or libraries.
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    /* ---------- Footer year (keeps every page in sync) ---------- */
    document.querySelectorAll("[data-year]").forEach((el) => {
        el.textContent = new Date().getFullYear();
    });

    /* ---------- Header shadow + scroll progress + back-to-top ---------- */
    const header = document.querySelector("header");
    const progress = document.querySelector(".scroll-progress");
    const backToTop = document.querySelector(".back-to-top");

    function onScroll() {
        const y = window.scrollY;
        if (header) header.classList.toggle("scrolled", y > 40);
        if (backToTop) backToTop.classList.toggle("visible", y > 600);

        if (progress) {
            const max = document.documentElement.scrollHeight - window.innerHeight;
            progress.style.width = (max > 0 ? (y / max) * 100 : 0) + "%";
        }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    if (backToTop) {
        backToTop.addEventListener("click", () =>
            window.scrollTo({ top: 0, behavior: "smooth" })
        );
    }

    /* ---------- Mobile navigation ---------- */
    const navToggle = document.querySelector(".nav-toggle");
    const navLinks = document.querySelector(".nav-links");

    function closeNav() {
        if (!navLinks || !navToggle) return;
        navLinks.classList.remove("active");
        navToggle.classList.remove("active");
        navToggle.setAttribute("aria-expanded", "false");
    }

    if (navToggle && navLinks) {
        navToggle.addEventListener("click", () => {
            const isOpen = navLinks.classList.toggle("active");
            navToggle.classList.toggle("active", isOpen);
            navToggle.setAttribute("aria-expanded", String(isOpen));
        });

        navLinks.querySelectorAll("a").forEach((link) =>
            link.addEventListener("click", closeNav)
        );

        document.addEventListener("click", (e) => {
            if (!e.target.closest(".navbar")) closeNav();
        });

        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape") closeNav();
        });
    }

    /* ---------- Active nav highlighting (same rules on every page) ---------- */
    const page = window.location.pathname.split("/").pop() || "index.html";
    const isHome = page === "index.html" || page === "";
    const navAnchors = document.querySelectorAll(".nav-links a[data-nav]");

    function setActive(key) {
        navAnchors.forEach((a) =>
            a.classList.toggle("active", a.dataset.nav === key)
        );
    }

    const detailPages = [
        "visualizer.html",
        "gesture.html",
        "chatbot.html",
        "error-detector.html",
        "loan-approver.html",
        "ml_studio.html",
    ];

    if (page === "projects.html" || detailPages.includes(page)) {
        setActive("projects");
    } else if (page === "certificates.html") {
        setActive("certificates");
    } else if (isHome) {
        // Scroll-spy for the one-page home sections
        setActive("home");
        const spySections = document.querySelectorAll(
            "#home, #about, #skills, #projects, #contact"
        );
        const spy = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActive(entry.target.id);
                });
            },
            { rootMargin: "-40% 0px -55% 0px" }
        );
        spySections.forEach((s) => spy.observe(s));
    }

    /* ---------- Scroll-reveal animations ---------- */
    const revealTargets = document.querySelectorAll(
        ".section, .project-card, .cert-card, .project-section, " +
        ".about-card, .skill-category, .internship-summary-card, .hero-card"
    );

    // Stagger cards that share a grid row container
    document
        .querySelectorAll(
            ".projects-container, .projects-grid, .certificates-grid, " +
            ".about-highlights, .skills-container"
        )
        .forEach((grid) => {
            Array.from(grid.children).forEach((child, i) => {
                child.style.transitionDelay = `${Math.min(i, 5) * 90}ms`;
            });
        });

    if ("IntersectionObserver" in window) {
        const revealer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("revealed");
                        revealer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12 }
        );
        revealTargets.forEach((el) => {
            el.classList.add("reveal");
            revealer.observe(el);
        });
    }

    /* ---------- Lightbox for screenshots & certificate previews ---------- */
    const lightbox = document.querySelector(".lightbox");
    const lightboxImg = lightbox ? lightbox.querySelector("img") : null;
    const lightboxCaption = lightbox ? lightbox.querySelector(".lightbox-caption") : null;

    function closeLightbox() {
        if (!lightbox) return;
        lightbox.classList.remove("open");
        document.body.style.overflow = "";
    }

    if (lightbox && lightboxImg) {
        document
            .querySelectorAll(".project-images img, .cert-image-preview img")
            .forEach((img) => {
                img.setAttribute("loading", "lazy");
                img.setAttribute("title", "Click to view full screenshot");
                // Gracefully hide any screenshot whose file is missing
                img.addEventListener("error", () => { img.style.display = "none"; });
                img.addEventListener("click", () => {
                    lightboxImg.src = img.src;
                    lightboxImg.alt = img.alt || "";
                    if (lightboxCaption) {
                        lightboxCaption.textContent = img.alt || "";
                        lightboxCaption.style.display = img.alt ? "" : "none";
                    }
                    lightbox.classList.add("open");
                    document.body.style.overflow = "hidden";
                });
            });

        lightbox.addEventListener("click", (e) => {
            if (e.target !== lightboxImg) closeLightbox();
        });
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape") closeLightbox();
        });
    }

    /* ---------- Email button: Gmail compose on desktop, mail app on mobile ---------- */
    const emailButton = document.getElementById("emailButton");
    if (emailButton) {
        emailButton.addEventListener("click", (event) => {
            event.preventDefault();
            const email = "sharmamitash23@gmail.com";
            const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
            if (isMobile) {
                window.location.href = `mailto:${email}`;
            } else {
                window.open(
                    `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}`,
                    "_blank",
                    "noopener"
                );
            }
        });
    }
});
