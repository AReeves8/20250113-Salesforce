public with sharing class CertCheckerController {

    // TODO: Add an annotation to enable the method to be invoked from a Lightning 
    // Component - enabling client side data caching
    @AuraEnabled(cacheable=true)
    public static List<Certification_Held__c> getCertsHeld(Id acctId) {
        List<Certification_Held__c> certsHeld = new List<Certification_Held__c>();

        // Retrieve certification info for technicians belonging to the given service vendor (Account)
        try {
            certsHeld = [SELECT Id, Date_Achieved__c, Certified_Professional__r.Name, Certification__r.Name, 
                                Certified_Professional__c, Certification__c
                         FROM Certification_Held__c
                         WHERE Certified_Professional__r.AccountId = :acctId
                         WITH SECURITY_ENFORCED
                         ORDER BY Certified_Professional__r.Name
                        ];            
        } catch (Exception e) {
            throw new AuraHandledException('Unable to retrieve Certification Held records ' + e.getMessage());
        }

        return certsHeld;
    }

    @AuraEnabled(cacheable=true)
    public static List<Course_Attendee__c> getTechniciansAttendance(List<Id> techIds) {
        List<Course_Attendee__c> attendance = new List<Course_Attendee__c>();

        // Retrieve course attendee records for the given technician (contact) IDs
        try {
            attendance = [SELECT Id, Status__c, Course_Delivery__r.Course__r.Name, Course_Delivery__r.Start_Date__c, Student__r.Name 
                          FROM Course_Attendee__c 
                          WHERE Status__c = 'Completed' AND Student__c IN :techIds
                          WITH SECURITY_ENFORCED
                          ORDER BY Student__r.Name];            
        } catch (Exception e) {
            throw new AuraHandledException('Unable to retrieve Course Attendee records ' + e.getMessage());
        }

        return attendance;
    }

    @AuraEnabled(cacheable=true)
    public static List<Certification_Attempt__c> getTechniciansCertAttempts(List<Id> techIds) {
        List<Certification_Attempt__c> attempts = new List<Certification_Attempt__c>();

        // Retrieve certification attempt records for the given technician (Contact) IDs
        try {
            attempts = [SELECT Id, Status__c, Certification_Element__r.Name, Certification_Element__r.Certification__r.Name, 
                               Certification_Candidate__r.Name 
                        FROM Certification_Attempt__c 
                        WHERE Certification_Candidate__c IN :techIds
                        WITH SECURITY_ENFORCED
                        ORDER BY Certification_Candidate__r.Name];            
        } catch (Exception e) {
            throw new AuraHandledException('Unable to retrieve Certification Attempt records ' + e.getMessage());
        }

        return attempts;
    }

    @AuraEnabled
    public static Boolean deleteCertsHeld(List<Id> certIds) {
        Boolean result = false;

        // Attempt to delete the collection of certification held records
        try {

            System.debug('CERT RECORDS TO DELETE:' + [SELECT Id FROM Certification_Held__c WHERE Id IN :certIds]);

            delete [SELECT Id FROM Certification_Held__c WHERE Id IN :certIds];
            result = true;
            
        } catch (Exception e) {
            throw new AuraHandledException('Unable to delete records ' + e.getMessage());
        }

        return result;
    }

}