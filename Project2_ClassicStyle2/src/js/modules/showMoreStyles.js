import {getResource} from "../services/requests";

const showMoreStyles = (trigger, wrapper) => {
    const btn = document.querySelector(trigger);

//1) Варант порузки данных, которые прикрепены, но скрыты
    // cards.forEach(item => {
    //     item.classList.add('animated', 'fadeInUp');
    // });
    //
    // btn.addEventListener('click', () => {
    //     cards.forEach(item => {
    //         item.classList.remove('hidden-lg', 'hidden-md', 'hidden-sm', 'hidden-xs');
    //         item.classList.add('col-sm-3', 'col-sm-offset-0', 'col-xs-10', 'col-xs-offset-1');
    //     });
    //     btn.style.display = 'none';
    //     // btn.remove();
    // });

//2) Вариант загрузки данных с сервера
    function catchError() {
        let statusMessage = document.createElement('div');
        statusMessage.classList.add('status');
        statusMessage.style.color = 'red';
        statusMessage.style.fontSize = '30pt';
        statusMessage.textContent = 'Сервер не отвечает...'
        document.querySelector(wrapper).appendChild(statusMessage);
    }

    btn.addEventListener('click', function() {
        // getResource('http://localhost:3000/styles')
        getResource('assets/db.json')
            // .then(res => createCards(res))
            .then(res => createCards(res))
            .catch(error => catchError());

        this.remove();
    });

    function createCards(response) {
        response.forEach(({src,title, link}) => {
            let card = document.createElement('div');

            card.classList.add('animated', 'fadeInUp', 'col-sm-3', 'col-sm-offset-0', 'col-xs-10', 'col-xs-offset-1')

            card.innerHTML = `
            <div class='styles-block'>
               <img src=${src} alt="style">
               <h4>${title}</h4>
               <a href=${link}>Подробнее</a>
            </div>
            `;

            document.querySelector(wrapper).appendChild(card);
        });
    };
};

export default showMoreStyles;