type AngleUnit = 'deg' | 'rad';

class Transform {
    translateX: Unit;
    translateY: Unit;
    rotate: number;
    rotateUnit: AngleUnit;
    scaleX: number;
    scaleY: number;

    constructor(translateX: Unit, translateY: Unit, rotate: number, rotateUnit: AngleUnit, scaleX: number, scaleY: number) {
        this.translateX = translateX;
        this.translateY = translateY;
        this.rotate = rotate;
        this.rotateUnit = rotateUnit;
        this.scaleX = scaleX;
        this.scaleY = scaleY;
    }

    setTranslation(translateX: Unit, translateY: Unit): void {
        this.translateX = translateX;
        this.translateY = translateY;
    }

    setRotation(angle: number, unit: AngleUnit): void {
        this.rotate = angle;
        this.rotateUnit = unit;
    }

    setScale(scaleX: number, scaleY: number): void {
        this.scaleX = scaleX;
        this.scaleY = scaleY;
    }

    toString(): string {
        return `Transform: translate(${this.translateX.toString()}, ${this.translateY.toString()}) rotate(${this.rotate}${this.rotateUnit}) scale(${this.scaleX}, ${this.scaleY})`;
    }
}