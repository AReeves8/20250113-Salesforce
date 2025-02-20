import { createElement } from '@lwc/engine-dom';
import getObjectFields from '@salesforce/apex/DynamicObjectSearchController.getObjectFields';
import LwcFieldSelector from 'c/lwcFieldSelector';


/**
 * JEST
 *      looks for any .js file in the __tests__ folder
 *      AND
 *      any file with .test.js or .spec.js
 * 
 * 
 *      
 *      unit testing your frontend
 *          testing that a specific omponent works
 * 
 * 
 *      runs independently of Salesforce. it runs in Node.js
 */


/**
 * TESTING WIRE SERVICE
 *      - mock data
 *          - "data" folder in your __tests__
 *      
 *      - we are going to create a JSON file with the same name as our Wire Service Call in the data folder
 *          - mock data inside should match what is returned by your actual wire call
 */

// import our mock data
const mockGetObjectFields = require('./data/getObjectFields.json');

// mock the wire service call
jest.mock(
    '@salesforce/apex/DynamicObjectSearchController.getObjectFields',
    () => {
        // this callback is the "factory" that tells how to mock the function
        const { createApexTestWireAdapter } = require("@salesforce/sfdx-lwc-jest"); // destructuring jest module to create mock wire adapter
        return {
            default: createApexTestWireAdapter(jest.fn()) // jest.fn() with no param returns a blank mock function
        };
    },

    // this object is used to create virtual mock (a mock of mosules that don't exist in the system)
    { virtual: true}
);


// describe - a test suite to hold all of your individual unit tests
describe('c-lwc-field-selector', () => {
    
    
    /**
     * SETUP AND TEARDOWN
     *      beforeAll - runs once before everything
     *      beforeEach - runs before each individual test
     *      afterAll - runs once after everything
     *      afterEach - runs after each individual test
     */
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });


    // it - is in individual test. "test" can also be used. just depends which makes better gramatical sense with your test name
    it('is an example test that doesnt do anything', () => {
        
        // 3 A's - arrange, act, assert

        // Arrange - put everything on the DOM where it should be. 
        const element = createElement('c-lwc-field-selector', {
            is: LwcFieldSelector
        });

        // Act - doing things. creating the logic for our tests. 
        document.body.appendChild(element);

        // Assert - this is the actual test. 
        // const div = element.shadowRoot.querySelector('div');
        expect(1).toBe(1);

        /**
         * EXPECT
         *      - object containing various assertion functions (called matchers)
         *          - .toBe()
         *          - .toMatch()
         *          - .toContain()
         *          - .toThrow()
         *          - .not()
         *          - plus many many many more
         */
    });


    test('getObjectFields sets the dual list box data correctly', () => {

        // creating the component and adding it to DOM
        const element = createElement('c-lwc-field-selector', {
            is: LwcFieldSelector
        });
        document.body.appendChild(element);


        // call the mocked wire service with our mock data
        getObjectFields.emit(mockGetObjectFields);


        // wait for DOM to be rendered, then test if the dual-listbox contains the right data
        return Promise.resolve().then(()=> {

            // getting the list box element from the shadow DOM
            const dualListBoxElement = element.shadowRoot.querySelector("lightning-dual-listbox");

            // getting the options to check if they were set properly
            const listBoxOptions = dualListBoxElement.options;
            const optionsCount = dualListBoxElement.options.length;

            expect(listBoxOptions).not.toBeNull();      // options shouldn't be null
            expect(optionsCount).toBe(3);               // three fields listed in mock data
        });
    });
});