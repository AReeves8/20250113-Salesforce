import { LightningElement, wire } from 'lwc';
import { MessageContext, publish } from 'lightning/messageService'
import OBJECT_SEARCH_CHANNEL from '@salesforce/messageChannel/ObjectSearch__c';

export default class ObjectSelector extends LightningElement {

    objectSelected = false;                             // toggle for showing field options
    selectedObject;                                     // the object selected by the user
    objectsList = [                                     // the available object options - formatted for use in lightning-combobox
        { label : 'Account', value : 'Account'},
        { label : 'Contact', value : 'Contact'},
        { label : 'Lead', value : 'Lead'}
    ];

    @wire(MessageContext)
    messageContext;                                     // wiring in Lightning Message Service

    // handling when an object is selected from the drop-down
    handleSelection(event) {
        this.objectSelected = true;
        this.selectedObject = event.detail.value;
    }

    // handling the custom 'fieldsubmit' event from the child component fieldSelector
    handleFields(event) {

        // setting the data for the message
        const payload = {
            object : this.selectedObject,
            fields : event.detail.selectedFields
        }

        // publishing the message
        publish(this.messageContext, OBJECT_SEARCH_CHANNEL, payload);
    }
}