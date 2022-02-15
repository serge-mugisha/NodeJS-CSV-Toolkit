var app = require("../src/controllers/incidentController");

/** Individual test to test the findRecord() function */
describe(
    "Find Record", () => {
        beforeEach(function () {
            /** Add records to the app before performing find functionality */
            app.addRecord(["INC2007-097", "Release of Substance", "01/02/2008", "Grande Prairie", "Alberta", "Alliance Pipeline Ltd.", "Natural Gas - Sweet", "No", "Corrosion and Cracking"])
            app.addRecord(["INC2007-098", "Release of Substance", "01/03/2008", "Beiseker", "Ontario", "Alliance Pipeline Ltd.", "Natural Gas - Sweet", "No", "Corrosion and Cracking"])
        });

        /** Test case description */
        it("The function should find a record and return its index or null if not found", () => {
            /** Tests if the function finds the record and returns the correct index */
            var index = app.findRecord('INC2007-098')
            expect(index).toBe(1)

            /** Tests if the function returns null in case no record matching the given id is found */
            index = app.findRecord('invalid')
            expect(index).toBe(null)
        })
    }
)