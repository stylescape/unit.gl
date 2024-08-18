class GridContainer {
    rows: number;
    columns: number;
    rowGap: Unit;
    columnGap: Unit;

    constructor(rows: number, columns: number, rowGap: Unit, columnGap: Unit) {
        this.rows = rows;
        this.columns = columns;
        this.rowGap = rowGap;
        this.columnGap = columnGap;
    }

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