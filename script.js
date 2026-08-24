document.addEventListener("DOMContentLoaded", () => {

    /* =================================
       NAVBAR
    ================================= */

    const navbar = document.querySelector(".navbar");

    const updateNavbar = () => {

        if (!navbar) return;

        if (window.scrollY > 40) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }

    };

    window.addEventListener("scroll", updateNavbar);

    updateNavbar();


    /* =================================
       SCROLL REVEAL
    ================================= */

    const revealElements = document.querySelectorAll(
        ".problem-card, " +
        ".project-card, " +
        ".about-content, " +
        ".about-panel, " +
        ".tech-card, " +
        ".contact-box"
    );

    revealElements.forEach((element) => {
        element.classList.add("reveal");
    });


    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) return;

                entry.target.classList.add("show");

                observer.unobserve(entry.target);

            });

        },
        {
            threshold: 0.12
        }
    );


    revealElements.forEach((element) => {
        revealObserver.observe(element);
    });


    /* =================================
       ACTIVE NAV LINK
    ================================= */

    const sections = document.querySelectorAll(
        "section[id]"
    );

    const navLinks = document.querySelectorAll(
        ".nav-links a"
    );


    const activeSectionObserver = new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) return;

                const id = entry.target.getAttribute("id");

                navLinks.forEach((link) => {

                    link.classList.remove("active");

                    if (
                        link.getAttribute("href") === `#${id}`
                    ) {
                        link.classList.add("active");
                    }

                });

            });

        },
        {
            threshold: 0.35
        }
    );


    sections.forEach((section) => {
        activeSectionObserver.observe(section);
    });


    /* =================================
       SMOOTH SCROLL
    ================================= */

    document.querySelectorAll(
        'a[href^="#"]'
    ).forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId =
                link.getAttribute("href");

            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    /* =================================
       BACK TO TOP
    ================================= */

    const topButton =
        document.createElement("button");

    topButton.className = "back-to-top";

    topButton.innerHTML = "↑";

    topButton.setAttribute(
        "aria-label",
        "العودة إلى أعلى الصفحة"
    );

    document.body.appendChild(topButton);


    const updateTopButton = () => {

        if (window.scrollY > 700) {

            topButton.classList.add("visible");

        } else {

            topButton.classList.remove("visible");

        }

    };


    window.addEventListener(
        "scroll",
        updateTopButton
    );

    updateTopButton();


    topButton.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );


    /* =================================
       PROJECT CARD TILT
    ================================= */

    const projectCards =
        document.querySelectorAll(
            ".project-card"
        );


    projectCards.forEach((card) => {

        card.addEventListener(
            "mousemove",
            (event) => {

                if (
                    window.innerWidth <= 850
                ) {
                    return;
                }

                const rect =
                    card.getBoundingClientRect();

                const x =
                    event.clientX - rect.left;

                const y =
                    event.clientY - rect.top;

                const centerX =
                    rect.width / 2;

                const centerY =
                    rect.height / 2;

                const rotateY =
                    ((x - centerX) / centerX) * 2;

                const rotateX =
                    ((centerY - y) / centerY) * 1.5;

                card.style.transform =
                    `perspective(1000px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     translateY(-6px)`;

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform = "";

            }
        );

    });


    /* =================================
       CONTACT TERMINAL
    ================================= */

    const terminalCursor =
        document.querySelector(
            ".terminal-cursor"
        );

    if (terminalCursor) {

        setInterval(() => {

            terminalCursor.style.opacity =
                terminalCursor.style.opacity === "0"
                    ? "1"
                    : "0";

        }, 500);

    }


    /* =================================
       CURRENT YEAR
    ================================= */

    const yearElements =
        document.querySelectorAll(
            ".current-year"
        );

    yearElements.forEach((element) => {

        element.textContent =
            new Date().getFullYear();

    });

});
/* =========================================
   NETWORK BACKGROUND
========================================= */

const networkCanvas =
    document.getElementById("networkCanvas");

