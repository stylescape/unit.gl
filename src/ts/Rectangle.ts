// ============================================================================
// Import
// ============================================================================

import Position from "./Position";
import Size from "./Size";


// ============================================================================
// Classes
// ============================================================================

export default class Rectangle {

    // Parameters
    // ========================================================================

    position: Position;
    size: Size;

    // Constructor
    // ========================================================================

    constructor(position: Position, size: Size) {
        if (position.x.unit !== size.width.unit || position.y.unit !== size.height.unit) {
            throw new Error("Position and Size units must match");
        }
        this.position = position;
        this.size = size;
    }


    // Methods
    // ========================================================================

    move(newPosition: Position): Rectangle {
        return new Rectangle(newPosition, this.size);
    }

    resize(newSize: Size): Rectangle {
        return new Rectangle(this.position, newSize);
    }

    scale(factor: number): Rectangle {
        return new Rectangle(this.position, this.size.scale(factor));
    }

    toString(): string {
        return `Rectangle: Position(${this.position.toString()}), Size(${this.size.toString()})`;
    }
}
