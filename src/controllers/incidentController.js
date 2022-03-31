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
const { bar, bg, fg } = require('ervy')

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
 * @type {Map<object>}
 */
// ====================================================================================
var csvData = new Map()

/** 
 * This variable stores the dataset Column names.
 * @type {Map<string>}
 */
const columnNames = ['Incident Number', 'Incident Types', 'Reported Date', 'Nearest Populated Centre', 'Province', 'Company', 'Substance', 'Significant', 'What Happened Category']
var columnIndexes = [0, 1, 2, 3, 4, 5, 10, 12, 17];

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

        // Filter the columns from selected rows and create an object for each record
        console.log("Filtering columns from selected rows and creating an object for each record.")
        // for (var i = 1; i < rows.length; i++) {
            for (var i = 1; i < 20; i++) {
            /** 
             * Stores individual record after filtering needed columns from the original data.
             * @type {Array<string>}
            */
            var record = []

            // Iterate on the columnIndexes and push the reacord matching each key to the new array
            columnIndexes.map(key => record.push(rows[i][key]))

            /** 
             * Stores Incident record object instance after filtering needed columns from the original record.
             * @type {object}
            */
            var incindent = new Incident(record[0], record[1], record[2], record[3], record[4], record[5], record[6], record[7], record[8])

            // Add the new created incident object on the Map
            csvData.set(incindent.incidentNumber, incindent)
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
        var data = [];
        csvData.forEach((value) => data.push(value))
        var csvStream = stringify(data);

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
 * Returns the object key if found, or null if not found.
 * @function
 * @param {string} id - Holds the id to be searched against
*/
const findRecord = (id) => {
    let result = csvData.has(id);
    if (result) return csvData.get(id).incidentNumber
    else return null
}

// ====================================================================================
/**
 * This function loops on the array of objects and log them on the screen
 * Returns the object key if found, or null if not found.
 * @function
*/
const viewRecords = () => csvData;

/**
 * This function logs the object matching the passed ID
 * @function
 * @param {string} id - Holds the id to be searched against
*/
const viewSingleRecord = (id) => {
    // const key = findRecord(id)
    let result = csvData.has(id)
    if (result != null) return csvData.get(id)
    else return null
}

/**
 * This function logs the object matching the passed ID
 * @function
 * @param {string} id - Holds the id to be searched against
*/
const addRecord = (record) => {
    var newIncindent = new Incident(...record)
    csvData.set(newIncindent.incidentNumber, newIncindent);
    return newIncindent;
}

/**
 * This function updates the array of objects, replacing a given object with new data
 * @function
 * @param {string} record - Holds the new record object to update
 * @param {string} key - Holds the key of the object to be updated in the array
*/
const updateRecord = (record, key) => {
    var updatedIncindent = new Incident(...record)
    csvData.set(key, updatedIncindent);
    console.log("Incident Updated Successfully!")
}

/**
 * This removes the object at a passed key from the dataset array
 * @function
 * @param {string} key - Holds the key of the object to be deleted in the array
*/
const deleteRecord = (key) => {
    csvData.delete(key)
    console.log("Record Deleted Successfully!")
}

/**
 * This function Sorts the dataset by passed column number
 * @function
 * @param {Number} column - Holds the Column number to sort on
*/
const sortDataset = (column) => {
    var colIndex = parseInt(column) - 1
    var colNames = ['incidentNumber', 'incidentType', 'reportedDate', 'nearestPopulatedCentre', 'province', 'company', 'substance', 'significant', 'whatHappenedCategory']
    var colName = colNames[colIndex]
    if (0 <= column <= 8) {
        // Sort function comparing keys with key1 key2 or values with val1[colName] val2[colName]
        var sorted = [...csvData].sort(([key1, val1], [key2, val2]) => val1[colName].localeCompare(val2[colName]));
        csvData = new Map(sorted)
        return csvData
    }
    else {
        console.log("Invalid column")
    }
}

const graphDataset = (column) => {
    var colIndex = parseInt(column) - 1
    var colNames = ['incidentNumber', 'incidentType', 'reportedDate', 'nearestPopulatedCentre', 'province', 'company', 'substance', 'significant', 'whatHappenedCategory']
    var colName = colNames[colIndex]

    var chartColors = ['red', 'green', 'yellow', 'blue', 'magenta', 'cyan']

    // Contains the selected column
    var selectedCol = [];
    for (const [key, value] of csvData) {
        selectedCol.push({ key, value: value[colName] });
    }

    // Holds column's unique values
    var filteredCol = selectedCol.map(item => item.value).filter((value, index, self) => self.indexOf(value) === index)


    var counts = []
    for (var index in filteredCol) {
        // If the Key Contains spaces (It will look long on chart), Make it's abreviation.
        var key = filteredCol[index].indexOf(' ') >= 0 ? filteredCol[index].match(/[A-Z]/g).join('') : filteredCol[index]

        // The the count each column's record has in the dataset
        var value = selectedCol.filter((obj) => obj.value === filteredCol[index]).length
        
        // Generate random bar colors to make it easy to differentiate bars
        var color = chartColors[(Math.floor((Math.random() * 6) + 1) - 1)]

        counts.push({ key, value, style: bg(color) })
    }

    console.log(bar(counts, { padding: 10 }))
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
    sortDataset,
    graphDataset,
}