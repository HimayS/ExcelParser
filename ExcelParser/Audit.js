//Function to generate change report for a row
function generateSingleAuditReport(id, oldRecord, newRecordResult) {


    if (!oldRecord || !newRecordResult) {
        return `Record with id ${id} not found.`;
    }

    let changes = [];

    for (let key in oldRecord) {
        if(key === 'id') continue;
        let oldValue = oldRecord[key];
        let newValue = newRecordResult[key];

        // Add both old and new values for each field regardless of any change
        changes.push({
            fieldName: key,
            oldValue: oldValue,
            newValue: String(oldValue) === String(newValue) ? '' : newValue
        });
    }

    return { recordId: id, changes: changes };
}