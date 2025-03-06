
/**
 * REST RESOURCE
 *  - signlas that this clas handles REST HTTP requests. 
 *  - clas needs to be global
 *  - the urlMapping will match to anything after the base url of your org. 
 *      - base url: <domain-name>/services/apexrest/
 */
@RestResource(urlMapping='/accounts/*')
global with sharing class AccountRestResource {
    
    /**
     * HttpGet
     *  - this method handles ALL get requests sent to the urlMapping above
     *      - /accounts
     *      - /accounts/contacts
     *      - /accounts/{id}/contacts
     *      - /accounts/{id}/contacts/cases
     * 
     *      - programatically, you have to parse through the request to determine the proper endpoint
     * 
     */
    //@HttpGet
    global static List<Account> getAccounts() {


        /**
         * PROBLEMS WITH THIS METHOD
         *  - possibly hit governor limits
         *  - no error handling
         *  - we are returning sObject data directly. NOT setting a proper response
         *      - WHICH WORKS FINE, BUT is not best practice
         *      - use Rest Response instead. 
         *          - if your methods have a return statment, the return will override the set response
         * 
         *  - this class is handling business logic itself. 
         *      - Rest Resources should only do "traffic cop logic"
         *      - business logic should be moved to handler class
         */

        return [SELECT Id, Name FROM Account];
    }

    // returning void because RestResponse will AUTOMATICALLY be returned. a regular return statement would override it. 
    @HttpGet
    global static void getAccountsBetter() {

        // RestContext provides info on the current context of the incoming request and response
        RestRequest request = RestContext.request;
        RestResponse response = RestContext.response;

        // determing endpoint of request
        String domain = request.requestURI.substringAfterLast('/');     // gives the last domain 

        switch on domain {
            when 'accounts' {
                try {
                    List<Account> accounts = AccountRestResourceHandler.getAllAccounts();
                    
                    response.responseBody = Blob.valueOf(JSON.serialize(accounts));
                    response.headers.put('Content-Type', 'application/json');
                    response.statusCode = 200;
                } catch (Exception e) {
                    // handle any errors that occur
                    response.responseBody = Blob.valueOf('Unable to retreive accounts.');
                    response.statusCode = 500;
                }
            }
            when 'contacts' {       //  /accounts/{id}/contacts
                try {

                    String accountId = request.requestURI.substringBetween('accounts/', '/contacts');

                    List<Account> accounts = AccountRestResourceHandler.getAccountAndContactById(accountId);
                    
                    response.responseBody = Blob.valueOf(JSON.serialize(accounts));
                    response.headers.put('Content-Type', 'application/json');
                    response.statusCode = 200;
                } catch (Exception e) {
                    // handle any errors that occur
                    response.responseBody = Blob.valueOf('Unable to retreive account.');
                    response.statusCode = 500;
                }
            }
            when else {     // /accounts/{id}
                try {
                    List<Account> accounts = AccountRestResourceHandler.getAccountById(domain);
                    
                    response.responseBody = Blob.valueOf(JSON.serialize(accounts));
                    response.headers.put('Content-Type', 'application/json');
                    response.statusCode = 200;
                } catch (Exception e) {
                    // handle any errors that occur
                    response.responseBody = Blob.valueOf('Unable to retreive account.');
                    response.statusCode = 500;
                }
            }
        }
    }

    // method arguments are going to be automatically set by Request Body. ensure param names match exactaly to properties in request body.
    @HttpPost
    global static void createAccount(String name, String phone) {

        RestResponse response = RestContext.response;

        try {
            Account acc = AccountRestResourceHandler.createAccount(name, phone);
            response.responseBody = Blob.valueOf(JSON.serialize(acc));
            response.headers.put('Content-Type', 'application/json');
            response.statusCode = 201;      // setting CREATED status
        } catch (DmlException e) {
            
            // if we get here, the account couldn't be created. maybe due to bad data?
            response.responseBody = Blob.valueOf('Unable to create account. Check data that was sent in request.');
            response.statusCode = 400;

        } catch (Exception e) {
            
            // if we get here, an unexpected error occurred
            response.responseBody = Blob.valueOf('Unable to create account.');
            response.statusCode = 500;
        } 
    }


    @HttpPut
    global static void updateAccount(String id, String name, String phone) {

        // With updates, its common that ID might be a path variable or query param as an alternative to it being in the request body.

        RestResponse response = RestContext.response;

        try {
            AccountRestResourceHandler.updateAccount(id, name, phone);
            response.statusCode = 204;      // setting NO CONTENT status
        } catch (QueryException e) {
            
            // if we get here, the account couldn't be located
            response.responseBody = Blob.valueOf('Unable to find account.');
            response.statusCode = 404;      // NOT FOUND

        } catch (DmlException e) {
            
            // if we get here, the account couldn't be updated. maybe due to bad data?
            response.responseBody = Blob.valueOf('Unable to update account. Check data that was sent in request.');
            response.statusCode = 400;      // BAD REQUEST

        } catch (Exception e) {
            
            // if we get here, an unexpected error occurred
            response.responseBody = Blob.valueOf('Unable to update account.');
            response.statusCode = 500;
        } 
    }


    @HttpDelete     //  /accounts/{id}
    global static void deleteAccount() {

        RestRequest request = RestContext.request;
        RestResponse response = RestContext.response;

        String accountId = request.requestURI.substringAfterLast('/');

        try {
            AccountRestResourceHandler.deleteAccount(accountId);
            response.statusCode = 204;      // setting NO CONTENT status
        } catch (QueryException e) {
            
            // if we get here, the account couldn't be located
            response.responseBody = Blob.valueOf('Unable to find account.');
            response.statusCode = 404;      // NOT FOUND

        } catch (DmlException e) {
            
            // if we get here, the account couldn't be updated. maybe due to bad data?
            response.responseBody = Blob.valueOf('Unable to delete account. Check data that was sent in request.');
            response.statusCode = 400;      // BAD REQUEST

        } catch (Exception e) {
            
            // if we get here, an unexpected error occurred
            response.responseBody = Blob.valueOf('Unable to delete account.');
            response.statusCode = 500;
        } 
    }
}