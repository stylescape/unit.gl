// ============================================================================
// Import
// ============================================================================


// ============================================================================
// Types
// ============================================================================

type UnitType = 'px' | 'em' | '%' | 'rem' | 'mm' | 'cm' | 'in';


// ============================================================================
// Classes
// ============================================================================

export default class Unit {

    // Parameters
    // ========================================================================

    value: number;
    unit: UnitType;

    // Constructor
    // ========================================================================

    constructor(value: number, unit: UnitType) {
        this.value = value;
        this.unit = unit;
    }

    // Methods
    // ========================================================================

    add(other: Unit): Unit {
        if (this.unit !== other.unit) {
            throw new Error(`Cannot add units of different types: ${this.unit} and ${other.unit}`);
        }
        return new Unit(this.value + other.value, this.unit);
    }

    subtract(other: Unit): Unit {
        if (this.unit !== other.unit) {
            throw new Error(`Cannot subtract units of different types: ${this.unit} and ${other.unit}`);
        }
        return new Unit(this.value - other.value, this.unit);
    }

    multiply(factor: number): Unit {
        return new Unit(this.value * factor, this.unit);
    }

    divide(divisor: number): Unit {
        return new Unit(this.value / divisor, this.unit);
    }

    convert(toUnit: UnitType): Unit {
        // Example conversion: assumes 1in = 96px, 1cm = 37.7953px, etc.
        const conversionRates: { [key in UnitType]?: number } = {
            'px': 1,
            'em': 16,
            'rem': 16,
            'in': 96,
            'cm': 37.7953,
            'mm': 3.77953,
            '%': 1 // Conversion for percentages might be contextual
        };

        if (!conversionRates[this.unit] || !conversionRates[toUnit]) {
            throw new Error(`Conversion from ${this.unit} to ${toUnit} is not supported`);
        }

        const convertedValue = (this.value * conversionRates[this.unit]!) / conversionRates[toUnit]!;
        return new Unit(convertedValue, toUnit);
    }

    toString(): string {
        return `${this.value}${this.unit}`;
    }
}
