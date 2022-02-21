export default class Slider {
    constructor({container = null,
                    btns = null,
                    next = null,
                    prev = null,
                    moduleNext = null,
                    modulePrev = null,
                    activeClass = '',
                    animate,
                    autoplay } = {}) {
        this.container = document.querySelector(container);
        try {
            this.slides = this.container.children;  
        } catch (e) {
            
        }
        
        this.btns = document.querySelectorAll(btns);
        this.prev = document.querySelector(prev);
        this.next = document.querySelector(next);
        this.moduleNext = document.querySelectorAll(moduleNext);
        this.modulePrev = document.querySelectorAll(modulePrev);
        this.activeClass = activeClass;
        this.animate = animate;
        this.autoplay = autoplay;
        this.slideIndex = 1;
    }
}