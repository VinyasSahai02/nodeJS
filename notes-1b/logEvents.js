//NODE MODULES
//see package.json carefully


//npm i nodemon -D
// nodemon monitors your file 
//looks for index.js by default
//-D is to install it as a dev dependicies

//npm i date-fns
//npm i uuid

const {format} =require('date-fns')
const {v4:uuid}=require('uuid')

const fs=require('fs')
const fsPromises=require('fs').promises
const path=require('path')


// console.log(format(new Date(),'yyyyMMdd\tHH:mm:ss'))
// console.log(uuid())

//npm update->checks if any dependencies has any updates
//npm rm dependency name -> uninstalls dependencies



//this file was earlier index.js

//EVENT EMITTERS
const logEvents= async(message)=>{
    const dateTime= `${format(new Date(),'yyyyMMdd\tHH:mm:ss')}`
    const logItem= `${dateTime}\t${uuid()}\t${message}\n`
    console.log(logItem)
    try{
        if(!fs.existsSync(path.join(__dirname,'logs'))){
            await fsPromises.mkdir(path.join(__dirname,'logs'))
        }
        await fsPromises.appendFile(path.join(__dirname,'logs','eventLog.txt'),logItem)
    }catch(err){
        console.log(err)
    }
}
module.exports=logEvents;