if (networkCanvas) {

    const ctx =
        networkCanvas.getContext("2d");

    let particles = [];

    let animationFrame;

    const isMobile =
        window.innerWidth <= 600;


    const settings = {

    particleCount:
        isMobile ? 65 : 125,

    connectionDistance:
        isMobile ? 145 : 180,

    particleSpeed:
        isMobile ? 0.12 : 0.18,

    particleSize:
        isMobile ? 1.3 : 1.6

};

    /* =========================================
       RESIZE
    ========================================= */

    function resizeNetwork() {

        const rect =
            networkCanvas.parentElement.getBoundingClientRect();

        const dpr =
            Math.min(window.devicePixelRatio || 1, 2);

        networkCanvas.width =
            rect.width * dpr;

        networkCanvas.height =
            rect.height * dpr;

        networkCanvas.style.width =
            rect.width + "px";

        networkCanvas.style.height =
            rect.height + "px";

        ctx.setTransform(
            dpr,
            0,
            0,
            dpr,
            0,
            0
        );

        createParticles(
            rect.width,
            rect.height
        );
    }


    /* =========================================
       CREATE PARTICLES
    ========================================= */

    function createParticles(width, height) {

        particles = [];

        for (
            let i = 0;
            i < settings.particleCount;
            i++
        ) {

            particles.push({

                x:
                    Math.random() * width,

                y:
                    Math.random() * height,

                vx:
                    (Math.random() - 0.5)
                    * settings.particleSpeed,

                vy:
                    (Math.random() - 0.5)
                    * settings.particleSpeed,

                size:
                    Math.random()
                    * settings.particleSize
                    + 0.7,

                opacity:
                    Math.random()
                    * 0.55
                    + 0.25

            });

        }

    }


    /* =========================================
       DRAW PARTICLES
    ========================================= */

    function drawParticles(width, height) {

        particles.forEach((particle) => {

            particle.x += particle.vx;

            particle.y += particle.vy;


            /* رجوع سلس من الأطراف */

            if (particle.x < -20) {
                particle.x = width + 20;
            }

            if (particle.x > width + 20) {
                particle.x = -20;
            }

            if (particle.y < -20) {
                particle.y = height + 20;
            }

            if (particle.y > height + 20) {
                particle.y = -20;
            }


            /* النقطة */

            ctx.beginPath();

            ctx.arc(
                particle.x,
                particle.y,
                particle.size,
                0,
                Math.PI * 2
            );

            ctx.fillStyle =
                `rgba(255, 90, 31, ${particle.opacity})`;

            ctx.fill();


            /* Glow */

            ctx.beginPath();

            ctx.arc(
                particle.x,
                particle.y,
                particle.size * 3,
                0,
                Math.PI * 2
            );

            ctx.fillStyle =
                `rgba(255, 90, 31, ${particle.opacity * 0.08})`;

            ctx.fill();

        });

    }


    /* =========================================
       DRAW CONNECTIONS
    ========================================= */

    function drawConnections() {

    for (
        let i = 0;
        i < particles.length;
        i++
    ) {

        for (
            let j = i + 1;
            j < particles.length;
            j++
        ) {

            const p1 = particles[i];
            const p2 = particles[j];

            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;

            const distance = Math.sqrt(
                dx * dx + dy * dy
            );


            if (
                distance <=
                settings.connectionDistance
            ) {

                /*
                 * كلما قربت النقطتين
                 * الخط يبقى أوضح
                 */

                const strength =
                    1 -
                    (
                        distance /
                        settings.connectionDistance
                    );


                const opacity =
                    0.20 +
                    strength * 0.42;


                ctx.beginPath();

                ctx.moveTo(
                    p1.x,
                    p1.y
                );

                ctx.lineTo(
                    p2.x,
                    p2.y
                );


                ctx.strokeStyle =
                    `rgba(
                        255,
                        90,
                        31,
                        ${opacity}
                    )`;


                ctx.lineWidth =
                    0.8 +
                    strength * 0.7;


                ctx.stroke();

            }

        }

    }

}


    /* =========================================
       ANIMATION
    ========================================= */

    function animateNetwork() {

        const rect =
            networkCanvas.parentElement.getBoundingClientRect();

        const width =
            rect.width;

        const height =
            rect.height;


        ctx.clearRect(
            0,
            0,
            width,
            height
        );


        drawConnections();

        drawParticles(
            width,
            height
        );


        animationFrame =
            requestAnimationFrame(
                animateNetwork
            );

    }


    /* =========================================
       START
    ========================================= */

    resizeNetwork();

    animateNetwork();


    /* =========================================
       WINDOW RESIZE
    ========================================= */

    let resizeTimeout;

    window.addEventListener(
        "resize",
        () => {

            clearTimeout(
                resizeTimeout
            );

            resizeTimeout =
                setTimeout(
                    resizeNetwork,
                    200
                );

        }
    );


    /* =========================================
       STOP WHEN PAGE IS NOT VISIBLE
    ========================================= */

    document.addEventListener(
        "visibilitychange",
        () => {

            if (
                document.hidden
            ) {

                cancelAnimationFrame(
                    animationFrame
                );

            } else {

                animateNetwork();

            }

        }
    );

}
/* =========================================
   COOLING PROJECT GALLERY + VIDEO
========================================= */

const coolingMainImage =
    document.getElementById("coolingMainImage");

const coolingVideo =
    document.getElementById("coolingVideo");

const coolingThumbs =
    document.querySelectorAll(".project-thumb");

const coolingDemoBtn =
    document.getElementById("coolingDemoBtn");


/* =========================================
   CHANGE PROJECT IMAGE
========================================= */

coolingThumbs.forEach((thumb) => {

    thumb.addEventListener("click", () => {

        const image =
            thumb.dataset.image;

        if (!coolingMainImage || !image) {
            return;
        }


        /* إيقاف الفيديو */

        if (coolingVideo) {

            coolingVideo.pause();

            coolingVideo.currentTime = 0;

            coolingVideo.style.display = "none";
        }


        /* إظهار الصورة */

        coolingMainImage.style.display = "block";

        coolingMainImage.style.opacity = "0";


        setTimeout(() => {

            coolingMainImage.src = image;

            coolingMainImage.style.opacity = "1";

        }, 150);


        /* تغيير الصورة النشطة */

        coolingThumbs.forEach((item) => {

            item.classList.remove("active");

        });

        thumb.classList.add("active");

    });

});


/* =========================================
   PLAY PROJECT VIDEO
========================================= */

if (coolingDemoBtn) {

    coolingDemoBtn.addEventListener("click", () => {

        if (!coolingVideo) {
            console.error(
                "لم يتم العثور على عنصر coolingVideo"
            );

            return;
        }


        /* إخفاء الصورة */

        if (coolingMainImage) {

            coolingMainImage.style.display = "none";

        }


        /* إظهار الفيديو */

        coolingVideo.style.display = "block";


        /* تشغيل الفيديو */

        coolingVideo.play().catch((error) => {

            console.log(
                "اضغط Play لتشغيل الفيديو:",
                error
            );

        });

    });

}