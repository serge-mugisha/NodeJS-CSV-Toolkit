/**
 * MainView.js
 * Contains the View part code of the MVC, deals with Uset-nteractions
 * Program by Serge Mugisha
*/
const prompt = require('prompt');
const controller = require('../controllers/incidentController');
const Incident = require('../models/Incident');

// Constant variables holding menu options
const RELOAD_FILE = 1
const SAVE_FILE = 2
const VIEW_RECORDS = 3
const VIEW_RECORD = 4
const ADD_RECORD = 5
const EDIT_RECORD = 6
const DELETE_RECORD = 7
const EXIT_PROGRAM = 0

/** 
 * Holds a boolean value to ckeck if the program should keep running, or exit
 * @type {Number}
*/
let reloadMenu = true;
/** 
 * Holds a single incident object to be used on user inputs and switch cases.
 * @type {Number}
*/
let incident;

/**
 * This function outputs the menu to the screen.
 * @function
*/
const menu = () => {
    console.log("Please choose one of the following options\n", "===============================================")
    console.log(`${RELOAD_FILE} Reload the CSV from disk \n${SAVE_FILE} Save current data to the CSV \n${VIEW_RECORDS} View a set of records,\n${VIEW_RECORD} View one record
    \n${ADD_RECORD} Add a new record \n${EDIT_RECORD} Edit a record \n${DELETE_RECORD} Delete a record \n${EXIT_PROGRAM} Exit the Program
    \n===============================================`);
}

/**
 * This is the menu system
 * Accepts user input and calls related controller function to handle the operation
 * @function
*/
const menuSystem = async () => {

    // Load the csv file before doing anything.
    await controller.loadFile()
    while (reloadMenu) {
        menu()
        // start the prompt module for user
        prompt.start()
        const { choice } = await prompt.get(['choice']);

        switch (Number(choice)) {
            case RELOAD_FILE: //Done
                controller.loadFile()
                break

            case SAVE_FILE:  //Done
                controller.saveFile()
                break

            case VIEW_RECORDS: //Done
                const records = controller.viewRecords();
                for (var item in records) {
                    console.log(records[item]);
                }
                console.log('========================== End of Records ========================== \n-- Program by Serge Mugisha --')
                break

            case VIEW_RECORD: //Done
                incident = await prompt.get(['incidentNumber']);
                const result = controller.viewSingleRecord(incident.incidentNumber);
                if (result != null) {
                    console.log("Search results for ", incident.incidentNumber)
                    console.log(result)
                }
                else {
                    console.log("No result matching incident number: ", incident.incidentNumber)
                }
                break

            case ADD_RECORD:  //Done
                const { incidentNumber } = await prompt.get(['incidentNumber']);
                const { incidentType } = await prompt.get(['incidentType']);
                const { reportedDate } = await prompt.get(['reportedDate']);
                const { nearestPopulatedCentre } = await prompt.get(['nearestPopulatedCentre']);
                const { province } = await prompt.get(['province']);
                const { company } = await prompt.get(['company']);
                const { substance } = await prompt.get(['substance']);
                const { significant } = await prompt.get(['significant']);
                const { whatHappenedCategory } = await prompt.get(['whatHappenedCategory']);

                const record = [
                    incidentNumber,
                    incidentType,
                    reportedDate,
                    nearestPopulatedCentre,
                    province,
                    company,
                    substance,
                    significant,
                    whatHappenedCategory
                ]
                controller.addRecord(record);
                break

            case EDIT_RECORD:  //Done
                incident = await prompt.get(['incidentNumber'])
                const index = controller.findRecord(incident.incidentNumber);
                if (index != null) {
                    const { incidentNumber } = await prompt.get(['incidentNumber']);
                    const { incidentType } = await prompt.get(['incidentType']);
                    const { reportedDate } = await prompt.get(['reportedDate']);
                    const { nearestPopulatedCentre } = await prompt.get(['nearestPopulatedCentre']);
                    const { province } = await prompt.get(['province']);
                    const { company } = await prompt.get(['company']);
                    const { substance } = await prompt.get(['substance']);
                    const { significant } = await prompt.get(['significant']);
                    const { whatHappenedCategory } = await prompt.get(['whatHappenedCategory']);

                    const record = [
                        incidentNumber,
                        incidentType,
                        reportedDate,
                        nearestPopulatedCentre,
                        province,
                        company,
                        substance,
                        significant,
                        whatHappenedCategory
                    ]
                    controller.updateRecord(record, index);
                }
                else console.log("No record found matching: ", incident.incidentNumber)
                break

            case DELETE_RECORD:  //Done
                incident = await prompt.get(['incidentNumber'])
                const RecordIndex = controller.findRecord(incident.incidentNumber);
                if (RecordIndex != null) controller.deleteRecord(RecordIndex);
                else console.log("No record found matching: ", incident.incidentNumber)
                break

            case EXIT_PROGRAM: //Done
                console.log("Thanks for using the CSV Toolkit! - Program by Serge Mugisha")
                reloadMenu = false;
                break

            default:
                console.log(choice, "Is an invalid input! \n-- Program by Serge Mugisha --")
        }
    }
}

module.exports = {
    menuSystem,
}