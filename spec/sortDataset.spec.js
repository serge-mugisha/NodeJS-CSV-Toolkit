var app = require("../src/controllers/incidentController");
const Incident = require('../src/models/Incident')


/** Individual test to test the findRecord() function */
describe(
    "Sort Dataset", () => {
        beforeEach(function () {
            /** Add records to the app before performing sort functionality */
            app.addRecord(["INC2008-020", "Release of Substance", "03/03/2008", "Dryden", "Ontario", "TransCanada PipeLines Limited", "Natural Gas - Sweet", "No", "Corrosion and Cracking"])
            app.addRecord(["INC2007-097", "Release of Substance", "01/02/2008", "Grande Prairie", "Alberta", "Alliance Pipeline Ltd.", "Natural Gas - Sweet", "No", "Corrosion and Cracking"])
            app.addRecord(["INC2007-098", "Release of Substance", "01/03/2008", "Beiseker", "Ontario", "Alliance Pipeline Ltd.", "Natural Gas - Sweet", "No", "Corrosion and Cracking"])
        });

        /** Test case description */
        it("The function should sort the dataset by reported date and return sorted data", () => {
            
            // Define sorted data by reported date to compare against
            var sorted = new Map()
            sorted.set('INC2007-097', new Incident("INC2007-097", "Release of Substance", "01/02/2008", "Grande Prairie", "Alberta", "Alliance Pipeline Ltd.", "Natural Gas - Sweet", "No", "Corrosion and Cracking"))
            sorted.set('INC2007-098', new Incident("INC2007-098", "Release of Substance", "01/03/2008", "Beiseker", "Ontario", "Alliance Pipeline Ltd.", "Natural Gas - Sweet", "No", "Corrosion and Cracking"))
            sorted.set('INC2008-020', new Incident("INC2008-020", "Release of Substance", "03/03/2008", "Dryden", "Ontario", "TransCanada PipeLines Limited", "Natural Gas - Sweet", "No", "Corrosion and Cracking"))

            /** Tests if the function sorts data by reported date (column n0.3) and returns sorted dataset */
            console.log("Testing the sortDataset() controller function...    By Serge Mugisha")
            var newDataset = app.sortDataset(3)
            expect(Array.from(newDataset)).toEqual(Array.from(sorted))

        })
    }
)