/**
 * IncidentController.js
 * Contains the Controller logic code of the MVC, acts as a bride between user view and data model 
 * Program by Serge Mugisha
*/
const fs = require('fs')
const path = require('path')
const { parse } = require('csv-parse/sync')
const { stringify } = require('csv-stringify/sync')
const Incident = require('../models/Incident')

/** 
 * This variable stores the original csv dataset location
 *  @type {String}
*/
const filePath = path.join(__dirname, '../../PICD.csv')
/** 
 * This variable stores the final csv location.
 * @type {String}
*/
const fileSavePath = path.join(__dirname, '../../PICD_New.csv')
/** 
 * This variable stores the parsed and filtered incident records.
 * @type {Array<object>}
*/
var csvData = []
/** 
 * This variable stores the dataset Column names.
 * @type {Array<string>}
*/
const columnNames = ['Incident Number', 'Incident Types', 'Reported Date', 'Nearest Populated Centre', 'Province', 'Company', 'Substance', 'Significant', 'What Happened Category']

const loadFile = async () => {
    // Open IO and get data stream from the file
    try {
        console.log("Opening file IO with Nodejs fs API module and reading the file at path: ", filePath, "\n -- Program by Serge Mugisha -- \n")
        /** 
         * This variable stores the data stream of the file
         * @type {string}
        */
        var dataStream = fs.readFileSync(filePath)

        // Parse the CSV, select few records, and filter desired columns and execute the callback after processing
        console.log("Parsing the stored CSV data stream to an array of rows \n -- Program by Serge Mugisha -- \n")
        const rows = parse(dataStream, { columns: false, trim: true });
        
        /** 
         * Stores parsed incident records from the csv file
         * @type {Array<string>} 
        */
        var parsedData = []
        
        // Select the first 100 rows from the csv exclusing column names
        console.log("Storing the first 100 records of the dataset (excluding column names) in a separate array. \n -- Program by Serge Mugisha -- \n")
        for (var i = 1; i <= 100; i++) {
            parsedData.push(rows[i])
        }

        // Filter the columns from selected rows and create an object for each record
        console.log("Filtering columns from selected rows and creating an object for each record. \n -- Program by Serge Mugisha -- \n")
        for (var i = 0; i < 100; i++) {
            /** 
             * Stores individual record after filtering needed columns from the original data.
             * @type {Array<string>}
            */
            var record = []
            var columnIndexes = [0, 1, 2, 3, 4, 5, 10, 12, 17];
            
            // Iterate on the columnIndexes and push the reacord matching each index to the new array
            columnIndexes.map(index => record.push(parsedData[i][index]))

            /** 
             * Stores Incident record object instance after filtering needed columns from the original record.
             * @type {object}
            */
            var incindent = new Incident(record[0], record[1], record[2], record[3], record[4], record[5], record[6], record[7], record[8])

            // Add the new created incident object in the array
            csvData.push(incindent)
        }
        console.log("CSV File Loaded Successfully")
        
    } catch (err) {
        // Catch thrown error and check if it's error code matches ENOENT (Error No Entry/Entity)
        if (err.code === 'ENOENT') {
            console.log('File not found. Please specify a correct path to the file!');
            console.log(err)
        } else {
            // Log all other thrown errors here 
            console.log(err.message);
        }
    }
}

const saveFile = () => {
    try {
        // use the Stringify module to convert an array of objects into a string of comma separated values (csv)
        var csvStream = stringify(csvData);

        // use the Stringify module to conver an array of columns into a string of comma separated values (csv)
        var colNames = stringify([columnNames]);

        // concatenating columns with final dataset to form one string.
        const dataStream = colNames + csvStream;

        // Writting our string data to a file with fs module
        fs.writeFileSync(fileSavePath, dataStream)
        console.log("File saved Successfully at ", fileSavePath);
    } catch (err) {
        console.error(err)
    }
}

/**
 * This function finds a record in an array of objects matching the passed ID
 * Returns the object index if found, or null if not found.
 * @function
 * @param {string} id - Holds the id to be searched against
*/
const findRecord = (id) => {
    // Using the js array builtin fx to find an object whose incidentNumber matches the passed id
    let record = csvData.find(rec => rec.incidentNumber == id);
    if (record) return csvData.indexOf(record)
    else return null
}

/**
 * This function loops on the array of objects and log them on the screen
 * Returns the object index if found, or null if not found.
 * @function
*/
const viewRecords = () => csvData;

/**
 * This function logs the object matching the passed ID
 * @function
 * @param {string} id - Holds the id to be searched against
*/
const viewSingleRecord = (id) => {
    const index = findRecord(id)
    if (index != null) return csvData[index]
    else return null
}

/**
 * This function logs the object matching the passed ID
 * @function
 * @param {string} id - Holds the id to be searched against
*/
const addRecord = (record) => {
    var newIncindent = new Incident(...record)
    csvData.push(newIncindent);
    console.log("Record Added Sucessfully", newIncindent);
}

/**
 * This function updates the array of objects, replacing a given object with new data
 * @function
 * @param {string} record - Holds the new record object to update
 * @param {string} index - Holds the index of the object to be updated in the array
*/
const updateRecord = (record, index) => {
    var updatedIncindent = new Incident(...record)
    csvData.splice(index, 1, updatedIncindent);
    console.log("Incident Updated Successfully!")
}

/**
 * This removes the object at a passed index from the dataset array
 * @function
 * @param {string} index - Holds the index of the object to be deleted in the array
*/
const deleteRecord = (index) => {
    csvData.splice(index, 1)
    console.log("Record Deleted Successfully!")
}

module.exports = {
    loadFile,
    saveFile,
    viewRecords,
    findRecord,
    viewSingleRecord,
    addRecord,
    updateRecord,
    deleteRecord,
}