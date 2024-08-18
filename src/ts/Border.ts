type BorderStyle = 'solid' | 'dashed' | 'dotted' | 'double' | 'none';

class Border {
    width: Unit;
    style: BorderStyle;
    color: string;

    constructor(width: Unit, style: BorderStyle, color: string) {
        this.width = width;
        this.style = style;
        this.color = color;
    }

    setWidth(newWidth: Unit): void {
        this.width = newWidth;
    }

    setStyle(newStyle: BorderStyle): void {
        this.style = newStyle;
    }

    setColor(newColor: string): void {
        this.color = newColor;
    }

    toString(): string {
        return `Border: ${this.width.toString()} ${this.style} ${this.color}`;
    }
}