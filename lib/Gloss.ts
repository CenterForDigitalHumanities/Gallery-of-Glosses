/**
 * The Gloss class represents a single gloss in the application.
 * A gloss is a particular version or translation of a text.
 */
export class Gloss {
    // The properties of the gloss, such as its title, identifier, alternative, city, etc.
    title: string;
    description: string;
    targetChapter: string;
    targetVerse: string;
    targetedText: string;
    transcribedGloss: string;
    notes: string;
    tags: {
        "@type": string;
        items: any[];
    }

    /**
     * The constructor for the Gloss class.
     * It takes in a partial gloss object, which is an object that may only include some of the gloss properties.
     * If the title property is missing, an error is thrown.
     * Other properties are set to safe default values if they are not included in the data object.
     *
     * @param {Partial<Gloss>} data - The gloss data object.
     * @throws {Error} If the title property is missing from the data object.
     */
    
    constructor(data: Partial<Gloss>) {
        this.title = data.title || "";
        this.description = data.description || "";
        this.targetChapter = data.targetChapter || "";
        this.targetVerse = data.targetVerse || "";
        this.targetedText = data.targetedText || "";
        this.transcribedGloss = data.transcribedGloss || "";
        this.notes = data.notes || "";
        this.tags = data.tags || { "@type": "", items: [] };
    }
}
