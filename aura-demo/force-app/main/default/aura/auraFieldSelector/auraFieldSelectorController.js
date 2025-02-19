({
    init : function(component, event, helper) {

        // getting method from the Apex controller
        var action = component.get("c.getObjectFields");

        console.log(component.get('v.objectToUse'));
        action.setParams({ objectName : component.get('v.objectToUse')});     // setting method params


        // set a callback function to run when the method returns
        action.setCallback(this, function (response) {

            console.log(response);
            
            var state = response.getState();    // current state of the method call

            if(state === 'SUCCESS') {
                var fields = response.getReturnValue();     // returned data from apex method

                // formatting fields to work with the lightning multi-select box
                var formattedFields = [];
                for(var field of fields) {
                    formattedFields.push({label: field, value: field});
                }

                component.set('v.allFieldsList', formattedFields);
            }
            else {
                // error handling

                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        // log the error passed in to AuraHandledException
                        console.log("Error message: " + errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }
            }

        });

        // call the apex method
        $A.enqueueAction(action);
    },

    handleSubmit : function (component, event, helper) {
        event.preventDefault();
        
        // retrieving values from component
        var selectedObject = component.get("v.objectToUse");
        var selectedFields = component.get("v.selectedFieldsList");

        // sending off the event message with the name given in registerEvent
        var searchEvent = component.getEvent("objectSearchEvent");
        searchEvent.setParams({
            object : selectedObject,
            fields: selectedFields
        });
        searchEvent.fire();
    }
})