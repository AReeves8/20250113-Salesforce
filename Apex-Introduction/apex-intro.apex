/*
EXECUTE ANONYMOUS
	- where you can write some code that won't be saved to a class
	- Apex doesn't have a "main" function
	- .apex files are saved snippets of execute anonynmous code
	- this DOES run in your salesforce org. 
		- NOT availabe in prod
	- executes in USER MODE
		- user: respect the logged in user's object, record, and field security
		- system: ignores user's access levels
			- most Apex code runs in system
*/

/*
	Primitives: String, Boolean, Integer, Long, Date, Decimal, Double, ID, Blob
*/

Boolean isTrue = true;
Integer num1 = 12;
Long bigNum = 129813479134L;
Decimal dec = 1234.45645;
Double doub = 123.235235;
Date currentDate = Date.today();
Date aprilFools = Date.newInstance(2025, 4, 1);		// months start at 1 - not 0
ID accountId = '0014U00003WcUKJQA3';				// Salesforce record Ids
String str = 'Hello World';							// strings in single quotes

// Apex is case-insensitive
//String string = 'Hello world';					// doesn't work

Account acc = new Account();
account acc2 = new account();						// UGLY DONT DO IT :(
Account account = new Account();					// SOMETIMES.. Apex figures out what you mean through context

acc.AnnualRevenue = 50000;
acc.Name = 'EA TEST 1';
System.debug(acc);


Course_Delivery__c newCourse = new Course_Delivery__c();
newCourse.Start_Date__c = aprilFools;
System.debug(newCourse);





