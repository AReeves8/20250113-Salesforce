public class CustomerInfoDTO {
    
    /**
     * Data Transfer Object
     *      - transform data from how it looks in the DB to how it looks in the request/response
     *      - DTO should match how the data looks in the req/resp
     *      - then you map the data to some existing object in your DB
     */

    Integer customerID;     // attribute names need to be the same as they are in the JSON
    String createdOn;
    String firstName;
    String middleInitial;
    String lastName;
    String dob;
    String address;
    String city;
    String state;
    String zipCode;
    String phoneNumber;
    String email;
    String lastLoginDate;
    String lastTaxFilingDate;
    Boolean auditFlag;
    
    public CustomerInfoDTO(String createdOn,String firstName,String middleInitial,String lastName,
            String dob,String address,String city,String state,String zipCode,String phoneNumber,String email,
            String lastLoginDate,String lastTaxFilingDate,Boolean auditFlag) {

        this.createdOn = createdOn;
        this.address = address;
        this.auditFlag = auditFlag;
        this.city = city;
        this.dob = dob;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.middleInitial = middleInitial;
        this.lastLoginDate = lastLoginDate;
        this.lastTaxFilingDate = lastTaxFilingDate;
        this.zipCode = zipCode;
        this.phoneNumber = phoneNumber;
        this.state = state;
    }


    // DTO contain some mapping methods
    // public Customer dtoToCustomer() {
    //     // map customer info dto -> regular customer object
    //     // return created customer 
    // }

    // public CustomerInfoDTO customerToDto() {
    //     // map regular customer object -> customer info dto
    //     // return created dto 
    // }
}