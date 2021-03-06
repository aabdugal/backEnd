const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)
const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url, {useNewUrlParser:true, useUnifiedTopology: true})
    .then(result=>{
        console.log('Connected to MongoDB')
    })
    .catch((error)=>{
        console.log('Error connecting to MongoDB', error.message)
    })
const noteSchema = new mongoose.Schema({
    name: String,
    number: String,
})

noteSchema.set('toJSON', {
    transform: (document, returnedObject)=>{
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports= mongoose.model('Note', noteSchema)