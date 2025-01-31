List<Account> accounts = [SELECT Name, (SELECT LastName FROM Contacts) FROM Account];


for(Account acc : accounts) {
    for(Contact con : acc.Contacts) {
        System.debug('Contact: ' + con.LastName + ' is related to the following Account'); 
    }
}