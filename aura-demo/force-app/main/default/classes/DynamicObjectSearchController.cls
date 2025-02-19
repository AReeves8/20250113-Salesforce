public with sharing class DynamicObjectSearchController {
    

    /**
     * AURA ENABLED
     *      - makes the method callable from Aura and LWC 
     *      - cacheable allows data to be cached on frontend 
     *          - required if using SOQL query 
     *          - should use anytime you return data
     */

    // method to get all fields available on an object
    @AuraEnabled(cacheable=true)
    public static List<String> getObjectFields(String objectName) {

        try {
            /**
             * SCHEMA class
             *      - gives metadata info about all the objects and fields in our database
             *      - getGlobalDescribe returns a map where the key is the name of an object, and the value is that metadata info
             */
            SObjectType objectType = Schema.getGlobalDescribe().get(objectName);
            if(objectType == null) {
                throw new AuraHandledException('No object type');
            }

            // getting all the fields on the object and returning them as a map
            // https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_dynamic_field_tokens.htm 
            Map<String, Schema.SObjectField> fields = objectType.getDescribe().fields.getMap();

            List<String> fieldList = new List<String>();
            for(String fieldName : fields.keySet()) {
                // fieldList.add(fieldName);        // returns the field name in the wrong format

                // getting the Schema.SObjectField and casting it to a string
                fieldList.add(String.valueOf(fields.get(fieldName)));
            }
            return fieldList;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
        


        // USING .VALUES() INSTEAD
        // for(Schema.SObjectField fieldName : fields.values()) {
        //     // fieldList.add(fieldName);        // returns the field name in the wrong format

        //     // getting the Schema.SObjectField and casting it to a string
        //     fieldList.add(String.valueOf(fieldName));
        // }
    }

    // method to take in object and fields and perform SOQL query
    @AuraEnabled(cacheable=true)
    public static List<SObject> getRecords(String objectName, List<String> fieldNames){
        try {
            
            // building select clause with provided fields
            String selectClause = 'SELECT ';
            for(String field : fieldNames) {
                selectClause += (field + ', ');
            }
            selectClause = selectClause.removeEnd(', ');    // removes the last instance of ', ' 

            // creating from clause
            String fromClause = ' FROM ' + objectName;

            // put it all together
            String queryString = selectClause + fromClause;
            
            // return records to front end
            return Database.query(queryString);

        } catch (Exception e) {

            // special exception that can be handled on front end (in Aura or LWC)
            throw new AuraHandledException(e.getMessage());
        }
    }
}