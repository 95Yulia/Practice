import {postData} from "../services/requests";
import calc from "./calc";

const forms = () => {
    const form = document.querySelectorAll('form');
    const inputs = document.querySelectorAll('input'),
        upload = document.querySelectorAll('[name="upload"]'),
        selects = document.querySelectorAll('select');
    // const select = document.querySelector('#view_type');
    // const span = document.querySelectorAll('.checkbox');
    // checkNumInputs('input[name="user_phone"]');

    const message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так',
        spinner: 'assets/img/spinner.gif',
        ok: 'assets/img/ok.png',
        fail: 'assets/img/fail.png'
    };

    const path = {
        designer: 'assets/server.php',
        question: 'assets/question.php'
    }



    const resetData = () => {

        inputs.forEach(item => {
            item.value = ''
        });
        upload.forEach(item => {
            item.previousElementSibling.textContent = 'Файл не выбран';
        });
        document.querySelector('.calc-price').textContent = 'Для расчета нужно выбрать размер картины и материал картины';
        selects.forEach(select => {
            select.options[0].selected = true;
        });
    };

    upload.forEach(item => {
        item.addEventListener('input', () => {
           let dots;
           const arr = item.files[0].name.split('.');
            arr[0].length > 4 ? dots = '...' : dots = '.';
            const name = arr[0].substring(0, 4) + dots + arr[1];
            item.previousElementSibling.textContent = name;
        })
    })

    form.forEach(item => {
        item.addEventListener('submit', (event) => {
            event.preventDefault();

            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            item.parentNode.appendChild(statusMessage);

            item.classList.add('animated', 'fadeOutUp');
            setTimeout(() => {
                item.style.display = 'none';
            },400);

            let statusImg = document.createElement('img');
            statusImg.setAttribute('scr', message.spinner);
            statusImg.classList.add('animated', 'fadeInUp');
            statusMessage.appendChild(statusImg);

            let textMessage = document.createElement('div');
            textMessage.textContent = message.loading;
            statusMessage.appendChild(textMessage);

            const formData = new FormData (item);

            let api;
            item.closest('.popup-design') || item.classList.contains('calc_form') ? api = path.designer : api = path.question;
            // console.log(api)
            if (item.classList.contains('calc_form')){
                formData.append("result_calc", calc('#size', '#material', '#options', '.promocode', '.calc-price'));
                selects.forEach(select => {
                    formData.append(`${select.id}_type`,select.options[select.selectedIndex].textContent);
                    formData.append(`${select.id}_value`,select.options[select.selectedIndex].value);
                    });
                formData.append("promocode",item.querySelector('.promocode').value );
            }
            postData(api, formData)
                .then(res => {
                    // console.log(res);
                    statusImg.setAttribute('src', message.ok);
                    textMessage.textContent = message.success;
                })
                .catch(() => {
                    statusImg.setAttribute('src', message.fail);
                    textMessage.textContent = message.failure;
                })
                .finally(res => {
                    resetData();
                    setTimeout(() => {
                        statusMessage.remove()
                        item.style.display = 'block';
                        item.classList.remove('fadeOutUp');
                        item.classList.add('fadeInUp');
                        ///windows.forEach(item => {
                        //     item.style.display='none';
                        // });
                    }, 5000);
                });
        });
    });
};

export default forms;