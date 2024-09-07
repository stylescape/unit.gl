class Viewport {
    width: Unit;
    height: Unit;
    pixelRatio: number;

    constructor(width: Unit, height: Unit, pixelRatio: number = 1) {
        this.width = width;
        this.height = height;
        this.pixelRatio = pixelRatio;
    }

    resize(newWidth: Unit, newHeight: Unit): void {
        this.width = newWidth;
        this.height = newHeight;
    }

    setPixelRatio(ratio: number): void {
        this.pixelRatio = ratio;
    }

    toString(): string {
        return `Viewport: ${this.width.toString()} x ${this.height.toString()} @ ${this.pixelRatio}x pixel ratio`;
    }
}