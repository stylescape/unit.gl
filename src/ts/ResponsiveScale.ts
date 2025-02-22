// ============================================================================
// Import
// ============================================================================

import Unit from "./Unit";
import Viewport from "./Viewport";


// ============================================================================
// Classes
// ============================================================================

export default class ResponsiveScale {

    // Parameters
    // ========================================================================

    viewport: Viewport;
    baseSize: Unit;
    scaleFactor: number;

    // Constructor
    // ========================================================================

    constructor(viewport: Viewport, baseSize: Unit, scaleFactor: number) {
        this.viewport = viewport;
        this.baseSize = baseSize;
        this.scaleFactor = scaleFactor;
    }


    // Methods
    // ========================================================================

    calculateResponsiveSize(): Unit {
        const ratio = this.viewport.width.value / 1920; // Assuming 1920px is the base
        const scaledValue = this.baseSize.value * Math.pow(this.scaleFactor, ratio);
        return new Unit(scaledValue, this.baseSize.unit);
    }

    toString(): string {
        return `ResponsiveScale: Base(${this.baseSize.toString()}) ScaleFactor(${this.scaleFactor}) Viewport(${this.viewport.toString()})`;
    }
}
