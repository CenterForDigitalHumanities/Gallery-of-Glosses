import { NamedGlosses } from '@/../../lib/NamedGlosses';  // adjust the path as necessary

/**
 * Describe function is used to group related tests in a test suite.
 * Here we are grouping all tests related to the NamedGlosses class in a suite named "NamedGlosses".
 */
describe('NamedGlosses', () => {

    /**
     * Test function represents a single test in a test suite.
     * This test ensures that the NamedGlosses class correctly creates Gloss instances from an array of data.
     */
    test('Creates gloss instances from data array', () => {
        /**
         * Test data to be used for creating a new instance of the NamedGlosses class.
         * This data represents an array of glosses with all required properties.
         */
        const testDataArray = [
            {
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
            },
            {
                title: "Ascendit ipse mons",
                description: "",
                targetChapter: "5",
                targetVerse: "1",
                targetedText: "Ascendit ipse mons in montem ut altiora uirtutum culmina doceret et ecclesiam super quam sedet, predicans preceptum domini sublimius erigendam ostenderet, quam eadem doctrina usque ad finem seculi plenius erudiret apostolos preminentius abducit, ut a monte prius montes suscipiant pacem populo. Turba que sequebatur non ascendit, unde alius sermo fit eis in campestri. Non enim omnes omnia possunt, quod uerius putatur quamuis idem utrisque simul possit uideri factus.",
                transcribedGloss: "Paris",
                notes: "",
                tags: {
                    "@type": "",
                    items: [
                        "virtus",
                        "ecclesia",
                        "populus",
                    ],
                },
            }
        ];

        /**
         * Create a new instance of NamedGlosses using the test data.
         */
        const namedGlosses = new NamedGlosses(testDataArray);

        /**
         * The 'expect' function is used to check if certain conditions meet as expected.
         * It is generally used to perform assertions in tests.
         * Here we are asserting that the 'glosses' array of the NamedGlosses instance was populated correctly.
         */
        expect(namedGlosses.glosses.length).toBe(testDataArray.length);

        testDataArray.forEach((testData, i) => {
            expect(namedGlosses.glosses[i].title).toBe(testData.title);
            expect(namedGlosses.glosses[i].description).toBe(testData.description);
            expect(namedGlosses.glosses[i].targetChapter).toBe(testData.targetChapter);
            expect(namedGlosses.glosses[i].targetedText).toBe(testData.targetedText);
            expect(namedGlosses.glosses[i].transcribedGloss).toBe(testData.transcribedGloss);
            expect(namedGlosses.glosses[i].notes).toBe(testData.notes);
            expect(namedGlosses.glosses[i].tags).toBe(testData.tags);
        });

    });

    /**
     * Additional tests could be added here. 
     */
});
