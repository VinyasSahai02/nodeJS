// CommonJS, every file is module (by default)
// Modules - Encapsulated Code (only share what we want that is minimum)
const names = require('./04-names')
const sayHi = require('./05-utils')
const data = require('./06-alternative-flavor')

require('./07-mind-grenade')
//the sum is:15

sayHi('susan')
sayHi(names.john)
sayHi(names.peter)
console.log(data)  //{ items:['item1','item2'], singlePerson:{name:'bob'} }

