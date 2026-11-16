
document.addEventListener("DOMContentLoaded", () => {

    // MOBILE NAVIGATION
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            const isOpen = navLinks.classList.toggle("open");

            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );
        });

        navLinks.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("open");
                menuToggle.setAttribute("aria-expanded", "false");
            });
        });
    }

    // SCROLL REVEAL ANIMATION
    const revealElements = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12
        });

        revealElements.forEach(element => {
            observer.observe(element);
        });
    } else {
        revealElements.forEach(element => {
            element.classList.add("visible");
        });
    }

    // BACK TO TOP BUTTON
    const backToTop = document.querySelector(".back-to-top");

    if (backToTop) {
        window.addEventListener("scroll", () => {
            backToTop.classList.toggle(
                "show",
                window.scrollY > 350
            );
        }, { passive: true });

        backToTop.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    // ACTIVE SIDEBAR SECTION
    const sections = document.querySelectorAll(
        ".lesson-section[id]"
    );

    const sidebarLinks = document.querySelectorAll(
        ".side-link[href^='#']"
    );

    if (sections.length && sidebarLinks.length &&
        "IntersectionObserver" in window) {

        const sectionObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    sidebarLinks.forEach(link => {
                        link.classList.toggle(
                            "active",
                            link.getAttribute("href") ===
                            "#" + entry.target.id
                        );
                    });
                }
            });
        }, {
            rootMargin: "-15% 0px -70% 0px"
        });

        sections.forEach(section => {
            sectionObserver.observe(section);
        });
    }

});
