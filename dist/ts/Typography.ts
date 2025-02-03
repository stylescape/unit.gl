// ============================================================================
// Import
// ============================================================================

import Unit from "./Unit";


// ============================================================================
// Types
// ============================================================================

type FontWeight = "normal" | "bold" | number;


// ============================================================================
// Classes
// ============================================================================

export default class Typography {

    // Parameters
    // ========================================================================

    fontSize: Unit;
    fontWeight: FontWeight;
    lineHeight: Unit;
    letterSpacing: Unit;
    textAlign: "left" | "right" | "center" | "justify";

    // Constructor
    // ========================================================================

    constructor(
        fontSize: Unit,
        fontWeight: FontWeight = "normal",
        lineHeight: Unit,
        letterSpacing: Unit,
        textAlign: "left" | "right" | "center" | "justify" = "left"
    ) {
        this.fontSize = fontSize;
        this.fontWeight = fontWeight;
        this.lineHeight = lineHeight;
        this.letterSpacing = letterSpacing;
        this.textAlign = textAlign;
    }


    // Methods
    // ========================================================================

    setFontSize(fontSize: Unit): void {
        this.fontSize = fontSize;
    }

    setFontWeight(fontWeight: FontWeight): void {
        this.fontWeight = fontWeight;
    }

    setLineHeight(lineHeight: Unit): void {
        this.lineHeight = lineHeight;
    }

    setLetterSpacing(letterSpacing: Unit): void {
        this.letterSpacing = letterSpacing;
    }

    setTextAlign(textAlign: "left" | "right" | "center" | "justify"): void {
        this.textAlign = textAlign;
    }

    toString(): string {
        return `Typography: font-size ${this.fontSize.toString()}, weight ${this.fontWeight}, line-height ${this.lineHeight.toString()}, letter-spacing ${this.letterSpacing.toString()}, text-align ${this.textAlign}`;
    }

}
