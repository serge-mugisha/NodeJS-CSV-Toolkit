## A1 Instructions
- Create a record object (also known as entity object, data-transfer object) that uses the column
  names from the dataset as part of the source code, e.g. variable names, accessors/mutators names, or constants.

- Use File-IO on startup to open and read the dataset
- Initializing a few record objects with data parsed from the first few records in the csv file.
- The record objects should be stored in a simple data structure (array or a list)
- Use exception handling in case the file is missing or not available.

- Loop over the data structure, and output the record data on screen
- Displays your full name on screen so it remains visible at all times.

- Use JSDoc to document your code

### A1 Progeamming Concepts

- variables
- methods
- loop structure
- FileIO reading from the dataset
- exception handling
- use of an API library
- an array (simiral data structure)
================================================================================================

## A2 Instructions

- Reload the data from the dataset, replacing the in-memory data
- Persist the data from memory to the disk as a comma-separated file, writing to a new file
- Select and display either one record, or display multiple records from the in-memory data. 
- Create a new record and store it in the simple data structure in memory
- Select and edit a record held in the simple data structure in memory
- Select and delete a record from the simple data structure in memory

** Single unit test about one of the follo:
- Does the program read in records, placing data into correct fields of record objects? 
- Does the program add a new record into the sequential data structure? 
- Does the program update a record in the sequential data structure as expected? 
- Does the program remove a record from the sequential data structure as expected?
- Does the program catch any exceptions or errors if the file is missing?
### A2 Progeamming Concepts

- decision structure
- File-IO reading from the dataset
- File-IO writing a csv file
- exception handling
- use of an API library
- an array (or similar data structure)
- unit testing
- N-Layered or MVC architecture.

## A3 Instructions

- Use a List, Set, or Tree (etc.) rather than a simple array
- Sort the records in the data structure based on single column from the dataset. (You may use built-in API libraries to complete this task)
- Offer the user the option to use this functionality
- You must perform sorting using programming code (or an API call) and not an SQL statement sent into a database
- Write a single unit-test using a testing framework to test your new advanced topic (If using a sorting algorithm, did the program sort the records correctly)


## A4 Instructions

- Horizontal Bar Chart
- The user must be able to interact with the program at run time to customize the output (what parts of the data to chart on)

** pipeline-incidents-comprehensive-data

** columns: A,B,C,D,E,F,K,M,R

** Operations: Create, Read, Update, Delete
