const selectElement = document.querySelector('.ice-cream');

selectElement.addEventListener(
    'change',
    (event) => {
        const result = document.querySelector('.result');
        result.textContent = `You like ${event.target.value}`;
    });

/**
 * Programmatically change the option that's selected in the HTML select
 * element. Also fires a `change` event on the select element.
 * @param value Try and pick this option if it exists.
 */
const setSelectedIndexAndFireChangeEvent = (value) => {
    const selectElement =
        document.querySelector('.ice-cream');
    for (let i = 0; i < selectElement.options.length; i++) {
        if (selectElement.options[i].text === value) {
            selectElement.options[i].selected = true;
            selectElement.dispatchEvent(new Event('change'));
            return;
        }
    }
};

setSelectedIndexAndFireChangeEvent('sardine');
