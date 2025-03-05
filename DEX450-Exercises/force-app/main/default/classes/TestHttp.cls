public with sharing class TestHttp {
    public TestHttp() {

    }

    public static void getRequestWithCredentials() {

        HttpRequest req = new HttpRequest();    
        req.setEndpoint('callout:APPIAN_TEST/tax-customer');    
        req.setMethod('GET');

        // sending the request and capturing the response
        Http http = new Http();
        HttpResponse resp = http.send(req);
        
        System.debug(resp.getStatusCode());
        System.debug(resp.getBody());
    }
}