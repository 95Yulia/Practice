import {postData} from "../services/requests";

const drop = () => {
    const fileInputs = document.querySelectorAll('[name="upload"]');

    ['dragenter', 'dragleave', 'dragover', 'drop'].forEach(eventName => {
        fileInputs.forEach(input => {
            input.addEventListener(eventName, preventDefaults, false);
        });
    });

    function preventDefaults(event) {
        event.preventDefault();
        event.stopPropagation();
    }

    function highlight(item) {
        item.closest('.file_upload').style.border = '5px solid yellow';
        item.closest('.file_upload').style.backgroundColor = 'rgba(0,0,0, .7)';
    }

    function unhhighlight(item) {
        item.closest('.file_upload').style.border = 'none';

        if (item.closest('.calc_form')){
            item.closest('.file_upload').style.backgroundColor = '#fff';
        } else if (item.closest('.container')){
            item.closest('.file_upload').style.backgroundColor = '#f7e7e6'
        } else {
            item.closest('.file_upload').style.backgroundColor = '#ededed';
        }
    }

    ['dragenter', 'dragover'].forEach(eventName => {
        fileInputs.forEach(input => {
            input.addEventListener(eventName, () => highlight(input), false);
        });
    });

    ['dragleave', 'drop'].forEach(eventName => {
        fileInputs.forEach(input => {
            input.addEventListener(eventName, () => unhhighlight(input), false);
        });
    });

    fileInputs.forEach(input => {
        input.addEventListener('drop', (event) => {

            input.files = event.dataTransfer.files;

            let dots;
            const arr = input.files[0].name.split('.');
            arr[0].length > 4 ? dots = '...' : dots = '.';
            const name = arr[0].substring(0, 4) + dots + arr[1];
            input.previousElementSibling.textContent = name;

            if(input.closest('main')){
                const formData = new FormData ();
                formData.append('upload', input.files[0]);

                postData('assets/server.php', formData)
                    .then(res => {
                        console.log(res);
                        // statusImg.setAttribute('src', message.ok);
                        // textMessage.textContent = message.success;
                    })
                    .catch(() => console.log(Error));
                    // .finally( () => {
                    //     fileInputs.forEach(item => {
                    //         item.previousElementSibling.textContent = 'Файл не выбран';
                    //     });
                    // });
            }

        });
    });
};

export default drop;