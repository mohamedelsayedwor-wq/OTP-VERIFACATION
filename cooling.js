const galleryImage =
    document.getElementById("coolingGalleryImage");

const thumbnails =
    document.getElementById("coolingThumbnails");

const prevButton =
    document.getElementById("coolingPrev");

const nextButton =
    document.getElementById("coolingNext");

const currentCounter =
    document.getElementById("coolingCurrent");

let currentImage = 1;

const totalImages = 10;


/* ===============================
   CREATE THUMBNAILS
================================ */

for (let i = 1; i <= totalImages; i++) {

    const number = String(i).padStart(2, "0");

    const button = document.createElement("button");

    button.className = "cooling-thumbnail";

    if (i === 1) {
        button.classList.add("active");
    }

    button.dataset.index = i;

    const image = document.createElement("img");

    image.src = `cooling-${number}.jpg`;

    image.alt =
        `صورة ${i} من مشروع التبريد والتكييف`;

    image.loading = "lazy";

    button.appendChild(image);

    thumbnails.appendChild(button);


    button.addEventListener("click", () => {
        showImage(i);
    });

}


/* ===============================
   SHOW IMAGE
================================ */

function showImage(index) {

    if (index < 1) {
        index = totalImages;
    }

    if (index > totalImages) {
        index = 1;
    }

    currentImage = index;

    const number =
        String(index).padStart(2, "0");


    galleryImage.style.opacity = "0";


    setTimeout(() => {

        galleryImage.src =
            `cooling-${number}.jpg`;

        galleryImage.style.opacity = "1";

    }, 120);


    currentCounter.textContent = number;


    document
        .querySelectorAll(".cooling-thumbnail")
        .forEach((thumbnail) => {

            thumbnail.classList.remove("active");

        });


    const activeThumbnail =
        document.querySelector(
            `.cooling-thumbnail[data-index="${index}"]`
        );


    if (activeThumbnail) {

        activeThumbnail.classList.add("active");

        activeThumbnail.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "center"
        });

    }

}


/* ===============================
   PREVIOUS
================================ */

prevButton.addEventListener("click", () => {

    showImage(currentImage - 1);

});


/* ===============================
   NEXT
================================ */

nextButton.addEventListener("click", () => {

    showImage(currentImage + 1);

});


/* ===============================
   KEYBOARD
================================ */

document.addEventListener("keydown", (event) => {

    if (event.key === "ArrowLeft") {

        showImage(currentImage + 1);

    }

    if (event.key === "ArrowRight") {

        showImage(currentImage - 1);

    }

});