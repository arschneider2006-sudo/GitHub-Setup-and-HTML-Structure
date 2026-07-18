const buttons = document.querySelectorAll(".portfolio-btn");

const galleries = document.querySelectorAll(".gallery-dropdown");


buttons.forEach(button => {

    button.addEventListener("click", () => {

        const target = document.getElementById(button.dataset.target);


        galleries.forEach(gallery => {

            if (gallery === target) {

                gallery.classList.toggle("show");

            } else {

                gallery.classList.remove("show");

            }

        });

    });

});
