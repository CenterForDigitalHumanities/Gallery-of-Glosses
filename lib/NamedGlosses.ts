import { Gloss } from "./Gloss";

// The NamedGlosses class represents a collection of Gloss instances.
export class NamedGlosses {
    // The array of glosses.
    glosses: Gloss[];

    /**
     * The constructor for the NamedGlosses class.
     * It takes in an array of gloss data objects and creates a Gloss instance for each one.
     *
     * @param {Partial<Gloss>[]} data - The array of gloss data objects.
     * @throws {Error} If the title property is missing from any of the data objects.
     */
    constructor(data: Partial<Gloss>[]) {
        this.glosses = data.map(glossData => new Gloss(glossData));
    }
}
