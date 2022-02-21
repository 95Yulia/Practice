const modals = () => {
    let btnPressed;
    function bindModal(triggerSelector, modalSelector, closeSelector, destroy = false) {
        const trigger = document.querySelectorAll(triggerSelector),
            modal = document.querySelector(modalSelector),
            close = document.querySelector(closeSelector),
            windows = document.querySelectorAll('[data-modal]'),
            gift = document.querySelector('.fixed-gift'),
            scroll = calcScroll();


        trigger.forEach(item => {
            item.addEventListener('click', (event) => {

                if (event.target){
                    event.preventDefault();
                }

                btnPressed = true;

                if (destroy) {
                    item.remove()
                }

                windows.forEach(item => {
                    item.style.display='none';
                    item.classList.add('animated', 'fadeIn')
                });


                modal.style.display="block"
                document.body.style.overflow="hidden";
                document.body.style.marginRight = `${scroll}px`;
                gift.style.marginRight = `${scroll}px`;
            })
        })

        close.addEventListener('click',(event) => {
            windows.forEach(item => {
                item.style.display='none';
            });
            modal.style.display='none';
            document.body.style.overflow="";
            document.body.style.marginRight = `0px`;
            gift.style.marginRight = `0px`;
        })

        modal.addEventListener('click', (event) => {

            if(event.target === modal) {
                windows.forEach(item => {
                    item.style.display='none';
                });
                modal.style.display='none';
                document.body.style.overflow="";
                document.body.style.marginRight = `0px`;
                gift.style.marginRight = `0px`;
            }
        })

    }


    function showModelByTime (selector, time){
        setTimeout(function () {
            let display;
            document.querySelectorAll('[data-modal]').forEach(item => {
                if (getComputedStyle(item).display !== 'none') {
                    display = 'block';
                }
            });

            if (!display){
                document.querySelector(selector).style.display = 'block';
                document.body.style.overflow="hidden";
                document.body.style.marginRight = `${calcScroll()}px`;
            }

        }, time)
    }

    function calcScroll() {
        let div = document.createElement('div');
        div.style.width = '50px';
        div.style.height = '50px';
        div.style.overflowY = 'scroll';
        div.style.visibility = "hidden";

        document.body.appendChild(div);

        let scrollWidth = div.offsetWidth - div.clientWidth;
        div.remove();

        return scrollWidth;
    }

    function openByScroll(selector) {
        window.addEventListener('scroll', () => {
            if (!btnPressed && (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight)){
                document.querySelector(selector).click();
            }
        });
    }

    bindModal('.button-design', '.popup-design', '.popup-design .popup-close');
    bindModal('.button-consultation', '.popup-consultation', '.popup-consultation .popup-close');
    bindModal('.fixed-gift', '.popup-gift', '.popup-gift .popup-close', true)
    // showModelByTime ('.popup-consultation', 60000)
    openByScroll('.fixed-gift')

};

export default modals;