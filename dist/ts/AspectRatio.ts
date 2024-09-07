class AspectRatio {
    width: Unit;
    height: Unit;

    constructor(width: Unit, height: Unit) {
        this.width = width;
        this.height = height;
    }

    calculateRatio(): number {
        return this.width.value / this.height.value;
    }

    scaleToWidth(newWidth: Unit): Unit {
        const ratio = this.calculateRatio();
        const newHeightValue = newWidth.value / ratio;
        return new Unit(newHeightValue, newWidth.unit);
    }

    scaleToHeight(newHeight: Unit): Unit {
        const ratio = this.calculateRatio();
        const newWidthValue = newHeight.value * ratio;
        return new Unit(newWidthValue, newHeight.unit);
    }

    toString(): string {
        return `AspectRatio: width ${this.width.toString()}, height ${this.height.toString()}, ratio ${this.calculateRatio()}`;
    }
}