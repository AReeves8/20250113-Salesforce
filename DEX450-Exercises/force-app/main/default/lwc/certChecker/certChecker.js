import { api, LightningElement } from 'lwc';

export default class CertChecker extends LightningElement {


    @api recordId;
    techIds;


    handleSelectedIds(event) {
        this.techIds = event.detail.techIds;
    }

}