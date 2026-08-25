/* =========================================
   ECOMMERCE GALLERY
========================================= */

const ecommerceImage =
    document.getElementById("ecommerceGalleryImage");

const ecommerceThumbnails =
    document.getElementById("ecommerceThumbnails");

const ecommercePrev =
    document.getElementById("ecommercePrev");

const ecommerceNext =
    document.getElementById("ecommerceNext");

const ecommerceCurrent =
    document.getElementById("ecommerceCurrent");

const ecommerceTotal =
    document.getElementById("ecommerceTotal");


/* =========================================
   SETTINGS
========================================= */

const firstImage = 1;
const lastImage = 26;

let currentImage = firstImage;


/* =========================================
   TOTAL
========================================= */

const totalImages =
    lastImage - firstImage + 1;

ecommerceTotal.textContent =
    String(totalImages).padStart(2, "0");


/* =========================================
   CREATE THUMBNAILS
========================================= */

for (
    let i = firstImage;
    i <= lastImage;
    i++
) {

    const number =
        String(i).padStart(2, "0");


    const button =
        document.createElement("button");


    button.className =
        "cooling-thumbnail";


    button.type = "button";


    if (i === firstImage) {

        button.classList.add("active");

    }


    button.dataset.index = i;


    const image =
        document.createElement("img");


    image.src =
        `ecommerce-${number}.jpg`;


    image.alt =
        `صورة ${number} من المتجر`;


    image.loading =
        "lazy";


    button.appendChild(image);


    ecommerceThumbnails.appendChild(
        button
    );


    button.addEventListener(
        "click",
        () => {

            showEcommerceImage(i);

        }
    );

}


/* =========================================
   SHOW IMAGE
========================================= */

function showEcommerceImage(index) {


    if (index < firstImage) {

        index = lastImage;

    }


    if (index > lastImage) {

        index = firstImage;

    }


    currentImage = index;


    const number =
        String(index).padStart(2, "0");


    ecommerceImage.style.opacity = "0";


    setTimeout(() => {

        ecommerceImage.src =
            `ecommerce-${number}.jpg`;

        ecommerceImage.style.opacity = "1";

    }, 120);


    ecommerceCurrent.textContent =
        number;


    /* REMOVE ACTIVE */

    document
        .querySelectorAll(
            "#ecommerceThumbnails .cooling-thumbnail"
        )
        .forEach((thumbnail) => {

            thumbnail.classList.remove(
                "active"
            );

        });


    /* ACTIVE THUMBNAIL */

    const activeThumbnail =
        document.querySelector(
            `#ecommerceThumbnails .cooling-thumbnail[data-index="${index}"]`
        );


    if (activeThumbnail) {

        activeThumbnail.classList.add(
            "active"
        );


        activeThumbnail.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "center"
        });

    }

}


/* =========================================
   PREVIOUS
========================================= */

ecommercePrev.addEventListener(
    "click",
    () => {

        showEcommerceImage(
            currentImage - 1
        );

    }
);


/* =========================================
   NEXT
========================================= */

ecommerceNext.addEventListener(
    "click",
    () => {

        showEcommerceImage(
            currentImage + 1
        );

    }
);


/* =========================================
   KEYBOARD
========================================= */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "ArrowLeft"
        ) {

            showEcommerceImage(
                currentImage + 1
            );

        }


        if (
            event.key === "ArrowRight"
        ) {

            showEcommerceImage(
                currentImage - 1
            );

        }

    }
);