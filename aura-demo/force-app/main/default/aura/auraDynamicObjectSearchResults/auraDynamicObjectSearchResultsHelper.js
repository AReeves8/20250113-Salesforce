({
    fetchRecords: function (component) {

        // calling the get records method
        var action = component.get("c.getRecords");
        action.setParams({
            objectName: component.get("v.selectedObject"),
            fieldNames: component.get("v.selectedFields")
        });

        action.setCallback(this, function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.tableRowData", response.getReturnValue());     // adding returned records to table
                component.set("v.errorMessage", null);
            } else {
                component.set("v.errorMessage", "Data could not be retrieved.");
            }
        });

        $A.enqueueAction(action);
    }
})