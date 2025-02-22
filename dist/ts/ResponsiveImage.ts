// ============================================================================
// Import
// ============================================================================


// ============================================================================
// Classes
// ============================================================================

export default class ResponsiveImage {

    // Parameters
    // ========================================================================

    sources: Map<number, string>; // Map of breakpoint to image URL
    altText: string;

    // Constructor
    // ========================================================================

    constructor(altText: string) {
        this.sources = new Map<number, string>();
        this.altText = altText;
    }

    // Methods
    // ========================================================================

    addSource(breakpoint: number, url: string): void {
        this.sources.set(breakpoint, url);
    }

    getSource(viewportWidth: number): string {
        let selectedSource = "";
        this.sources.forEach((url, breakpoint) => {
            if (viewportWidth >= breakpoint) {
                selectedSource = url;
            }
        });
        return selectedSource;
    }

    toString(viewportWidth: number): string {
        const source = this.getSource(viewportWidth);
        return `<img src="${source}" alt="${this.altText}" />`;
    }
}
