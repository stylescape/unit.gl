// ============================================================================
// Import
// ============================================================================

import Unit from "./Unit";


// ============================================================================
// Classes
// ============================================================================

export default class AspectRatio {

    // Parameters
    // ========================================================================

    width: Unit;
    height: Unit;

    // Constructor
    // ========================================================================

    constructor(width: Unit, height: Unit) {
        this.width = width;
        this.height = height;
    }

    // Methods
    // ========================================================================

    calculateRatio(): number {
        return this.width.value / this.height.value;
    }

    scaleToWidth(newWidth: Unit): Unit {
        const ratio: number = this.calculateRatio();
        const newHeightValue: number = newWidth.value / ratio;
        return new Unit(newHeightValue, newWidth.unit);
    }

    scaleToHeight(newHeight: Unit): Unit {
        const ratio: number = this.calculateRatio();
        const newWidthValue: number = newHeight.value * ratio;
        return new Unit(newWidthValue, newHeight.unit);
    }

    toString(): string {
        return `AspectRatio: width ${this.width.toString()}, height ${this.height.toString()}, ratio ${this.calculateRatio()}`;
    }
}
