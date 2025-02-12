public with sharing class VfDynamicObjectSearchController {
    
    // PROPERTIES
    public String selectedObject { get; set; }
    public List<SelectOption> objectOptions { 
        get {
            if(objectOptions == null) {

                // initializing new list with default values
                List<SelectOption> options = new List<SelectOption>();
                options.add(new SelectOption('Account', 'Account')); // label, name
                options.add(new SelectOption('Contact', 'Contact'));
                options.add(new SelectOption('Course__c', 'Course__c'));
                return options; // sets the variable
            }
            else {
                // if already initialized, return the list
                return objectOptions;
            }
        }
        
        // no setter - read-only property
    }

    // Map is going to store label and name for each record (each map is its own record)
    // List contains all the records
    public List<Map<String, String>> records { get; set; }


    public PageReference fetchRecords() {
        records = new List<Map<String, String>>();
        List<SObject> queryResults  = new List<SObject>();


        // retreive records depending on object
        if(selectedObject == 'Account')  {
            queryResults = [SELECT Id, Name FROM Account];
        }
        else if(selectedObject == 'Contact') {
            queryResults = [SELECT Id, Name FROM Contact];
        }
        else if(selectedObject == 'Course__c') {
            queryResults = [SELECT Id, Name FROM Course__c];
        }


        for(SObject obj : queryResults){
            // adding results to map
            Map<String, String> recordsMap = new Map<String, String>();
            recordsMap.put('Id', (String) obj.get('Id'));
            recordsMap.put('Name', (String) obj.get('Name'));
            
            // adding map to list
            records.add(recordsMap);
        }
        return null;
    }
}