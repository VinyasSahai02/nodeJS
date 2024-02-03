//CREATING FOLDERS

const fs=require('fs')

if(!fs.existsSync('./new')){
    fs.mkdir('./new',(err)=>{
        if(err) throw err
        console.log('directory created')
    })
}
//create a folder named new if it does not exist

if(fs.existsSync('./new')){
    fs.rmdir('./new',(err)=>{
        if(err) throw err
        console.log('directory removed')
    })
}