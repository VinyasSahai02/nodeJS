// runs on the server 
// console is in terminal window 
// type node filename(server in this case) to console.log things
// misses some API's like fetch

const path = require("path")
console.log(path.parse(__filename)) //gives all info about a file 
//ie. root(E:\\), dir(E:\\web devp\\node\\notes), base(server.js), ext(.js), name(server)

//importing a file
const math=require("./math")
console.log(math.add(2,3))
//OR
const {math} =require("./math")
console.log(add(2,3))


//ctrl+f to search for docs on node.js
//ctrl+` to open terminal



//READ AND WRITE FILES
const fs= require('fs')
fs.readFile('./files/text.txt',(err,data)=>{
    if(err) throw err;
    console.log(data.toString()) //toString is added as the data is present in buffer form
})

fs.writeFile(path.join(__dirname,'files','reply.txt'),'nice to meet you',(err)=>{  //in brackets another way to read/write
    if(err) throw err;
    console.log("write conplete") //utf8 removes the need to add toString         
})
fs.appendFile(path.join(__dirname,'files','test.txt'),'testing text',(err)=>{
    if(err) throw err;
    console.log("append conplete") 
})
//or--> appends within the same file
//if more func are to be performed they will be within appendFile
fs.writeFile(path.join(__dirname,'files','reply.txt'),'nice to meet you',(err)=>{  
    if(err) throw err;
    console.log("write conplete")

    fs.appendFile(path.join(__dirname,'files','reply.txt'),'testing text',(err)=>{
        if(err) throw err;
        console.log("append conplete") 
    })
})
//exit on uncaught erros---from the node docs no need to learn
process.on('uncaughtException',err=>{
    console.error(`there was an uncaught err: ${err}`)
    process.exit(1)
})
//looks like callback hell so...

const fsPromises = require('fs').promises
const fileOps =async()=>{
    try{
        const data=await fsPromises.readFile(path.join(__dirname,'files','text.txt'),'utf8')
        console.log(data)
        await fsPromises.unlink(path.join(__dirname,'files','promisesWrite.txt'))  //deletes the file
        await fsPromises.writeFile(path.join(__dirname,'files','promisesWrite.txt'),data)
        await fsPromises.appendFile(path.join(__dirname,'files','promisesWrite.txt'),'nice to meet you')
    }
    catch (err){
        console.log(err)
    }
}
fileOps();


//NODE MODULES