DemoHttpRequests httpReqs = new DemoHttpRequests();

// CALLING GET METHOD
//httpReqs.getCustomers();


// CALLING POST METHOD
CustomerInfoDTO customer = new CustomerInfoDTO(null,'Auston','H','Reaves',null,'123 Happy Trails Lane','Dallas','TX','12345',null,null,null,null,true);

httpReqs.createCustomer(customer);