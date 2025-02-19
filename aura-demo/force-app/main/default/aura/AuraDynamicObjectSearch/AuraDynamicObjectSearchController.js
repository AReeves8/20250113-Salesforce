({
    // 3 optional params: the component, an event, the helper controller
    init : function(component, event, helper) {
        
        // setting initial values for our attributes
        component.set("v.selectedObject", "");
        component.set("v.selectedFields", []);
    },

    handleEvent : function(component, event, helper) {

        // when component event is received from child, set the selected objects and fields
        component.set("v.selectedObject", event.getParam('object'));
        component.set("v.selectedFields", event.getParam('fields'));
    },
})