```javascript
// ===== NSSEDGK WEBSITE JAVASCRIPT =====

document.addEventListener("DOMContentLoaded", function () {

    // Get all website sections
    const sections = document.querySelectorAll("body > section");

    // Get navigation elements
    const navLinks = document.querySelectorAll("nav a");
    const menuBtn = document.querySelector(".menu-btn");
    const nav = document.querySelector("nav");


    // ===== SHOW SELECTED PAGE =====

    function showPage(pageId) {

        const pageExists = Array.from(sections).some(
            section => section.id === pageId
        );

        // If page does not exist, show Home
        if (!pageExists) {
            pageId = "home";
        }

        // Hide all sections except selected section
        sections.forEach(section => {
            section.hidden = section.id !== pageId;
        });

        // Highlight active navigation link
        navLinks.forEach(link => {

            const linkPage = link.getAttribute("href").substring(1);

            if (linkPage === pageId) {
                link.classList.add("active");
            } else {
                link.classList.remove("active");
            }

        });

        // Scroll to top
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }


    // ===== NAVIGATION CLICK =====

    navLinks.forEach(link => {

        link.addEventListener("click", function (event) {

            const pageId = this.getAttribute("href").substring(1);

            event.preventDefault();

            showPage(pageId);

            // Update browser URL
            if (window.location.hash !== "#" + pageId) {
                history.pushState(null, "", "#" + pageId);
            }

            // Close mobile menu
            if (nav) {
                nav.classList.remove("open");
            }

        });

    });


    // ===== LOGO CLICK =====

    const logo = document.querySelector(".logo");

    if (logo) {
        logo.addEventListener("click", function (event) {

            event.preventDefault();

            showPage("home");

            history.pushState(null, "", "#home");

            if (nav) {
                nav.classList.remove("open");
            }

        });
    }


    // ===== MOBILE MENU =====

    if (menuBtn && nav) {

        menuBtn.addEventListener("click", function () {

            nav.classList.toggle("open");

            const isOpen = nav.classList.contains("open");

            menuBtn.setAttribute("aria-expanded", isOpen);

        });

    }


    // ===== HOME BUTTONS / OTHER SECTION LINKS =====

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        if (link.closest("nav") || link.classList.contains("logo")) {
            return;
        }

        link.addEventListener("click", function (event) {

            const pageId = this.getAttribute("href").substring(1);

            const target = document.getElementById(pageId);

            if (target && target.tagName === "SECTION") {

                event.preventDefault();

                showPage(pageId);

                history.pushState(null, "", "#" + pageId);

                if (nav) {
                    nav.classList.remove("open");
                }

            }

        });

    });


    // ===== BROWSER BACK / FORWARD BUTTONS =====

    window.addEventListener("popstate", function () {

        const pageId = window.location.hash.substring(1);

        showPage(pageId || "home");

    });


    // ===== SHOW PAGE WHEN WEBSITE OPENS =====

    const initialPage = window.location.hash.substring(1);

    showPage(initialPage || "home");

});
```