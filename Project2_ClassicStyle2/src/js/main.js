import modals from "./modules/modals";
import sliders from "./modules/sliders";
import forms from "./modules/form";
import mask from "./modules/mask";
import checkTextInputs from "./modules/checkTextInuts";
import showMoreStyles from "./modules/showMoreStyles";
import calc from "./modules/calc";
import filter from "./modules/filter";
import pictureSize from "./modules/pictureSize";
import accordion from "./modules/accordion";
import burger from "./modules/burger";
import scrolling from "./modules/scrolling";
import drop from "./modules/drop";

window.addEventListener('DOMContentLoaded', () => {
    "use strict";
    modals();
    sliders('.feedback-slider-item', 'horizontal', '.main-prev-btn', '.main-next-btn', 5000);
    sliders('.main-slider-item', 'vertical','', '', 5000);
    forms();
    mask('[name="phone"]');
    checkTextInputs('[name="name"]');
    checkTextInputs('[name="message"]');
    // showMoreStyles('.button-styles', '.styles-2');
    showMoreStyles('.button-styles', '#styles .row');
    calc('#size', '#material', '#options', '.promocode', '.calc-price');
    filter('.portfolio-menu', '.portfolio-wrapper');
    pictureSize('.sizes-block');
    accordion('.accordion-heading');
    burger('.burger-menu', '.burger');
    scrolling('.pageup');
    drop();


})