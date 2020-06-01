const express = require('express')
const app = express()
const morgan = require('morgan')

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
  res.json(persons)
})

app.get('/info',(req,res)=>{
  res.send(`<div> Phonebook has info for ${persons.length} people</div>
            <div> ${new Date()} </div>`)
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
  const person = {
    name: body.name,
    number: body.number,
    id: Math.floor(Math.random()*Math.floor(100))
  }
  console.log(person)
  persons = persons.concat(person)
  res.json(person)
})





app.get('/api/persons/:id', (req, res)=>{
  const id = Number(req.params.id)
  const person = persons.find(person=>person.id===id)

  if(person){
    res.json(person)
  } else{
    res.status(404).end()
  }
})

app.delete('/api/persons/:id',(request,response)=>{
  const id = Number(request.params.id)
  // persons = persons.filter(person=>person.id!==id)
  persons = persons.filter(person => person.id !==id)

  response.status(204).end()

  // res.status(204).end()
})


const PORT = 3001
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