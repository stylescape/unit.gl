// ============================================================================
// Import
// ============================================================================

import Unit from "./Unit";


// ============================================================================
// Classes
// ============================================================================

export default class GridContainer {

    // Parameters
    // ========================================================================

    rows: number;
    columns: number;
    rowGap: Unit;
    columnGap: Unit;

    // Constructor
    // ========================================================================

    constructor(
        rows: number,
        columns: number,
        rowGap: Unit,
        columnGap: Unit
    ) {
        this.rows = rows;
        this.columns = columns;
        this.rowGap = rowGap;
        this.columnGap = columnGap;
    }

    // Methods
    // ========================================================================

    setRows(rows: number): void {
        this.rows = rows;
    }

    setColumns(columns: number): void {
        this.columns = columns;
    }

    setRowGap(rowGap: Unit): void {
        this.rowGap = rowGap;
    }

    setColumnGap(columnGap: Unit): void {
        this.columnGap = columnGap;
    }

    toString(): string {
        return `GridContainer: ${this.rows} rows, ${this.columns} columns, row-gap ${this.rowGap.toString()}, column-gap ${this.columnGap.toString()}`;
    }
}
