// ============================================================================
// Import
// ============================================================================

import Unit from "./Unit";


// ============================================================================
// Classes
// ============================================================================

export default class Size {

    // Parameters
    // ========================================================================

    width: Unit;
    height: Unit;

    // Constructor
    // ========================================================================

    constructor(width: Unit, height: Unit) {
        if (width.unit !== height.unit) {
            throw new Error('Width and height must have the same unit');
        }
        this.width = width;
        this.height = height;
    }

    // Methods
    // ========================================================================

    add(other: Size): Size {
        return new Size(this.width.add(other.width), this.height.add(other.height));
    }

    subtract(other: Size): Size {
        return new Size(this.width.subtract(other.width), this.height.subtract(other.height));
    }

    scale(factor: number): Size {
        return new Size(this.width.multiply(factor), this.height.multiply(factor));
    }

    convert(toUnit: UnitType): Size {
        return new Size(this.width.convert(toUnit), this.height.convert(toUnit));
    }

    toString(): string {
        return `Size: ${this.width.toString()} x ${this.height.toString()}`;
    }

}
