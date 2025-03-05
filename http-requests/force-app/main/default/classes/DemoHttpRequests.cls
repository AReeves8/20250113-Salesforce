public with sharing class DemoHttpRequests {
    public DemoHttpRequests() {

    }

    public void getCustomers() {

        HttpRequest req = new HttpRequest();

        // setting the endpoint with the name of the Named Credentials we set up
        req.setEndpoint('callout:Appian_Customer_Named_Credentials/tax-customer');
        req.setMethod('GET');


        // send off the http request
        Http http = new Http();
        HttpResponse resp = http.send(req);     // capturing response fo http request


        // process the response however you need
        Integer statusCode = resp.getStatusCode();
        if(statusCode == 200) {
            // handle success
            List<CustomerInfoDTO> customers = (List<CustomerInfoDTO>) JSON.deserialize(resp.getBody(), List<CustomerInfoDTO>.class);
            for(CustomerInfoDTO customer : customers){
                System.debug(customer);
            }
        }
        else if(statusCode == 400){
            // handle client side error
            System.debug('ERROR: ' + resp.getStatusCode());
        }
        else if(statusCode == 500){
            // handle server side error
            System.debug('ERROR: ' + resp.getStatusCode());
        }

    }

    public void createCustomer(CustomerInfoDTO customerInfo) {


        HttpRequest req = new HttpRequest();
        req.setEndpoint('callout:Appian_Customer_Named_Credentials/tax-customer');
        req.setMethod('POST');
        String jsonString = JSON.serialize(customerInfo);
        System.debug(jsonString);
        req.setBody(jsonString);      // converting Apex -> JSON so it can be sent in request

        // send off the http request
        Http http = new Http();
        HttpResponse resp = http.send(req);

        // process the response however you need
        Integer statusCode = resp.getStatusCode();
        System.debug(statusCode);
        if(statusCode == 200) {
            // handle success
            System.debug('SUCCESS: ' + resp.getBody());
        }
        else if(statusCode == 400){
            // handle client side error
            System.debug('ERROR: ' + resp.getBody());
        }
        else if(statusCode == 500){
            // handle server side error
            System.debug('ERROR: ' + resp.getBody());
        }
    }
}