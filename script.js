/* =========================================================
   ABREXO — WEBSITE JAVASCRIPT
========================================================= */

"use strict";


/* =========================================================
   PAGE LOADER
========================================================= */

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    if (!loader) return;

    setTimeout(() => {

        loader.classList.add("hide");

    }, 700);

});


/* =========================================================
   DOM ELEMENTS
========================================================= */

const navbar =
    document.getElementById("navbar");

const scrollProgress =
    document.getElementById("scrollProgress");

const navLinks =
    document.getElementById("navLinks");

const menuToggle =
    document.getElementById("menuToggle");

const cursorGlow =
    document.getElementById("cursorGlow");

const year =
    document.getElementById("year");


/* =========================================================
   CURRENT YEAR
========================================================= */

if (year) {

    year.textContent =
        new Date().getFullYear();

}


/* =========================================================
   NAVBAR SCROLL
========================================================= */

function updateNavbar() {

    if (!navbar) return;

    if (window.scrollY > 40) {

        navbar.classList.add("scrolled");

    } else {

        navbar.classList.remove("scrolled");

    }

}


/* =========================================================
   SCROLL PROGRESS
========================================================= */

function updateScrollProgress() {

    if (!scrollProgress) return;

    const scrollTop =
        window.scrollY;

    const documentHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

    if (documentHeight <= 0) {

        scrollProgress.style.width = "0%";

        return;

    }

    const progress =
        (scrollTop / documentHeight) * 100;

    scrollProgress.style.width =
        `${progress}%`;

}


/* =========================================================
   SCROLL EVENT
========================================================= */

window.addEventListener(
    "scroll",
    () => {

        updateNavbar();
        updateScrollProgress();

    },
    {
        passive: true
    }
);


/* Initial state */

updateNavbar();
updateScrollProgress();


/* =========================================================
   MOBILE MENU
========================================================= */

if (menuToggle && navLinks) {

    menuToggle.addEventListener(
        "click",
        () => {

            const isOpen =
                navLinks.classList.toggle("active");

            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

        }
    );


    /* Close menu after clicking link */

    navLinks
        .querySelectorAll("a")
        .forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    navLinks.classList.remove(
                        "active"
                    );

                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }
            );

        });

}


/* =========================================================
   ESCAPE KEY CLOSE MENU
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (event.key !== "Escape") return;

        if (!navLinks || !menuToggle) return;

        navLinks.classList.remove("active");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

    }
);


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements =
    document.querySelectorAll(".reveal");


if ("IntersectionObserver" in window) {

    const revealObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "active"
                            );

                            revealObserver.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -50px 0px"
            }
        );


    revealElements.forEach(
        element => {

            revealObserver.observe(element);

        }
    );

} else {

    revealElements.forEach(
        element => {

            element.classList.add("active");

        }
    );

}


/* =========================================================
   STAGGERED REVEAL
========================================================= */

document
    .querySelectorAll(".services-grid")
    .forEach(grid => {

        const cards =
            grid.querySelectorAll(".service-card");

        cards.forEach(
            (card, index) => {

                card.style.transitionDelay =
                    `${index * 70}ms`;

            }
        );

    });


document
    .querySelectorAll(".course-grid")
    .forEach(grid => {

        const modules =
            grid.querySelectorAll(".course-module");

        modules.forEach(
            (module, index) => {

                module.style.transitionDelay =
                    `${index * 50}ms`;

            }
        );

    });


document
    .querySelectorAll(".founders-grid")
    .forEach(grid => {

        const cards =
            grid.querySelectorAll(".founder-card");

        cards.forEach(
            (card, index) => {

                card.style.transitionDelay =
                    `${index * 120}ms`;

            }
        );

    });


/* =========================================================
   CURSOR GLOW
========================================================= */

if (
    cursorGlow &&
    window.matchMedia("(pointer: fine)").matches
) {

    let mouseX = 0;
    let mouseY = 0;

    let currentX = 0;
    let currentY = 0;


    window.addEventListener(
        "mousemove",
        event => {

            mouseX =
                event.clientX;

            mouseY =
                event.clientY;

        },
        {
            passive: true
        }
    );


    function animateCursor() {

        currentX +=
            (mouseX - currentX) * 0.12;

        currentY +=
            (mouseY - currentY) * 0.12;


        cursorGlow.style.left =
            `${currentX}px`;

        cursorGlow.style.top =
            `${currentY}px`;


        requestAnimationFrame(
            animateCursor
        );

    }


    animateCursor();

}


