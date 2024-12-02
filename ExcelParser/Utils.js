// Function to convert excel date serial number to yyyy-mm-dd
function convertToYYYYMMDD(dateNumber) {
    // Check if the input is a string or not a valid number
    if (typeof dateNumber === 'string' || isNaN(dateNumber)) {
        return dateNumber;
    }
    
    const excelBaseDate = new Date(1900, 0, 1); // Excel Counts days for any date from January 1, 1900

    // Calculate the JavaScript date by adding the number of days
    const date = new Date(excelBaseDate.getTime() + (dateNumber - 2) * 86400000);

    // Format the date to yyyy-mm-dd
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}


// Function to Check if endDate is After StartDate
function isAfterStartDate(endDate, startDate) {
    // Convert input dates to Date objects (if they are not already)
    const end = new Date(endDate);
    const start = new Date(startDate);
    return end > start; // if endDate is after startDate return true else false
}

// function to check if date is in yyyy-mm-dd format
function isValidDate(dateString) {
    const regex = /^(\d{4})-(\d{2})-(\d{2})$/;
    // Ensure dateString is treated as a string
    const match = String(dateString).match(regex);
    if (!match) return false;

    const year = parseInt(match[1], 10);
    const month = parseInt(match[2], 10);
    const day = parseInt(match[3], 10);

    // Check if date is valid
    const date = new Date(year, month - 1, day);
    return (date.getFullYear() === year && date.getMonth() + 1 === month && date.getDate() === day);
}

// Function to check if a specific field has an error
function hasError(fieldName, errorCodes) {
    const fieldErrObj = errorCodes.find(Obj => Obj[fieldName]); // fieldErrObj: {'fieldName': [ErrorCode1, ErrorCode2]}

    return fieldErrObj ? fieldErrObj[fieldName].length > 0 : false;
}

// Generate tooltip content for error codes
function generateErrorTooltip(errorCodes) {
    
}

// Function to create and append a textbox to a table cell
function replaceTextbox(cell, cellValue) {
    const input = document.createElement('input');
    input.type = 'text';
    input.classList.add('custom-input');

    input.value = cellValue || ''; // Set current cell value
    cell.innerHTML = '';           // Clear cell content
    cell.appendChild(input);       // Append input to cell

    return input; // Return the input element for further use
}

// Function to create and append a textarea to a table cell
function replaceTextarea(cell, cellValue, isEnabled) {
    const textarea = document.createElement('textarea');
    textarea.classList.add('custom-textarea');
    textarea.placeholder = isEnabled ? 'Please specify...' : 'Disabled';
    textarea.disabled = !isEnabled;   // Enable or disable based on need

    textarea.value = cellValue || ''; // Set current cell value
    cell.innerHTML = '';              // Clear cell content
    cell.appendChild(textarea);       // Append input to cell

    return textarea; // Return the textarea element for further use
}

// Function to create and append a date picker to a table cell
function replaceDatepicker(cell, cellValue, isEnabled) {
    const input = document.createElement('input');
    input.type = 'date';
    input.classList.add('custom-date-picker');
    input.disabled = !isEnabled;   // Enable or disable based on the need

    // Check if cellValue is a valid date, otherwise set it to empty
    input.value = !isNaN(Date.parse(cellValue)) ? cellValue : '';
    
    cell.innerHTML = '';           // Clear cell content
    cell.appendChild(input);       // Append input to cell

    return input; // Return the input element for further use
}

// Function to create a dropdown where if parameter selectedValue is not in options then it will select first option by default
function replaceDefaultDropDown(cell, selectedValue, dropdownOptions) {
    const select = document.createElement('select');
    select.classList.add('custom-dropdown');

    dropdownOptions.forEach(option => {
        const opt = document.createElement('option');
        opt.value = option;
        opt.textContent = option;
        if (option === selectedValue) {
            opt.selected = true; // Select the current value
        }
        select.appendChild(opt);
    });

    // Clear the cell content and append the dropdown
    cell.innerHTML = '';
    cell.appendChild(select);

    return select; // Return the select element for further use
}

// Function to create a dropdown element which preserves selectedValue even if not in options
function replaceDropdown(cell, selectedValue, dropdownOptions) {
    const select = document.createElement('select');
    select.classList.add('custom-dropdown');

    // Check if the selectedValue exists in the options
    let isValidValue = dropdownOptions.includes(selectedValue);

    // Add a blank option for empty selectedValue
    if (selectedValue === '') {
        const blankOption = document.createElement('option');
        blankOption.value = ''; // Ensure the value is empty
        blankOption.textContent = ''; // Display as empty
        blankOption.selected = true; // Select this option
        select.appendChild(blankOption);
    }

    // Populate the options in the dropdown
    dropdownOptions.forEach(option => {
        const opt = document.createElement('option');
        opt.value = option;
        opt.textContent = option;
        if (option === selectedValue) {
            opt.selected = true; // Select the current value
        }
        select.appendChild(opt);
    });

    // If the selectedValue is not in options and is not empty, add it temporarily
    if (selectedValue && !isValidValue) {
        const tempOption = document.createElement('option');
        tempOption.value = selectedValue;
        tempOption.textContent = `${selectedValue} (invalid)`; // Label it as invalid
        tempOption.selected = true;
        tempOption.disabled = true; // Make it unselectable
        select.appendChild(tempOption);
    }

    // Clear the cell content and append the dropdown
    cell.innerHTML = '';
    cell.appendChild(select);

    return select; // Return the select element for further use
}