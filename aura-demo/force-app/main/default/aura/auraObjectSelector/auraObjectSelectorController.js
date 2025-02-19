({
    init : function(component) {
        component.set('v.selectedObject', '');
        component.set('v.objectSelected', false);
        component.set('v.objectsList', [
            // these objects are formatted to match what the lightning combobox is expecting
            {'label' : 'Account', 'value' : 'Account'},
            {'label' : 'Contact', 'value' : 'Contact'},
            {'label' : 'Course__c', 'value' : 'Course__c'}
        ]);
    },

    handleSelection : function(component, event) {
        
        // event contains data from the onchange event
        // var object = event.getParam("value");
        // component.set('v.selectedObject', object);

        // toggling on the field selector
        component.set('v.objectSelected', true);   
    }
})