function validateExcel(records, inputFileBtn) {
    // Validate excel fields(columns)
    let excelIsvalid = true;
    let missingFields = [];

    const headers = records.shift(); // assign first element to header and remove it

    // Check each required field to see if it's in the headers
    requiredFields.forEach(field => {
        if (!headers.includes(field)) {
            excelIsvalid = false;
            missingFields.push(field);
        }
    });

    // Validation results
    if (excelIsvalid) {
        // Transform records in place, // Now records contain objects instead of arrays
        records.forEach((row, rowIndex) => {
            records[rowIndex] = { id: rowIndex + 1 };  // Initialize object with 'id' key
            headers.forEach((header, index) => {
                records[rowIndex][header] = row[index] || ''; // Assign Cell value or empty string if missing
            });
        });

        return records;

    } else {
        alert(`Some required fields are missing: \n- ${missingFields.join('\n- ')}`);
        inputFileBtn.value = '';  // Clear the input so the user can re-upload the correct file
        return false;
    }
}

// To Process Multiple Records One by One  
function validateRecords(recordsObject) {
    let RecordsValidationResults = []; // Array of objects where each object is { record:{}, ErrorCodes[] }

    for (const record of recordsObject) {
        const recordInformation = validateRecord(record);
        RecordsValidationResults.push(recordInformation);
    }
    return RecordsValidationResults;
}

// Validates Single Record
function validateRecord(record) {
    let recordInformation = {}; // Structure: { record:{}, ErrorCodes[] }
    let ErrorCodes = [];  // Array of objects where each object is {'fieldName': ErrorCodes[]}
    
    // Array of validation functions
    const validationFunctions = [
        
    ];

    // Iterate through each validation function
    validationFunctions.forEach(func => {
        const result = func(record);
        ErrorCodes.push(result);
    });

    // General 4 Fields
    const resultSmallTextFields = validateSmallTextFields(record);
    ErrorCodes.push(...resultSmallTextFields);  // Pushes resultSmallTextFields Array's element one by one

    // General 3 required Fields
    const resultLargeTextFields = validateLargeTextFields(record);
    ErrorCodes.push(...resultLargeTextFields);

    // General 4 Fields
    const resultDropdownFields = validateDropdownFields(record);
    ErrorCodes.push(...resultDropdownFields);

    return recordInformation;
}


// Functions to Validate field Value
function validateSmallTextFields(record) {
    
}
function validateLargeTextFields(record) {
    
}
function validateDropdownFields(record) {
    
}
