({
    init: function(component, event, helper) {

        // format table columns
        let selectedFields = component.get("v.selectedFields");
        let formattedColumns = selectedFields.map(field => ({
            label: field,
            fieldName: field,
            type: 'text'
        }));
        component.set("v.tableColData", formattedColumns);

        // Fetch data from Apex when component loads - code in helper.js
        helper.fetchRecords(component);
    }
})