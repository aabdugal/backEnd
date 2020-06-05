const mongoose = require('mongoose')

if(process.argv.length<3){
    console.log('Please provide the password as an arguemtn: node mongo.js <password>')
    process.exit(1)
}
const password = process.argv[2]

const url = `mongodb+srv://aabdugal:${password}@cluster0-gv9yk.mongodb.net/note-app?retryWrites=true&w=majority`
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology:true})

const noteSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Note = mongoose.model('Note', noteSchema)
if(process.argv.length==3){
    Note.find({}).then(result=>{
        console.log('phonebook:')
        result.forEach(note=>{
            console.log(`${note.name} ${note.number}`)
        })
        mongoose.connection.close()
    })
}else{
    const note = new Note({
        name: process.argv[3],
        number: process.argv[4],
    })
    
    note.save().then(result=>{
        console.log(`added ${process.argv[3]} number ${process.argv[4]} to phonebook`)
        mongoose.connection.close()
    })
}
