/* =========================================
   CODEXA GALLERY
========================================= */

const codexaImage =
    document.getElementById("codexaGalleryImage");

const codexaThumbnails =
    document.getElementById("codexaThumbnails");

const codexaPrev =
    document.getElementById("codexaPrev");

const codexaNext =
    document.getElementById("codexaNext");

const codexaCurrent =
    document.getElementById("codexaCurrent");



/* =========================================
   IMAGE SETTINGS
========================================= */

const firstImage = 1;

const lastImage = 12;

let currentImage = firstImage;



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


    if (i === firstImage) {

        button.classList.add("active");

    }


    button.dataset.index = i;


    const image =
        document.createElement("img");


    image.src =
        `codexa-${number}.jpg`;


    image.alt =
        `CODEXA ${number}`;


    image.loading =
        "lazy";


    button.appendChild(image);


    codexaThumbnails.appendChild(button);


    button.addEventListener(
        "click",
        () => {

            showCodexaImage(i);

        }
    );

}



/* =========================================
   SHOW IMAGE
========================================= */

function showCodexaImage(index) {


    if (index < firstImage) {

        index = lastImage;

    }


    if (index > lastImage) {

        index = firstImage;

    }


    currentImage = index;


    const number =
        String(index).padStart(2, "0");


    codexaImage.style.opacity = "0";


    setTimeout(() => {

        codexaImage.src =
            `codexa-${number}.jpg`;

        codexaImage.style.opacity = "1";

    }, 120);


    codexaCurrent.textContent =
        number;



    /* REMOVE ACTIVE */

    document
        .querySelectorAll(
            "#codexaThumbnails .cooling-thumbnail"
        )
        .forEach((thumbnail) => {

            thumbnail.classList.remove(
                "active"
            );

        });



    /* ADD ACTIVE */

    const activeThumbnail =
        document.querySelector(
            `#codexaThumbnails .cooling-thumbnail[data-index="${index}"]`
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

codexaPrev.addEventListener(
    "click",
    () => {

        showCodexaImage(
            currentImage - 1
        );

    }
);



/* =========================================
   NEXT
========================================= */

codexaNext.addEventListener(
    "click",
    () => {

        showCodexaImage(
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


        if (event.key === "ArrowLeft") {

            showCodexaImage(
                currentImage + 1
            );

        }


        if (event.key === "ArrowRight") {

            showCodexaImage(
                currentImage - 1
            );

        }

    }
);