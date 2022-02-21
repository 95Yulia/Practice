import {getResource} from "../services/requests";

const calc = (size, material, options, promocode, result) => {
    const sizeBlock = document.querySelector(size),
          materialBlock = document.querySelector(material),
          optionsBlock = document.querySelector(options),
          promocodeBlock = document.querySelector(promocode),
          resultBlock = document.querySelector(result);

    function addOptionsValue(response, selector, selectorBlock){
        for (let key in response[selector.slice(1)][0]) {
            selectorBlock.querySelectorAll('option').forEach(opt => {
                if (opt.textContent === key){
                    opt.value = response[selector.slice(1)][0][key];
                }
            })
        }
    }

    getResource('assets/db.json').then(res => {
        addOptionsValue(res, size, sizeBlock);
            addOptionsValue(res, material, materialBlock);
            addOptionsValue(res, options, optionsBlock);
    })

    let sum = 0;

    const calcFunc = () => {
      sum = Math.round((+sizeBlock.value) * (+materialBlock.value) + (+optionsBlock.value));

      if(sizeBlock.value == '' || materialBlock.value == ''){
          resultBlock.textContent = 'Пожалуйста, выберите размер и материал картины';
      } else if (promocodeBlock.value === 'IWANTPOPART') {
          resultBlock.textContent = Math.round(sum*0.7);
      } else {
          resultBlock.textContent = sum;
      }
    };

    sizeBlock.addEventListener('change', calcFunc);
    materialBlock.addEventListener('change', calcFunc);
    optionsBlock.addEventListener('change', calcFunc);
    promocodeBlock.addEventListener('input', calcFunc);

    calcFunc();
    return sum;
};

export default calc;