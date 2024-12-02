// Function to render a single record (row)
function renderRecord(element) {
    const record = element.record;
    const errorCodes = element.ErrorCodes; // Array of Objects, fieldErrObj: {'fieldName': [ErrorCode1, ErrorCode2]}
    // Get the table body element where rows will be appended
    const tableBody = document.getElementById('excel-table-body');

    // Apply red background if there's an error
    const fieldStyle = fieldNames.map((fieldName) => {
        return hasError(fieldName, errorCodes) ? 'color: red; background-color: #ffe6db;' : '';
    });

    const rowTemplate = `
            <tr id="${record.id}">

                <td class="excelData">
                ${record.id}
                ${generateErrorTooltip(errorCodes) ? `<i class="infoIcon" id="infoIcon-${record.id}">&#9888;</i>` : ''}
                </td>

                ${fieldNames.map((fieldName, index) => `
                    <td class="excelData" id="${index}-${record.id}" style="${fieldStyle[index]}"
                        ${tooltipTitle.includes(fieldName) ? `title="${record[fieldName] || ''}"` : ''}
                    >${record[fieldName] || ''}</td>
                `).join('')}
                
                <td class="excelData">
                    <button id="editBtn-${record.id}" class="editBtn">Edit</button>
                    <button id="saveBtn-${record.id}" class="saveBtn" style="display: none;">Save</button>
                    <button id="editFormBtn-${record.id}" class="editFormBtn">Edit in Form</button>
                    <button id="submitBtn-${record.id}" class="submitBtn">Submit</button>
                    <button id="auditBtn-${record.id}" class="auditBtn">View Changes</button>
                </td>
            </tr>
        `;

    // If the row already exists, replace it, otherwise append it
    const existingRow = document.getElementById(record.id);
    if (existingRow) {
        existingRow.outerHTML = rowTemplate; // Replace the row
    } else {
        tableBody.insertAdjacentHTML('beforeend', rowTemplate); // Append a new row
    }
}
// function to save edited Record, Revalidate and Re-render
function saveRow(recordId, RecordsValidationResults, isModal = false) {
    const record = RecordsValidationResults.find(r => r.record.id === recordId).record; // Find the record based on the ID

    // Loop through each fieldName to save the updated values
    fieldNames.forEach((fieldName, index) => {
        // Select cells based on the context
        const cell = isModal
            ? document.getElementById(`modal-${index}-${recordId}`)  // Modal context
            : document.getElementById(`${index}-${recordId}`);  // Table context
        const input = cell.querySelector('input, textarea, select'); // Get input or select element

        if (input) {
            if (input.multiple) {
                // If it's a multi-select dropdown, get all selected options
                const selectedOptions = Array.from(input.selectedOptions).map(option => option.value);
                record[fieldName] = selectedOptions.join(', '); // Store as an array
            } else {
                record[fieldName] = input.value; // Save the updated value to the record object
            }
        }
    });

    // Revalidate the record
    const updatedValidationResult = validateRecord(record);

    // Replace the record in RecordsValidationResults
    const index = RecordsValidationResults.findIndex(r => r.record.id === record.id);
    if (index > -1) {
        RecordsValidationResults[index] = updatedValidationResult;
    }

    // Re-render this specific record
    renderRecord(updatedValidationResult);
}