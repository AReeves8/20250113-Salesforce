
/**
 * INHERITANCE
 *  - one class inherits (child) the properties from another class (parent)
 *  - concrete classes can be parents - BUT have to be declared as 'virtual'
 */
public virtual class Car extends Vehicle {
    
    
    /**
     * ENCAPSULATION
     *  - wrap related state and behavior into a single class
     *  - then you can control access to that state and behavior
     *      - private - only the class can see
     *      - protected - the class, inner classes, and child classes
     *      - public - everything within the namespace can see
     *      - global - entire org can see
     */
    private String engine;
    private String make;
    private String model;

    /**
     * FINAL AND STATIC
     *  - final: once the value is set it cannot be changed
     *  - static: once the variable is loaded in memory, it stays in memory
     *      - stay in memory for the ENTIRE transaction
     */
    private final static Integer NUM_AXELS = 2;
    
    // no-arg constructor
    public Car() {

    }

    // paramterized constructor
    public Car(String engine, String make, String model) {
        this.engine = engine;
        this.make = make;
        this.model = model;
    }

    // paramterized constructor
    public Car(String engine, String make, String model, Integer numWheels) {

        /**
         * THIS AND SUPER
         *      - only call one in a single constructor
         */
        // call the parent constructor
        super(numWheels);

        // call another constructor in this class
        //this(engine, make, model);

        this.engine = engine;
        this.make = make;
        this.model = model;
    }


    // getters and setters
    public String getEngine() {
        return this.engine;
    }
    public void setEngine(String engine) {

        // if(engine == '') {
        //     throw Exception();
        // }
        this.engine = engine;
    }
    public String getMake() {
        return this.make;
    }
    public void setMake(String make) {
        this.make = make;
    }
    public String getModel() {
        return this.model;
    }
    public void setModel(String model) {
        this.model = model;
    } 


    /**
     * POLYMORPHISM
     *  - "many forms"
     *  - method overriding: child overrides a method from a parent class
     *      - override keyword
     *      - every class inherits from SObject
     *  - method overloading: different versions of the same method in the same class
     * 
     */
    public override String toString() {
        return 'Car: [' + this.engine + ', ' + this.make + ', ' + this.model + ']';
    }

    // overriding start method from parent Vehicle class
    public override void start() {
        System.debug('Engine: ' + this.engine + ', rumbles on after turning key.');
    }

    // virtual also lets methods be overridden in child classes
    public virtual void changeOil() {
        System.debug('Putting new oil in car.');
    }

    public override void drive() {
        System.debug('Car is being driven');
    }
}