public with sharing class OrderProcessor {
    public OrderProcessor() {

    }

    public static Boolean process() {
        
        Integer randomNumber = Integer.valueOf(Math.random() * 100);
        
        if(Math.mod(randomNumber, 2) == 0) {
            return true;
        } else {
            return false;
        }
    }
}