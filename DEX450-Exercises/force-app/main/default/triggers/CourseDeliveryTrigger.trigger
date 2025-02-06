//TODO #1: Enter the before insert and before update DML events
trigger CourseDeliveryTrigger on Course_Delivery__c (before insert, before update) {
    

    Trigger_Switch__mdt triggerSwitch = Trigger_Switch__mdt.getInstance('Course_Delivery_Trigger');
    if(triggerSwitch == null || triggerSwitch.Active_Flag__c) {


        // TRAFFIC COP LOGIC
        // before insert -> class1
        // after update -> class3


        CourseDeliveryTriggerHandler.preventInvalidCourseDeliveries(Trigger.new, Trigger.oldMap);
    }
}