//-------------------Variable-------------
// Naming variable meaningfull
// Avoid extra word for variable.
// Declare variable name with purpose (exapmle: into map, forEach)
// Don't need to add Unnecessary context (example: product={productId: "1" ,productName: "Tshart"} *here we don't need to mention product again and again into object)
// try to use let const as much as possible instead of var.

//--------------------- Functions -------------------------
// Declare function name with long and descriptive name. (ex:- email/sendEmailToUser).
// Don't use many arguments (it's bad for test). (example: we can declare arguments like, ({fields, formData, toDate}) instead of (fields, formData, toDate))
// Use Default arguments intead of contions.
// Don't need to pass flag as parameters.(create two function for two type flag, otherwise testcases will increased)
// Don't do multiple works into a single functions (single task single function)
// Strongly Check Type (example: 1 === '1').
// Don't pollute global prototypes (use ES6 class)
// for setting default object value use ``Object.assign``.
// use conditional shorthand like ( if(valid) instead of if(valid === true) ).
// Try to use method chaining in Object Oriented js.
// Try to avoid eval.
// Don't write code in one line code.
// Try to avoid adding function with prototype.


//-------------------- Loop -------------------
// Declare variables Outside of the for statements (like, not calculating length everytime, Declare variable of side specilly for documents )


// Others
// use semicolon(;)
//