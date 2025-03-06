public with sharing class AccountRestResourceHandler {
    public AccountRestResourceHandler() {

    }


    public static List<Account> getAllAccounts() {
        return [SELECT Id, Name FROM Account];
        //return Database.query('SELECT Id, Name, lkasjdbf FROM Account');
    }


    public static List<Account> getAccountAndContactById(String accountId) {
        return [SELECT Id, Name, (SELECT Id, Name FROM Contacts) FROM Account WHERE Id = :accountId];
    }

    public static List<Account> getAccountById(String accountId) {
        return [SELECT Id, Name FROM Account WHERE Id = :accountId];
    }

    public static Account createAccount(String name, String phone) {

        Account acc = new Account(Name = name, Phone = phone);
        insert acc;
        return acc;
    }

    public static void updateAccount(String id, String name, String phone) {

        Account acc = [SELECT Id, Name, Phone FROM Account WHERE Id = :id];
        acc.Name = name;
        acc.Phone = phone;

        update acc;
    }

    public static void deleteAccount(String id) {

        Account acc = [SELECT Id FROM Account WHERE Id = :id];
        delete acc;
    }
}