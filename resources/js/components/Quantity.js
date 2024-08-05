
class Quantity {

    constructor() {

        this.obj = {
            minusBtns: document.querySelectorAll('.quantity__button.--minus'),
            plusBtns: document.querySelectorAll('.quantity__button.--plus'),
        }

        this.getMinus();
        this.getPlus();
    }

    getMinus() {
        if (this.obj.minusBtns.length > 0) {
            this.obj.minusBtns.forEach((btn) => {
                btn.addEventListener('click', (event) => {
                    event.preventDefault();
                    const input = btn.nextElementSibling;
                    const val = Number(input.value);
                    let step = input.getAttribute('step');
                    let min = Number(input.getAttribute('min'));
                    step = (typeof(step) !== 'undefined' ? Number(step) : 1);
                    if (val > min) {
                        input.value = val - step;
                    }
                });
            });
        }
    }

    getPlus() {
        if (this.obj.plusBtns.length > 0) {
            this.obj.plusBtns.forEach((btn) => {
                btn.addEventListener('click', (event) => {
                    event.preventDefault();
                    const input = btn.previousElementSibling;
                    const val = Number(input.value);
                    let step = input.getAttribute('step');
                    let max = Number(input.getAttribute('max'));
                    step = (typeof(step) !== 'undefined' ? Number(step) : 1);
                    if (val < max) {
                        input.value = val + step;
                    }
                });
            });
        }
    }
}

export default Quantity;