/* =========================================================
   3D TILT CARDS
========================================================= */

const tiltCards =
    document.querySelectorAll("[data-tilt]");


if (
    window.matchMedia("(pointer: fine)").matches
) {

    tiltCards.forEach(card => {

        let rect;


        card.addEventListener(
            "mouseenter",
            () => {

                rect =
                    card.getBoundingClientRect();

            }
        );


        card.addEventListener(
            "mousemove",
            event => {

                if (!rect) {

                    rect =
                        card.getBoundingClientRect();

                }


                const x =
                    event.clientX -
                    rect.left;

                const y =
                    event.clientY -
                    rect.top;


                const centerX =
                    rect.width / 2;

                const centerY =
                    rect.height / 2;


                const rotateX =
                    ((y - centerY) /
                        centerY) * -3;


                const rotateY =
                    ((x - centerX) /
                        centerX) * 3;


                card.style.transform =
                    `perspective(1000px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     translateY(-4px)`;

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform =
                    "";

                rect = null;

            }
        );

    });

}


/* =========================================================
   HERO PARALLAX
========================================================= */

const hero =
    document.querySelector(".hero");

const heroOrbit =
    document.querySelector(".hero-orbit");


if (
    hero &&
    heroOrbit &&
    window.matchMedia("(pointer: fine)").matches
) {

    window.addEventListener(
        "scroll",
        () => {

            const scroll =
                window.scrollY;

            if (scroll > window.innerHeight) {
                return;
            }


            heroOrbit.style.transform =
                `translateY(${scroll * 0.12}px)
                 rotate(${scroll * 0.04}deg)`;

        },
        {
            passive: true
        }
    );

}


/* =========================================================
   SMOOTH ANCHOR FALLBACK
========================================================= */

document
    .querySelectorAll('a[href^="#"]')
    .forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const targetId =
                    link.getAttribute("href");


                if (
                    !targetId ||
                    targetId === "#"
                ) {

                    return;

                }


                const target =
                    document.querySelector(
                        targetId
                    );


                if (!target) {

                    return;

                }


                event.preventDefault();


                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }
        );

    });


/* =========================================================
   COURSE PRICE CARD EFFECT
========================================================= */

const priceCard =
    document.querySelector(
        ".course-price-card"
    );


if (
    priceCard &&
    window.matchMedia("(pointer: fine)").matches
) {

    priceCard.addEventListener(
        "mousemove",
        event => {

            const rect =
                priceCard.getBoundingClientRect();


            const x =
                event.clientX -
                rect.left;


            const y =
                event.clientY -
                rect.top;


            priceCard.style.background =
                `radial-gradient(
                    circle at ${x}px ${y}px,
                    rgba(255,255,255,.13),
                    rgba(255,255,255,.025) 45%
                )`;

        }
    );


    priceCard.addEventListener(
        "mouseleave",
        () => {

            priceCard.style.background =
                "linear-gradient(135deg, rgba(255,255,255,.07), rgba(255,255,255,.025))";

        }
    );

}


/* =========================================================
   FOUNDER IMAGE SAFETY
========================================================= */

document
    .querySelectorAll(".founder-photo img")
    .forEach(img => {

        img.addEventListener(
            "error",
            () => {

                console.warn(
                    `ABREXO: Founder image could not be loaded: ${img.src}`
                );

            }
        );

    });


/* =========================================================
   PREVENT 3D EFFECT ON MOBILE
========================================================= */

function handleResponsiveEffects() {

    const isMobile =
        window.innerWidth <= 760;


    if (isMobile) {

        tiltCards.forEach(card => {

            card.style.transform = "";

        });

    }

}


window.addEventListener(
    "resize",
    handleResponsiveEffects,
    {
        passive: true
    }
);


handleResponsiveEffects();


/* =========================================================
   IMAGE LOADING
========================================================= */

document
    .querySelectorAll("img")
    .forEach(img => {

        if (img.complete) {

            img.classList.add("loaded");

        } else {

            img.addEventListener(
                "load",
                () => {

                    img.classList.add(
                        "loaded"
                    );

                }
            );

        }

    });


/* =========================================================
   CONSOLE BRAND MESSAGE
========================================================= */

console.log(
    "%cABREXO",
    "font-size:30px;font-weight:800;"
);

console.log(
    "%cIdeas that move brands.",
    "font-size:14px;"
);