const sliders = (slideSelector, dir, prev, next, time) => {
    let slideIndex = 1,
        paused = false;

    const items = document.querySelectorAll(slideSelector);


    function showSlides(n) {
        if (n > items.length) {
            slideIndex = 1;
        }

        if (n < 1) {
            slideIndex = items.length;
        }

        items.forEach(item => {
            item.classList.add('animated');
            item.style.display = 'none';
        })

        items[slideIndex - 1].style.display = 'block';
    }

    showSlides(slideIndex);

    function changeSlides(n) {
        showSlides(slideIndex += n);
    }

    try {
        const prevBtn = document.querySelector(prev),
            nextBtn = document.querySelector(next);

        prevBtn.addEventListener('click', () => {
            changeSlides(-1);
            items[slideIndex - 1].classList.remove('slideInLeft');
            items[slideIndex - 1].classList.add('slideInRight');
        })

        nextBtn.addEventListener('click', () => {
            changeSlides(1);
            items[slideIndex - 1].classList.remove('slideInRight');
            items[slideIndex - 1].classList.add('slideInLeft');
        })

    } catch (e) {}

    function activateAnimation() {
        if (dir === 'vertical') {
            paused = setInterval(function () {
                changeSlides(1);
                items[slideIndex - 1].classList.add('slideInDown');
            }, time);
        } else {
            paused = setInterval(function () {
                changeSlides(1);
                items[slideIndex - 1].classList.remove('slideInRight');
                items[slideIndex - 1].classList.add('slideInLeft');
            }, time);
        }
    }

    activateAnimation();

    items[0].parentNode.addEventListener('mouseenter', () => {
        clearInterval(paused);
    });

    items[0].parentNode.addEventListener('mouseleave', () => {
        activateAnimation();
    });
};

export default sliders;