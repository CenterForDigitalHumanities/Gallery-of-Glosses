import { Gloss } from '@/../../lib/Gloss';

/**
 * Describe function is used to group related tests in a test suite.
 * Here we are grouping all tests related to the Gloss class in a suite named "Gloss".
 */
describe('Gloss', () => {
    
    /**
     * It function represents a single test in a test suite. 
     * Here we are testing that the Gloss class correctly instantiates with valid data.
     */
    it('should correctly instantiate with valid data', () => {

        /**
         * Test data to be used for creating a new instance of the Gloss class.
         * This data represents a single gloss with all required properties.
         */
        const testData = {
            title: "id est humiles",
            description: "",
            targetChapter: "5",
            targetVerse: "3",
            targetedText: "Pauperes spiritu",
            transcribedGloss: "Paris",
            notes: "",
            tags: {
                "@type": "Set",
                items: [
                    "ot citation",
                    "humilis",
                ],
            },
        };

        /**
         * Create a new instance of Gloss using the test data.
         */
        const gloss = new Gloss(testData);

        /**
         * Expect function is used to check if certain conditions meet as expected. 
         * It is generally used to perform assertions in the tests.
         * Here we are asserting that the properties of the Gloss class are correctly set when it's instantiated.
         */
        expect(gloss.title).toBe(testData.title);
        expect(gloss.description).toBe(testData.description);
        expect(gloss.targetChapter).toBe(testData.targetChapter);
        expect(gloss.targetVerse).toBe(testData.targetVerse);
        expect(gloss.targetedText).toBe(testData.targetedText);
        expect(gloss.transcribedGloss).toBe(testData.transcribedGloss);
        expect(gloss.notes).toBe(testData.notes);
        expect(gloss.tags).toEqual(testData.tags);
    });

    /**
     * Additional tests could be added here. 
     */
});
