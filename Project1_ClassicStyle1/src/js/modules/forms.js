import checkNumInputs from "./checkNum";

const forms = (state) =>{
    const form = document.querySelectorAll('form');
    const inputs = document.querySelectorAll('input');
    const select = document.querySelector('#view_type');
    const span = document.querySelectorAll('.checkbox');



    checkNumInputs('input[name="user_phone"]');

    const message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так'
    };



    const postData = async (url, data) => {
        document.querySelector('.status').textContent = message.loading;
        let res = await fetch(url, {
            method: 'POST',
            body: data
        });
        return await res.text()
    };

    const resetData = () => {
        for (let key in state) {
            delete state[key];
        }

        select.options[0].selected=true;

        span.forEach(s => {
            s.checked = false
        });

        inputs.forEach(item => {
            item.value=''
        });

        state.type = "tree";
        state.form = 0;
    }

    // const clearInputs = () => {
    //     inputs.forEach(item => {
    //         item.value=''
    //     })
    // }
    //
    // const clearState = () => {
    //     for (let key in state) {
    //         delete state[key];
    //     }
    // };
    //
    // const resetSelector = () => {
    //    select.options[0].selected=true
    // };
    //
    // const resetSpan = () => {
    //     span.forEach(s => {
    //         s.checked = false
    //     })
    // };










    form.forEach(item => {
        item.addEventListener('submit', (event) => {
            event.preventDefault();

            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            item.appendChild(statusMessage);



            const formData = new FormData (item);
            if (item.getAttribute('data-calc')==="end"){
                for (let key in state) {
                    formData.append(key, state[key]);
                }
            }

            postData('assets/server.php', formData)
                .then(res => {
                    // console.log(res)
                    statusMessage.textContent = message.success
                })
                .catch(() => {
                    statusMessage.textContent = message.failure
                })
                .finally(res => {
                    resetData();
                    // clearState();
                    // resetSelector();
                    // resetSpan();
                    // clearInputs();
                    setTimeout(() => {
                        statusMessage.remove()
                        // windows.forEach(item => {
                        //     item.style.display='none';
                        // });
                    }, 5000);

                });
        });
    });
};

export default forms;