// started operating system process
console.log('first')
setTimeout(() => {
  console.log('second')
}, 0)
console.log('third')
// completed and exited operating system process

//first 
//third 
//second

//setTimeout is async so it gets offloaded and then we invoke the callback