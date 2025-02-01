// ============================================================================
// Import
// ============================================================================

import Unit from "./Unit";


// ============================================================================
// Classes
// ============================================================================

export default class Position {

    // Parameters
    // ========================================================================

    x: Unit;
    y: Unit;

    // Constructor
    // ========================================================================

    constructor(
        x: Unit,
        y: Unit
    ) {
        if (x.unit !== y.unit) {
            throw new Error("X and Y must have the same unit");
        }
        this.x = x;
        this.y = y;
    }

    // Methods
    // ========================================================================

    add(other: Position): Position {
        return new Position(this.x.add(other.x), this.y.add(other.y));
    }

    subtract(other: Position): Position {
        return new Position(this.x.subtract(other.x), this.y.subtract(other.y));
    }

    convert(toUnit: UnitType): Position {
        return new Position(this.x.convert(toUnit), this.y.convert(toUnit));
    }

    toString(): string {
        return `Position: (${this.x.toString()}, ${this.y.toString()})`;
    }
}
