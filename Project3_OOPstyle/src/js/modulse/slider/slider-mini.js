import Slider from "./slider";

export default class MiniSlider extends Slider {
    constructor(container, next, prev, activeClass, animate, autoplay, btns) {
        super(container, next, prev, activeClass, animate, autoplay, btns);
    }

    decorizeSlides() {
            [...this.slides].forEach(slide => {
            slide.classList.remove(this.activeClass);
            if (this.animate) {
                slide.querySelector('.card__title').style.opacity = '0.4';
                slide.querySelector('.card__controls-arrow').style.opacity = '0';
            }
        });
            if(!this.slides[0].closest('button')){
                this.slides[0].classList.add(this.activeClass);
            }

        if(this.animate){
            this.slides[0].querySelector('.card__title').style.opacity = '1';
            this.slides[0].querySelector('.card__controls-arrow').style.opacity = '1';
        }
    }

    bindTriggers() {
        this.next.addEventListener('click', () => {
            this.nextSlide();
        });

        this.prev.addEventListener('click', () => {

            for (let i = this.slides.length - 1; i > 0; i-- ){
                if(this.slides[i].tagName !== "BUTTON"){
                    let active = this.slides[i];
                    this.container.insertBefore(active, this.slides[0]);
                    this.decorizeSlides();
                    break;
                }
            }
        });
    }

    nextSlide() {
        if(this.slides[1].tagName == "BUTTON" && this.slides[3].tagName == "BUTTON"){
            this.container.appendChild(this.slides[0]);
            this.container.appendChild(this.slides[1]);
            this.container.appendChild(this.slides[2]);
            this.decorizeSlides();
        } else if (this.slides[1].tagName == "BUTTON"){
            this.container.appendChild(this.slides[0]);
            this.container.appendChild(this.slides[1]);
            this.decorizeSlides();
        } else {
            this.container.appendChild(this.slides[0]);
            this.decorizeSlides();
        }
    }

    autoplaySlide(){
        let play = setInterval(() => {
            this.nextSlide();
        }, 5000);

        this.btns.forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                clearInterval(play);
            });
        });

        this.container.addEventListener('mouseenter', () => {
            clearInterval(play);
        });
    }

    init (){
        try {
            this.container.style.cssText = `
        display: flex;
        flex-wrap: wrap;
        overflow: hidden;
        align-items: flex-start;
        `;
            this.bindTriggers();
            this.decorizeSlides();

            if(this.autoplay){
                this.autoplaySlide();

                this.btns.forEach(btn => {
                    btn.addEventListener('mouseleave', () => {
                        this.autoplaySlide();
                    });
                });

                this.container.addEventListener('mouseleave', () => {
                    this.autoplaySlide();
                });
            }
        } catch (e) {

        }
    }
}