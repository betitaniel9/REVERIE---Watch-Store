let current = 0;

const carousel = document.querySelector(".carousel");
const title = document.getElementById("title");
const desc = document.getElementById("desc");

// One persistent <img> per watch so the CSS position transitions can animate
// them moving between slots, instead of swapping .src on fixed elements.
const images = watches.map((watch) => {
    const img = document.createElement("img");
    img.src = watch.image;
    img.className = "watch";
    carousel.appendChild(img);
    return img;
});

function updateCarousel() {

    images.forEach((img, index) => {
        const offset = (index - current + watches.length) % watches.length;

        img.classList.remove("active", "left", "right");

        if (offset === 0) {
            img.classList.add("active");
        } else if (offset === 1) {
            img.classList.add("right");
        } else {
            img.classList.add("left");
        }
    });

    // Change text
    title.textContent = watches[current].title;
    desc.textContent = watches[current].desc;
}


function goNext() {
    current = (current + 1) % watches.length;
    updateCarousel();
}

function goPrev() {
    current = (current - 1 + watches.length) % watches.length;
    updateCarousel();
}

const IDLE_DELAY = 5000; // wait this long after the last click before auto-rotating
const ROTATE_INTERVAL = 3000; // speed of the auto-rotation once it starts

let idleTimer = null;
let rotateInterval = null;

function stopAutoRotate() {
    clearInterval(rotateInterval);
    rotateInterval = null;
}

function scheduleAutoRotate() {
    clearTimeout(idleTimer);
    stopAutoRotate();

    idleTimer = setTimeout(() => {
        rotateInterval = setInterval(goNext, ROTATE_INTERVAL);
    }, IDLE_DELAY);
}

document.getElementById("next").addEventListener("click", () => {
    goNext();
    scheduleAutoRotate();
});


document.getElementById("prev").addEventListener("click", () => {
    goPrev();
    scheduleAutoRotate();
});


updateCarousel();
scheduleAutoRotate();