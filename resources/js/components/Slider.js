class Slider {

    constructor(el) {
        this.threshold = 20;

        this.startX = 0;
        this.oldX = 0;
        this.position = 0;
        this.snapPosition = 0;

        this.isDrag = false;
        this.userDragged = false;

        this.slider = el;

        this.obj = {
            items: this.slider.querySelectorAll('.products__item'),
        }

        this.setDimensions();
        this.bindHandlers();
    }

    setDimensions() {
        const spacing = 64;
        const sliderWidth = this.slider.offsetWidth;
        const itemWidth = this.obj.items[0].offsetWidth;
        const itemsWidth = this.obj.items.length * itemWidth;

        this.itemWidth = itemWidth;
        this.maxAllowedW = sliderWidth < itemsWidth ? sliderWidth - itemsWidth - spacing : 0;
    }

    calculateBoundaries(position, bounce = true) {
        const bounceMargin = bounce ? this.itemWidth / 4 : 0;

        if (position > bounceMargin) return bounceMargin;
        if (position < this.maxAllowedW - bounceMargin) return this.maxAllowedW - bounceMargin;

        return position;
    }

    calculateSnapPosition(position, swipeNext) {
        let snapPosition = (~~(position / this.itemWidth) - swipeNext) * this.itemWidth;

        if (snapPosition < this.maxAllowedW) snapPosition = this.maxAllowedW;
        return snapPosition;
    }

    mapToRange(num, inMin, inMax, outMin, outMax) {
        return ((num - inMin) * (outMax - outMin)) / ((inMax - inMin) + outMin);
    }

    handleTouchStart(e) {
        if (e.touches.length > 1) return;

        this.handleStart(e);
    }

    handleMouseStart(e) {
        this.handleStart(e);
    }

    handleStart(e) {
        this.isDrag = true;
        this.userDragged = false;
        this.position = this.snapPosition;
        this.startX = (e.pageX || e.touches[0].pageX) - this.slider.offsetLeft;

        this.slider.classList.add('--active');
    }

    handleTouchMove(e) {
        if (e.touches.length > 1) return;

        this.handleMove(e);
    }

    handleMouseMove(e) {
        e.preventDefault();
        e.stopPropagation();

        this.handleMove(e);
    }

    handleMove(e) {
        if (!this.isDrag) return;

        const pageX = e.pageX || e.touches[0].pageX;
        const currX = pageX - this.slider.offsetLeft;
        const dist = currX - this.startX;

        if (Math.abs(dist) < this.threshold) return;

        const swipeNext = this.oldX - currX < 0 ? 0 : 1;
        const accelerate = this.mapToRange(Math.abs(dist), this.threshold, window.innerWidth, 1, 3);
        const position = this.calculateBoundaries(this.position + (dist * accelerate));

        e.preventDefault();
        e.stopPropagation();

        this.userDragged = true;
        this.snapPosition = this.calculateSnapPosition(position, swipeNext);
        this.oldX = currX;

        this.slider.setAttribute('style', `transform: translate3d(${position}px, 0, 0)`);
    }

    // End

    handleEnd() {
        this.isDrag = false;

        this.slider.classList.remove('--active');
        this.slider.setAttribute('style', `transform: translate3d(${this.snapPosition}px, 0, 0)`);
    }

    handleResize() {
        this.setDimensions();
    }

    handleClick(e) {
        if (!this.userDragged) return;

        e.preventDefault();
        e.stopPropagation();
        this.userDragged = false;
    }

    bindHandlers() {
        this.slider.addEventListener('touchstart', (e) => this.handleTouchStart(e));
        this.slider.addEventListener('touchmove', (e) => this.handleTouchMove(e));
        this.slider.addEventListener('touchend', (e) => this.handleEnd(e));

        this.slider.addEventListener('mousedown', (e) => this.handleMouseStart(e));
        this.slider.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        this.slider.addEventListener('mouseup', (e) => this.handleEnd(e));
        this.slider.addEventListener('mouseleave', (e) => this.handleEnd(e));

        this.slider.addEventListener('click', (e) => this.handleClick(e));
        window.addEventListener('resize', () => this.handleResize());
    }
}

export default Slider;