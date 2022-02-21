export default class Accordion {
    constructor(btns) {
        this.btns = document.querySelectorAll(btns);
    }

    init() {
        this.btns.forEach(btn => {
                const sibling = btn.closest('.module__info-show').nextElementSibling;
            btn.addEventListener('click', () => {
                sibling.classList.toggle('msg');
                sibling.style.marginTop = '20px';
            });
        });
    }
}