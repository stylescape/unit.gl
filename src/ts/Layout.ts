type Align = 'start' | 'center' | 'end' | 'stretch';
type Justify = 'start' | 'center' | 'end' | 'space-between' | 'space-around';

class Layout {
    width: Unit;
    height: Unit;
    align: Align;
    justify: Justify;
    direction: 'row' | 'column';

    constructor(width: Unit, height: Unit, align: Align = 'stretch', justify: Justify = 'start', direction: 'row' | 'column' = 'row') {
        this.width = width;
        this.height = height;
        this.align = align;
        this.justify = justify;
        this.direction = direction;
    }

    setAlign(align: Align): void {
        this.align = align;
    }

    setJustify(justify: Justify): void {
        this.justify = justify;
    }

    setDirection(direction: 'row' | 'column'): void {
        this.direction = direction;
    }

    toString(): string {
        return `Layout: ${this.direction}, width ${this.width.toString()}, height ${this.height.toString()}, align ${this.align}, justify ${this.justify}`;
    }
}