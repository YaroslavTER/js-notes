/* It's a common mis-statement that "everything in JavaScript is an object". 
This is clearly not true.

By contrast, there are a few special object sub-types, which we can refer 
to as complex primitives.

function is a sub-type of object (technically, a "callable object"). 
Functions in JS are said to be "first class" in that they are basically 
just normal objects (with callable behavior semantics bolted on), and 
so they can be handled like any other plain object.

Arrays are also a form of objects, with extra behavior. The organization of 
contents in arrays is slightly more structured than for general objects. */

/* In objects, property names are always strings. Exeption can be array indeces. */

const list = ['a', 'b', '1'];
list['1'] = 'asd';

list[1]//b

//how o copy objects

const a = JSON.pare(JSON.stringify(b));
/*need to be JSON safe. it means that you can convert it to JSON
and back*/

const a = Object.assign({}, b);
/* it iterates thorough keys and assign values via =. it means that it makes references
to the properties of the old object. */

//property descriptors

/* using property descriptor you can read property info and change it. */

var myObject = {
	a: 2
};

Object.getOwnPropertyDescriptor( myObject, "a" );
// {
//    value: 2,
//    writable: true,
//    enumerable: true,
//    configurable: true
// }

var myObject = {};

Object.defineProperty( myObject, "a", {
	value: 2,
	writable: true,
	configurable: true,
	enumerable: true
} );

myObject.a; // 2

/* 
writable: false - you can't change the value of a property

configurable: false - you can't chang property configuration
as described above. Also, it prevents operation delete on property.
*exception:* if you've already set configurable to false,
you can modify writable only to false.

enumerable: false - property won't show up in object iterators
like for...in
*/

/* To prevet object from adding new properties */
Object.preventExtensions();

/* To prevent object from adding new properties and to set all properies
to configudable: false  */
Object.seal();

/* To call Object.seal() on the object and set all of the properties to writable: fasle */
Object.freeze();

/* *exception:* all of the methods above won't affect property references. */

//Get/Set

var myObject = {
	// define a getter for `a`
	get a() {
		return 2;
	}
};

Object.defineProperty(
	myObject,	// target
	"b",		// property name
	{			// descriptor
		// define a getter for `b`
		get: function(){ return this.a * 2 },

		// make sure `b` shows up as an object property
		enumerable: true
	}
);

//

myObject.a; // 2

myObject.b; // 4

var myObject = {
	// define a getter for `a`
	get a() {
		return this._a_;
	},

	// define a setter for `a`
	set a(val) {
		this._a_ = val * 2;
	}
};

myObject.a = 2;

myObject.a; // 4

//existance

/* operator in checks property in the whole prototype chain */
'a' in myObject

Object.hasOwnProperty();
Object.keys();
Object.propertyIsEnumerable();
Object.getOwnPropertyNames();

//iterator

Object.defineProperty( myObject, Symbol.iterator, {
	enumerable: false,
	writable: false,
	configurable: true,
	value: function() {}
} );

/* iterate `myObject` manually */
var it = myObject[Symbol.iterator]();
it.next();
it.next();
it.next();

/* or you can iterate using for...of */

