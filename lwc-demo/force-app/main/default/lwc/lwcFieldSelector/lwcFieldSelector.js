import { LightningElement, api, wire } from 'lwc';
import getObjectFields from '@salesforce/apex/DynamicObjectSearchController.getObjectFields'

export default class FieldSelector extends LightningElement {

    @api 
    objectToUse;                    // sObject passed in by parent
    allFieldsList = [];             // all fields from the sObject
    selectedFieldsList = [];        // all fields that have been selected by the user
    errorMessage;                   // text to display if any errors occur
    disableButton = true;           // toggle for submit button

    // calling an apex method to retrieve all the fields for the provided object
    @wire(getObjectFields, {objectName : '$objectToUse'})       // $ makes this action reactive to every change made to objectToUse
    wiredFields(result){
        if(result.data) {
            
            // translate the returned fields into usable objects for the dual selection box
            this.allFieldsList = result.data.map((element) => ({
                label : element,
                value : element
            }));

            // ensuring the error message does not display
            this.errorMessage = null;
        }
        else if(result.error) {
            this.errorMessage = 'Fields could not be retrieved.';
        }
    }

    // event handler for when fields are either selected or removed from the selected list
    handleSelections(event) {

        // set the fields
        this.selectedFieldsList = event.detail.value;
        
        // toggle button on/off
        if(this.selectedFieldsList.length > 0) {
            this.disableButton = false;
        }
        else {
            this.disableButton = true;
        }
    }

    // broadcast new event when submission occurs
    handleSubmit(event) {

        event.preventDefault();

        // creating the custom event and setting the data inside of it
        const fieldsSubmitted = new CustomEvent('fieldsubmit', {
            detail: { selectedFields : this.selectedFieldsList }    // detail needs to be an object
        });

        // broadcasting the event to be caught by a parent component (objectSelector)
        this.dispatchEvent(fieldsSubmitted);
    }
}