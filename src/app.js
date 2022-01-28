/**
 * Research Assignment 1
 * This Program reads data from a csv file, parses it,
 * and store the filtered first five records in an array of objects which is later outputed on the screen
 * File: App.js
 * @author Serge Mugisha
 * @version 1.0.0
 */
const fs = require('fs')
const { parse } = require('csv-parse')
const Incident = require('./dto/Incident')

const filepath = './PICD.csv'

// Open IO and get data stream from the file
try {
    console.log("Opening file IO with Nodejs fs API module and reading the file at path: ", filepath, "\n -- Program by Serge Mugisha -- \n")
    /** 
     * This variable stores the data stream of the file
     * @type {string}
    */
    var dataStream = fs.readFileSync(filepath)

    // Parse the CSV, select few records, and filter desired columns and execute the callback after processing
    prepareRecords(dataStream, (results) => {
        // Output stored results
        console.log("\n Logging the stored resuls \n-- Program by Serge Mugisha -- \n")
        for (record in results) console.log(results[record])
        console.log("Program by Serge Mugisha :)")
    });

} catch (err) {
    // Catch thrown error and check if it's error code matches ENOENT (Error No Entry/Entity)
    if (err.code === 'ENOENT') {
        console.log('File not found. Please specify a correct path to the file!');
    } else {
        // Log all other thrown errors here 
        console.log(err.message);
    }
}

/**
 * This function Parses passed csv file stream to an array of arrays as rows
 * @function
 * @param {string} dataStream - Holds the file stream to be parsed and prepared
 * @param {function} callBack - Callback function to be executed after processing the data
*/
function prepareRecords(dataStream, callBack) {
    try {
        // Parse the CSV dataStream to an array of rows & filter needed columns
        console.log("Parsing the stored CSV data stream to an array of rows \n -- Program by Serge Mugisha -- \n")

        parse(dataStream, { columns: false, trim: true }, (err, rows) => {
            if (err) throw new Error("Error parsing file!", err)
            /** 
             * Stores parsed incident records from the csv file
             * @type {Array<string>} 
             */
            var parsedData = []
            // Select the first 5 rows from the csv exclusing column names
            console.log("Storing the first 5 records of the dataset (excluding column names) in a separate array. \n -- Program by Serge Mugisha -- \n")
            for (var i = 1; i <= 5; i++) {
                parsedData.push(rows[i])
            }

            /** 
             * This variable stores the parsed and filtered incident records.
             * @type {Array<object>}
            */
            var filteredData = []
            // Filter the columns from selected rows and create an object for each record
            console.log("Filtering columns from selected rows and creating an object for each record. \n -- Program by Serge Mugisha -- \n")
            for (var i = 0; i < 5; i++) {
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
                filteredData.push(incindent)
            }

            // return prepared data
            callBack(filteredData);

        })
    } catch (err) {
        // Log thrown parsing errors here. 
        console.log(err.message);
    }
}