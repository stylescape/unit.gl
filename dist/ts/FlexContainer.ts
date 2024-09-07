type FlexDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse';
type FlexWrap = 'nowrap' | 'wrap' | 'wrap-reverse';

class FlexContainer {
    flexDirection: FlexDirection;
    flexWrap: FlexWrap;
    justifyContent: Justify;
    alignItems: Align;
    alignContent: Align;

    constructor(
        flexDirection: FlexDirection = 'row',
        flexWrap: FlexWrap = 'nowrap',
        justifyContent: Justify = 'start',
        alignItems: Align = 'stretch',
        alignContent: Align = 'stretch'
    ) {
        this.flexDirection = flexDirection;
        this.flexWrap = flexWrap;
        this.justifyContent = justifyContent;
        this.alignItems = alignItems;
        this.alignContent = alignContent;
    }

    setDirection(direction: FlexDirection): void {
        this.flexDirection = direction;
    }

    setWrap(wrap: FlexWrap): void {
        this.flexWrap = wrap;
    }

    setJustifyContent(justify: Justify): void {
        this.justifyContent = justify;
    }

    setAlignItems(align: Align): void {
        this.alignItems = align;
    }

    setAlignContent(align: Align): void {
        this.alignContent = align;
    }

    toString(): string {
        return `FlexContainer: direction ${this.flexDirection}, wrap ${this.flexWrap}, justify ${this.justifyContent}, align-items ${this.alignItems}, align-content ${this.alignContent}`;
    }
}