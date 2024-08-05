import Quantity from './components/Quantity';
import Slider from './components/Slider.js';

class Bootstrap {

    constructor() {
        new Quantity();

        const sliders = document.querySelectorAll('.products__list');
        sliders.forEach((slider) => { new Slider(slider) });
    }
}

export default Bootstrap;
