import Slider from "./modulse/slider/slider";
import VideoPlayer from "./modulse/playVideo";
import MainSlider from "./modulse/slider/slider-main";
import MiniSlider from "./modulse/slider/slider-mini";
import Difference from "./modulse/difference";
import Form from "./modulse/form";
import Accordion from "./modulse/accordion";
import Download from "./modulse/download";

window.addEventListener('DOMContentLoaded', () => {
    const slider = new MainSlider({container:'.page', btns:'.next'});
    slider.render();

    const showUpSlider = new MiniSlider({
        container: '.showup__content-slider',
        prev: '.showup__prev',
        next: '.showup__next',
        activeClass: "card-active",
        animate: true
    });
    showUpSlider.init();

    const modulePageSlider = new MainSlider({
        container: '.moduleapp',
        btns: '.next',
        moduleNext: '.nextmodule',
        modulePrev: '.prevmodule',
    });
    modulePageSlider.render();


    const modulesSlider = new MiniSlider({
        container: '.modules__content-slider',
        prev: '.modules__info-btns .slick-prev',
        next: '.modules__info-btns .slick-next',
        activeClass: "card-active",
        animate: true,
        autoplay: true,
        btns: '.modules__info-btns'
    });
    modulesSlider.init();

    const feedSlider = new MiniSlider({
        container: '.feed__slider',
        prev: '.feed__slider .slick-prev',
        next: '.feed__slider .slick-next',
        activeClass: "feed__item-active"
    });
    feedSlider.init();

    new VideoPlayer('.showup .play', '.overlay').init();
    new VideoPlayer('.module__video-item .play', '.overlay').init();

    // const difference = new Difference('.officerold', '.officernew', '.officer__card-item');
    // difference.init();

    new Difference('.officerold', '.officernew', '.officer__card-item').init();
    new Form('.form').init();

    new Accordion('.module__info-show .plus').init();
    new Download('.download').init();


});