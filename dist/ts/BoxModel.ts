// ============================================================================
// Import
// ============================================================================

import Border from "./Border";
import Size from "./Size";


// ============================================================================
// Classes
// ============================================================================

export default class BoxModel {

    // Parameters
    // ========================================================================

    margin: Margin;
    padding: Padding;
    border: Border;
    size: Size;

    // Constructor
    // ========================================================================

    constructor(
        margin: Margin,
        padding: Padding,
        border: Border,
        size: Size
    ) {
        if (
            margin.top.unit !== size.width.unit ||
            padding.top.unit !== size.width.unit ||
            border.width.unit !== size.width.unit
        ) {
            throw new Error("All units in BoxModel must match");
        }
        this.margin = margin;
        this.padding = padding;
        this.border = border;
        this.size = size;
    }


    // Methods
    // ========================================================================

    setMargin(margin: Margin): void {
        this.margin = margin;
    }

    setPadding(padding: Padding): void {
        this.padding = padding;
    }

    setBorder(border: Border): void {
        this.border = border;
    }

    setSize(size: Size): void {
        this.size = size;
    }

    toString(): string {
        return `BoxModel:\n  Size: ${this.size.toString()}\n  Margin: ${this.margin.toString()}\n  Padding: ${this.padding.toString()}\n  Border: ${this.border.toString()}`;
    }
}
