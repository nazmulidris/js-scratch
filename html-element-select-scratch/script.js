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
 * @param selectElementSelector The selector for the HTML select element.
 * @param optionValue Try and pick this option if it exists.
 */
const setSelectedIndexAndFireChangeEvent =
    (selectElementSelector, optionValue) => {
        const selectElement =
            document.querySelector(selectElementSelector);
        for (let i = 0; i < selectElement.options.length; i++) {
            if (selectElement.options[i].text === optionValue) {
                selectElement.options[i].selected = true;
                selectElement.dispatchEvent(new Event('change'));
                return;
            }
        }
    };

setSelectedIndexAndFireChangeEvent('sardine');
