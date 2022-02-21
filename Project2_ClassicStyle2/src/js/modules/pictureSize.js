const pictureSize = (imgSelector) => {
    const blocks = document.querySelectorAll(imgSelector);

    blocks.forEach(block => {
        const img = block.querySelector('img'),
            blockParagraph = block.querySelectorAll('p:not(.sizes-hit)');


        block.addEventListener('mouseover', () => {
            img.src = img.src.slice(0,-4) + '-1.png';
            blockParagraph.forEach(p => {
                p.style.display = 'none';
            })
        });

        block.addEventListener('mouseout', () => {
            img.src = img.src.slice(0,-6) + '.png';
            blockParagraph.forEach(p => {
                p.style.display = 'block';
            });
        });
    });
};

export default pictureSize;