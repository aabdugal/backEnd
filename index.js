const express = require('express')
const app = express()
require('dotenv').config()
const morgan = require('morgan')
const cors = require('cors')

const Note = require('./models/note')
const errorHandler = (error, request, response, next)=>{
  console.log(error.message)

  if(error.name === 'Cast Error'){
    return response.status(400).send({error: 'malformatted id'})
  }
  next(error)
}

app.use(errorHandler)
app.use(cors())
app.use(express.static('build'))
app.use(express.json())
// app.use(morgan)

morgan.token('data', (request)=>{
  if(request.method === 'POST'){
    return ` ${JSON.stringify(request.body)}`
  }else{
    return " "
  }
})

app.use(morgan(':method :url :response-time :data'))
let persons =[
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id:3
  },
  {
    name: "Mary Poppendieck",
    number: "04039-23-6423122",
    id:4
  }
]

app.get('/', (req,res)=>{
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons',(req,res)=>{
  Note.find({}).then(notes =>{
    res.json(notes)
  })
})

app.get('/info',(req,res)=>{
  // const length =0
  Note.find({}).then(notes=>{
    res.send(`<div> Phonebook has info for ${notes.length} people</div>
            <div> ${new Date()} </div>`)
  })
  
})

app.post('/api/persons',(req, res)=>{
  // const person = req.body
  const body = req.body
  if(!body.name || !body.number ){
    return res.status(400).json({
      error: 'Content missing'
    })
  }
  if((persons.filter(person=>person.name===body.name)).length>0){
    return res.status(400).json({
      error: 'Name is already in the list'
    })
  }
  const person = new Note({
    name: body.name,
    number: body.number,
    // id: Math.floor(Math.random()*Math.floor(100))
  })

  console.log(person)

  person.save().then(savedNote=>{
    res.json(savedNote)
})
  // persons = persons.concat(person)
  // res.json(person)
})





app.get('/api/persons/:id', (req, res, next)=>{
  Note.findById(req.params.id).then(note=>{
    if(note){
      res.json(note)
    }else{
      res.status(404).end()
    }
  })
  .catch(error=>next(error))
  // const id = Number(req.params.id)
  // const person = persons.find(person=>person.id===id)

  // if(person){
  //   res.json(person)
  // } else{
  //   res.status(404).end()
  // }
})

app.delete('/api/persons/:id',(request,response,next)=>{
  Note.findByIdAndRemove(request.params.id).then(result=>{
    response.status(204).end
  }).catch(error=>next(error))
  // const id = Number(request.params.id)
  // // persons = persons.filter(person=>person.id!==id)
  // persons = persons.filter(person => person.id !==id)

  // response.status(204).end()

  // res.status(204).end()
})

app.put('/api/persons/:id', (request,response,next)=>{
  const body = request.body
  const person = {
    name: body.name,
    number: body.number
  }
  Note.findByIdAndUpdate(request.params.id, person, {new:true}).then(updatedNote =>{
    response.json(updatedNote)
  }).catch(error=>next(error))
})
// app.put('/api/perrsons/:id',(request,response,next)=>{
//   const body = request.body
//   const person = {
//     name: body.name,
//     number: body.number
//   }

//   Note.findByIdAndUpdate(request.params.id, person, {new:true}).then(updatedNote=>{
//     response.json(updatedNote)
//   }).catch(error=>next(error))
// })

const PORT = process.env.PORT
app.listen(PORT, ()=>{
  console.log(`Server running on port ${PORT}`)
})



































// const express = require('express')
// const app = express()

// app.use(express.json())

// app.post('/api/notes', (request, response) => {
//     const note = request.body
//     console.log(note)
  
//     response.json(note)
//   })

// let notes = [
//   {
//     id: 1,
//     content: "HTML is easy",
//     date: "2019-05-30T17:30:31.098Z",
//     important: true
//   },
//   {
//     id: 2,
//     content: "Browser can execute only Javascript",
//     date: "2019-05-30T18:39:34.091Z",
//     important: false
//   },
//   {
//     id: 3,
//     content: "GET and POST are the most important methods of HTTP protocol",
//     date: "2019-05-30T19:20:14.298Z",
//     important: true
//   }
// ]
// app.get('/',(req,res)=>{
//     res.send('<h1>Hello World!</h1>')
// })
// app.get('/api/notes/:id', (request, response) => {
//     const id = Number(request.params.id)
//     const note = notes.find(note => note.id === id)
    
//     if (note) {
//       response.json(note)
//     } else {
//       response.status(404).end()
//     }
//   })

// app.delete('/api/notes/:id', (request, response) => {
//     const id = Number(request.params.id)
//     notes = notes.filter(note => note.id !== id)
  
//     response.status(204).end()
//   })
// app.get('/api/notes', (req, res) => {
//     res.json(notes)
//   })
  
//   const PORT = 3001
//   app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`)
//   })