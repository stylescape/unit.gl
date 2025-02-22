// ============================================================================
// Import
// ============================================================================

import Unit from "./Unit";


// ============================================================================
// Classes
// ============================================================================

export default class Grid {

    // Parameters
    // ========================================================================

    columns: number;
    gutter: Unit;
    rowHeight: Unit;

    // Constructor
    // ========================================================================

    constructor(
        columns: number,
        gutter: Unit,
        rowHeight: Unit
    ) {
        this.columns = columns;
        this.gutter = gutter;
        this.rowHeight = rowHeight;
    }

    // Methods
    // ========================================================================

    getColumnWidth(containerWidth: Unit): Unit {
        const totalGutterWidth = this.gutter.value * (this.columns - 1);
        const columnWidth = (containerWidth.value - totalGutterWidth) / this.columns;
        return new Unit(columnWidth, containerWidth.unit);
    }

    toString(): string {
        return `Grid: ${this.columns} columns, gutter ${this.gutter.toString()}, row height ${this.rowHeight.toString()}`;
    }
}
