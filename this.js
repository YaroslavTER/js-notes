//Default binding

/* For default function `function name () {}` the `this` defines
by the call-site.  */

function baz() {
    // call-stack is: `baz`
    // so, our call-site is in the global scope

    console.log( "baz" );
    bar(); // <-- call-site for `bar`
}

//Implicit binding

function foo() {
	console.log( this.a );
}

var obj2 = {
	a: 42,
	foo: foo
};

var obj1 = {
	a: 2,
	obj2: obj2
};

obj1.obj2.foo(); // 42

/* In this case the `this` is equivalent to `obj2`. */

//Implicitly lost

/* If the function reference has been assigned to other variable and then
this variable has been called, the applyes default binding. */

function foo() {
	console.log( this.a );
}

var obj = {
	a: 2,
	foo: foo
};

var bar = obj.foo; // function reference/alias!

var a = "oops, global"; // `a` also property on global object

bar(); // "oops, global"

//Explicit binding

function foo() {
	console.log( this.a );
}

var obj = {
	a: 2
};

foo.call( obj ); // 2

/* Even though, the `this` can be lost as it was described earlier. 
To prevent this, you can hard bind the function.*/

function foo() {
	console.log( this.a );
}

var obj = {
	a: 2
};

var bar = function() {
	foo.call( obj );
};

bar(); // 2
setTimeout( bar, 100 ); // 2

// `bar` hard binds `foo`'s `this` to `obj`
// so that it cannot be overriden
bar.call( window ); // 2

//bind polifill

function bind(fn, obj) {
	return function() {
		return fn.allpy(obj, arguments);
	}
}

// New operator

/*
- a brand new object is created (aka, constructed) out of thin air
- the newly constructed object is [[Prototype]]-linked
- the newly constructed object is set as the this binding for that function call
- unless the function returns its own alternate object, the new-invoked function call will automatically return the newly constructed object.
 */

function foo(a) {
	this.a = a;
}

var bar = new foo( 2 );
console.log( bar.a ); // 2

//Bind vs new

/* new and call/apply cannot be used together, so new foo.call(obj1) is not allowed */

function foo(something) {
	this.a = something;
}

var obj1 = {};

var bar = foo.bind( obj1 );
bar( 2 );
console.log( obj1.a ); // 2

var baz = new bar( 3 );
console.log( obj1.a ); // 2
console.log( baz.a ); // 3

/* 
default
imlicit
explicit
new opreator
*/

/* 
- called with new? Use the newly constructed object.
- called with call or apply (or bind)? Use the specified object.
- called with a context object owning the call? Use that context object.
- default: undefined in strict mode, global object otherwise.
*/

a.apply(this, [1, 2, 3]);
a.call(this, 1, 2, 3);
a.bind(this, 1, 2, 3);

/* 
arrow function binds by creation time
default function binds in a runtime
*/

/* arrow function without this, arguments, super, or new.target.
arrow-functions adopt the this binding from the enclosing (function or global) scope.
objects don't create it's scope. */

/* you can't apply new operator to arrow function */