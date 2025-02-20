import { LightningElement, wire } from 'lwc';
import { MessageContext, subscribe } from 'lightning/messageService'
import OBJECT_SEARCH_CHANNEL from '@salesforce/messageChannel/ObjectSearch__c';
import getRecords from '@salesforce/apex/DynamicObjectSearchController.getRecords'

export default class SearchResults extends LightningElement {

    subscription = null;            // subscription to message channel
    selectedObject;                 // object selected by the user
    selectedFields;                 // fields selected by the user
    errorMessage;                   // text to display if any errors occur
    toggleTable = false;            // toggles view to the lightning datatable

    tableRowData = [];              // contains all the records that will go in the rows of the table
    tableColData = [];              // contains all the field names that will go in the columns of the table

    @wire(MessageContext)
    messageContext;                 // wiring in Lightning Message Service

    // calling an apex method to retrieve records from the org
    @wire(getRecords, {objectName : '$selectedObject', fieldNames : '$selectedFields'}) 
    wiredRecords(result) {
        if(result.data) {

            // setting the table data
            this.tableRowData = result.data;

            // ensuring the error message does not display
            this.errorMessage = null;
            this.toggleTable = true;
        }
        else if(result.error) {

            // setting the error message
            this.errorMessage = 'Data could not be retrieved.';
            this.toggleTable = false;
        }
    }

    // lifecycle method that fires when the component is inserted into the DOM
    connectedCallback() {

        // subscribing to the proper message channel as soon as possible
        this.subscription = subscribe(
            this.messageContext, 
            OBJECT_SEARCH_CHANNEL,
            (message) => this.handleMessage(message)
        );
    }

    // handler for receiving messages from the message channel
    handleMessage(message) {

        // setting object and fields
        this.selectedObject = message.object;
        this.selectedFields = message.fields;

        // setting columns with field data and formatting data to be used by lightning-datatable
        this.tableColData = this.selectedFields.map((element) => ({
            label : element,
            fieldName: element,
            type : 'text'
        }));
    }
}