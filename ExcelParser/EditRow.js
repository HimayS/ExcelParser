let rowCells = [];  // Create an array to store the record's cell elements

function editRow(recordId, record, isModal = false) {

    rowCells = []
    fieldNames.forEach((fieldName, index) => {
        // Select cells based on the context
        const cell = isModal 
            ? document.getElementById(`modal-${index}-${recordId}`)  // Modal context
            : document.getElementById(`${index}-${recordId}`);  // Table context

        if (cell) {
            rowCells.push(cell);  // Add the cell element to the array
        }
    });

   
}