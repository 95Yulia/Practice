const filter = (menuSelector, wrapperSelector) => {
    const menu = document.querySelector(menuSelector),
        wrapper = document.querySelector(wrapperSelector),
        no = document.querySelector('.portfolio-no');

    function hideTab(){
        menu.querySelectorAll('LI').forEach(item => {
            item.classList.remove('active')
        });
    }

    function hideWrapper(){
        wrapper.querySelectorAll('.all').forEach(item => {
            item.style.display = 'none';
            item.classList.remove('animated', 'fadeIn');
        });
        no.style.display = 'none';
        no.classList.remove('animated', 'fadeIn');
    }

    function showWrapper(selector){
        if (selector === ".grandmother" || selector === ".granddad"){
            no.style.display = 'block';
            no.classList.add('animated', 'fadeIn');
        } else {
            const markType = wrapper.querySelectorAll(selector);
            markType.forEach(mark => {
                mark.style.display = 'block';
                mark.classList.add('animated', 'fadeIn');
            });
        }
    }

    menu.addEventListener('click', (event) => {
        let target = event.target;

        if(target && target.tagName === "LI"){
                hideTab();
                let classSelectedItem = target.classList.value;
                hideWrapper();
                showWrapper(`.${classSelectedItem}`);
                target.classList.add('active');
        }
    });

}

export default filter;