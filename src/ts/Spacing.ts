// ============================================================================
// Import
// ============================================================================

import { default as Unit, default as UnitType } from "./Unit";


// ============================================================================
// Classes
// ============================================================================

export default class Spacing {

    // Parameters
    // ========================================================================

    top: Unit;
    right: Unit;
    bottom: Unit;
    left: Unit;

    // Constructor
    // ========================================================================

    constructor(
        top: Unit,
        right: Unit,
        bottom: Unit,
        left: Unit
    ) {
        if (
            top.unit !== right.unit || top.unit !== bottom.unit || top.unit !== left.unit
        ) {
            throw new Error('All sides must have the same unit');
        }
        this.top = top;
        this.right = right;
        this.bottom = bottom;
        this.left = left;
    }

    // Methods
    // ========================================================================

    add(other: Spacing): Spacing {
        return new Spacing(
            this.top.add(other.top),
            this.right.add(other.right),
            this.bottom.add(other.bottom),
            this.left.add(other.left)
        );
    }

    subtract(other: Spacing): Spacing {
        return new Spacing(
            this.top.subtract(other.top),
            this.right.subtract(other.right),
            this.bottom.subtract(other.bottom),
            this.left.subtract(other.left)
        );
    }

    scale(factor: number): Spacing {
        return new Spacing(
            this.top.multiply(factor),
            this.right.multiply(factor),
            this.bottom.multiply(factor),
            this.left.multiply(factor)
        );
    }

    convert(toUnit: UnitType): Spacing {
        return new Spacing(
            this.top.convert(toUnit),
            this.right.convert(toUnit),
            this.bottom.convert(toUnit),
            this.left.convert(toUnit)
        );
    }

    toString(): string {
        return `Spacing: ${this.top.toString()} ${this.right.toString()} ${this.bottom.toString()} ${this.left.toString()}`;
    }
}

class Margin extends Spacing {
    constructor(top: Unit, right: Unit, bottom: Unit, left: Unit) {
        super(top, right, bottom, left);
    }
}

class Padding extends Spacing {
    constructor(top: Unit, right: Unit, bottom: Unit, left: Unit) {
        super(top, right, bottom, left);
    }
}
