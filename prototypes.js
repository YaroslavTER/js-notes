/* JS prototype chain ends up in Object.prototype. */

//shadowing

myObject.foo = "bar";

/* If foo is not already present directly on myObject, the [[Prototype]] 
chain is traversed, just like for the [[Set]] operation. 

If foo is not found anywhere in the chain,  the property 
foo is added directly to myObject with the specified value, 
as expected. */

/* rules for shadowing:
- if the property that higher in the property chain has writable: true
then it shadowed
- if the higher property is writable: false, the property not shadowed
- if the property is setter then setter will be used without adding any property
to current object*/

/* If you want to shadow foo in cases #2 and #3, you cannot use = assignment, 
but must instead use Object.defineProperty(..) (see Chapter 3) to add foo 
to myObject. */