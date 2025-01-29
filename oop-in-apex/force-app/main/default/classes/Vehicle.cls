/**
 * ABSTRACT CLASS
 *  - can be used to make a "blueprint"
 *  - a class that *can* have abstract methods
 *      - methods that are declared in parent but defined in child 
 * 
 */
public abstract class Vehicle implements Driveable {
    
    private Integer numWheels;
    
    public Vehicle() {

    }
    public Vehicle(Integer numWheels) {
        this.numWheels = numWheels;
    }

    // getters and setters
    public Integer getNumWheels() {
        return this.numWheels;
    }       
    public void setNumWheels(Integer numWheels) {
        this.numWheels = numWheels;
    }                   

    // abstract method for how a vehicle is started
    public abstract void start();



    // abstract classes don't have to override abstract methods that it inherits
    // public override void drive() {
    //     System.debug('vehicle is being driven');
    // }
    public abstract void drive();       // still declare abstract method so it can be overridden in child
}