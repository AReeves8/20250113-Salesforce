import { getFieldValue, getRecord } from 'lightning/uiRecordApi';
import { api, LightningElement, wire } from 'lwc';
import ACCOUNT_NAME_FIELD from '@salesforce/schema/Account.Name';
import getCertsHeld from '@salesforce/apex/CertCheckerController.getCertsHeld';
import deleteCertsHeld from '@salesforce/apex/CertCheckerController.deleteCertsHeld';
import { refreshApex } from '@salesforce/apex';

export default class TechsCertsHeld extends LightningElement {

    @api accountId;
    cardTitle = 'Awaiting Account Id';
    errorMessage;
    wiredResult;
    deleteButtonDisabled = true;
    selectedRows = [];
    rowData = [];
    colData = [
        {label: 'Technician', fieldName: 'TechName', type: 'text'},
        {label: 'Certification', fieldName: 'CertName', type: 'text'},
        {label: 'Date Achieved', fieldName: 'DateAchieved', type: 'date'},
    ];  // fieldName needs to match the property name of your rowData

    // $ - attribute is responsive. when accountId changes, this @wire call will run again
    @wire(getRecord, {recordId : '$accountId', fields : [ACCOUNT_NAME_FIELD] })
    wiredAccount(result) {      // result contains the returned data from wire service function call
        if(result.data) {
            this.cardTitle = getFieldValue(result.data, ACCOUNT_NAME_FIELD) + '\'s Technicians';
        }
        else if(result.error) {
            this.cardTitle = 'The Account was unable to be retrieved.'
        }
    }


    @wire(getCertsHeld, {acctId : '$accountId'})
    wiredCertHeldRecords(results) {

        this.wiredResult = results;

        if(results.data) {
            this.rowData = results.data.map((record) => ({
                Id : record.Id,
                TechName : record.Certified_Professional__r.Name,
                CertName : record.Certification__r.Name,
                TechId : record.Certified_Professional__c,
                CertId : record.Certification__c,
                DateAchieved : record.Date_Achieved__c
            }));
            this.errorMessage = null;
        }
        else if(results.error) {
            this.errorMessage = results.error.body.message;
        }
    }

    handleSelections(event) {

        let ids = [];
        if(event.detail.selectedRows.length > 0) {
            this.selectedRows = event.detail.selectedRows;
            ids = this.selectedRows.map((row) => row.TechId);

            this.deleteButtonDisabled = false;
        }
        else {
            this.deleteButtonDisabled = true;
        }

        const selectedIdsEvent = new CustomEvent('selectedids', {
            detail : {
                techIds : ids
            }
        });

        this.dispatchEvent(selectedIdsEvent);
    }

    handleDelete(event) {
        let ids = this.selectedRows.map((row) => row.Id);

        deleteCertsHeld({certIds : ids})
        .then((result) => {
            refreshApex(this.wiredResult);
        })
        .catch((error) => {
            this.errorMessage = error.body.message;
        })
    }
}