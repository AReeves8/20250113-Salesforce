public class ContactsDML {

    public static void standaloneDML(){
        //----------------------------------------------------------
        // TASK 1: Use standalone DML command to insert new Contacts.
        //----------------------------------------------------------
        // TODO #1: Declare a variable whose type is Contact named name1
        //          and initialize it to a newly constructed Contact sObject
        //          assigning the field LastName the value 'Minkowitz'.
        // TODO #2: Declare a variable whose type is Contact named name2
        //          and initialize it to a newly constructed Contact sObject
        //          assigning the field LastName the value 'Singh'.
        Contact name1 = new Contact(LastName = 'Minkowitz');
        Contact name2 = new Contact(LastName = 'Singh');

        // TODO #3: Declare a variable whose type is a List of Contact sObjects
        //          named contacts and initialize it to a newly constructed List.
        // TODO #4: Add name1 to the list contacts.
        // TODO #5: Add name2 to the list contacts.
        List<Contact> contacts = new List<Contact>();
        contacts.add(name1);
        contacts.add(name2);

        // TODO #6: Use the standalone insert command to insert contacts into the database.
        insert contacts;

        // When you successfully insert an sObject instance, the ID of the inserted instance is returned to it.
        // TODO #7: Write a statement to output the ID of name1 into the debug log.
        // TODO #8: Write a statement to output the ID of name2 into the debug log.
        System.debug(contacts[0].Id);
        System.debug(contacts[1].Id);
        System.debug(name1.Id);
        System.debug(name2.Id);

    }

    public static void databaseMethodDML(){
        //-------------------------------------------------------------
        // TASK 2: Use a Database class method to insert Contacts.
        //-------------------------------------------------------------
        // TODO #1: Declare a variable whose type is Contact named name1.
        //          It should not set any fields.
        // TODO #2: Declare a variable whose type is Contact named name2
        //          and initialize it to a newly constructed Contact sObject
        //          assigning the field LastName the value 'Picasso'.
        Contact name1 = new Contact();
        Contact name2 = new Contact(LastName = 'Picasso');

        // TODO #3: Declare a variable whose type is a List of Contact sObjects
        //          named contacts and initialize it to a newly constructed List.
        // TODO #4: Add name1 and name2 to the list contacts.
        List<Contact> contacts = new List<Contact>();
        contacts.add(name1);
        contacts.add(name2);

        // TODO #5: Use the Database.insert command to replicate the
        //          behavior you would expect by issuing the command:
        //          insert contacts;
        //          Because name1 has not been assigned a string value,
        //          you should expect a DMLexception.
        Database.insert(contacts);      // NOT DOING PARTIAL PROCESSING

    }

    public static void databaseMethodPartialCommit(){
        //-----------------------------------------------------------------------------
        // TASK 3: Use a Database class method to insert Contacts with a partial commit
        //-----------------------------------------------------------------------------

        // TODO #1: Declare a variable whose type is Contact named name1.
        //          It should not set any fields.
        // TODO #2: Declare a variable whose type is Contact named name2
        //          and initialize it to a newly constructed Contact sObject
        //          assigning the field LastName the value 'Picasso'.
        Contact name1 = new Contact();
        Contact name2 = new Contact(LastName = 'Picasso');

        // TODO #3: Declare a variable whose type is a List of Contact sObjects
        //          named contacts and initialize it to a newly constructed List.
        // TODO #4: Add name1 and name2 to the list contacts.
        List<Contact> contacts = new List<Contact>();
        contacts.add(name1);
        contacts.add(name2);

        // TODO #5: Use the Database.insert command to insert the Contacts
        //          in contacts, with a partial commit.
        Database.insert(contacts, false);      // ALLOW FOR PARTIAL PROCESSING

        // TODO #6: Print the id of name2 to the debug log.
        System.debug(name2.Id);

    }


    public static void exceptionsDML(){
        List<Contact> contacts = new List<Contact>();

        Contact noName = new Contact();
        contacts.add(noName);

        Contact newContact = new Contact(LastName = 'Benett');
        contacts.add(newContact);

        Contact longName = new Contact(LastName = '00085chars00085chars00085chars00085chars00085chars00085chars00085chars00085chars00085');
        contacts.add(longName);

        // A new list based on the current list - to use later.
        List<Contact> newListContact = new List<Contact>(contacts);

        // TODO #1: Declare a variable whose type is a List of Database.SaveResult
        //          sObjects named lsr and initialize it to the result of calling
        //          the insert method of the Database class passing in as parameters
        //          the list contacts and the Boolean value false to indicate a partial commit.
        List<Database.SaveResult> lsr = Database.insert(contacts, false);

        // TODO #2: Create a for loop with an iterator of type Database.SaveResult
        //          named sr that iterates over the List lsr.
        for(Database.SaveResult sr : lsr) {
            // TODO #3: Within the for loop create an if statement that uses the
            //          isSuccess method of the Database.SaveResult class to
            //          determine if the insert of sr was unsuccessful.
            if(!sr.isSuccess()) {
                // TODO #4: Within the if statement create a for loop with an iterator
                //          of type Database.Error named err that iterates over the
                //          result returned by calling the getErrors method of the
                //          class Database.SaveResult on the variable sr.

                List<Error_Log__c> errors = new List<Error_Log__c>();
                
                for(Database.Error err : sr.getErrors()) {
                    // TODO #5: Create an Error_log__c entry that saves the results
                    //          of calling the getStatusCode method and the getMessage
                    //          method of the Database.error class on the err variable.
                    Error_Log__c errLog = new Error_Log__c();
                    errLog.Message__c = err.getStatusCode() + ' ' + err.getMessage();
                    errLog.Source__c = 'exceptionsDML';
                    // insert errLog;  // BAD PRACTICE
                    errors.add(errLog);
                }

                // BEST PRACTICE
                if(errors.size() > 0) {
                    insert errors;
                }
            }
        }

        newListContact[1] = null;
        try {
            List<Database.SaveResult> lsr2 = Database.insert(newListContact, false);
        } catch(ListException e) {
            Error_Log__c error_null = new Error_Log__c();
            error_null.Source__c = 'exceptionsDML';
            error_null.Message__c = e.getMessage();
            insert error_null;
        }
    }
}
