public with sharing class CourseDeliveryTriggerHandler {
    

    public static void preventInvalidCourseDeliveries(List<Course_Delivery__c> newCourseDeliveryList, Map<ID, Course_Delivery__c> oldCourseDeliveryMap) {
    
        Set<Date> allHolidays = new Set<Date>();
        for (Holiday h : [SELECT ActivityDate FROM Holiday]) {
            allHolidays.add(h.ActivityDate);
        }
        
        List<Error_Message__e> errors = new List<Error_Message__e>();
        for (Course_Delivery__c cd : newCourseDeliveryList) {
            
            // Always check Inserts, but only check Updates when the Delivery Date just changed:
            Boolean checkDate = (oldCourseDeliveryMap == null || oldCourseDeliveryMap.get(cd.Id).Start_Date__c != cd.Start_Date__c);
            if (checkDate && cd.Start_Date__c != NULL) {
                if(allHolidays.contains(cd.Start_Date__c)){
                    
                    // error message for users
                    cd.Start_Date__c.addError(Label.Invalid_Delivery_Start_Date);
                    
                    // error log for admins/devs
                    errors.add(
                        new Error_Message__e(
                            Message__c = Label.Invalid_Delivery_Start_Date, 
                            Source_Component__c = 'CourseDeliveryTriggerHandler'
                        )
                    );
                }
            }
        }

        // no interaction with subscriber
        if(errors.size() > 0) {
            EventBus.publish(errors);
        }
    }
}