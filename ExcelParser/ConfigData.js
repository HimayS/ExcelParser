// requiredFields must be present in Excel
const requiredFields = [
    
];

// All Possible Unique Field Names
const fieldNames = [
    
];

// tooltipTitle contains fieldNames whose value not fit in cell, so it shows full value on hover 
const tooltipTitle = [
    
];

// smallTextFields with 150 char limit inputbox
const smallTextFields = [ 
    
];

// largeTextFields with 1024 char limit textarea
const largeTextFields = [
    
];

// all date fields to convert Excel's numeric date format(number of days since Jan 1, 1900) to yyyy-mm-dd
const dateFieldNames = [
    
];


// Create table headers dynamically
const tableHeader = `
    <table class="excelTable">
        <thead>

            <tr>
                <th class="excelHeader">Sr. No.</th>
                ${fieldNames.map(field => `<th class="excelHeader">${field}</th>`).join('')}
                <th class="excelHeader">Actions</th>
            </tr>
            
        </thead>
        <tbody id="excel-table-body">
            <!-- Rows will be dynamically inserted here -->
        </tbody>
    </table>
`;