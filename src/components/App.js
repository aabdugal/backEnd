import React, {useState, useEffect} from 'react'
import Filter from './Filter'
import Persons from './Persons'
import PersonForm from './PersonForm'
import noteService from './noteService'
// import axios from 'axios'

const Notification = ({message, style})=>{
  if(message===null){
    return null
  }
  
  return (
    <div className='notification' style = {style}>
      {message}
    </div>
    )
  
}

const App = ()=>{

  const [persons, setPersons] = useState([
    
    // { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [style, setStyle] = useState(null)

  const errorStyle = {
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    padding: 10,
    borderRadius: 5,
    marginBottom:10
  }

  const successStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    padding: 10,
    borderRadius: 5,
    marginBottom:10
  }


  useEffect(()=>{
    noteService.getAll().then(initialNotes=>{
      console.log('Successful')
      setPersons(initialNotes)
    })
  },[])



  const handleNameChange = (event) =>{  
    // console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) =>{
    setNewNumber(event.target.value)
  }
  const handleFilter = (event) =>{
    console.log(event.target.value)
    setFilter(event.target.value)
  }
  const addName = (event) =>{
    event.preventDefault()
    const arr = persons.filter(person=>person.name===newName)
    console.log(arr)
    
    if(persons.filter(person=>person.name===newName).length>0){
      // window.alert(`${newName} is already added to phonebook`)
      if(window.confirm(`${arr[0].name} is already added to phonebook, replace the old number with a new one?`)){
        setMessage(`Person ${arr[0].name} was changed`)
        setStyle(successStyle)
        noteService.update(arr[0].id, {...arr[0], number: newNumber}).then(resp=>console.log(resp))
        refresh()
        setTimeout(()=>{
          setMessage(null,null)
          setStyle(null)
        },5000)
      }
    }else{
      const newPerson = {
        name: newName,
        number: newNumber
      }
      console.log('added to persons')
      setMessage(`Person ${newName} was added to the server!`)
      setStyle(successStyle)
      noteService.create(newPerson).then(returnedNote=>{
        console.log(returnedNote)
        setPersons(persons.concat(returnedNote))
      })
      setTimeout(()=>{
        setMessage(null)
        setStyle(null)
      },5000)
      
      // setPersons(persons.concat(newPerson))
      // Axios.post('http://')
      // noteService.update(newName, newPerson)
      // noteService.create(newPerson).then(returnedNote=>{
      //   console.log(returnedNote)
      // }).catch((error)=>{
      //   console.log(error)
      // })
      // setPersons(persons.concat(newPerson))

      setNewName('')
      setNewNumber("")
    }
    
  }

  const deleteFunc=(event)=>{
    event.preventDefault()
    console.log(event.target.attributes.noteId.value)
    if(window.confirm(`Delete ${event.target.attributes.name.value} ?`)){
      // noteService.deleteNode(event.target.attributes.noteId.value).then(resp=>console.log(resp))
      // axios.delete(`http://localhost:3001/notes/${event.target.attributes.noteId.value}`).then(response=>{
      //   console.log(response)
      //   // setPersons(persons)
      //   refresh()
      // })
      setMessage(`Person ${event.target.attributes.name.value} was deleted from server`)
      setStyle(errorStyle)
      noteService.deleteNode(event.target.attributes.noteId.value).then(response=>{
        console.log("deleted", response)
        refresh()
        // Notification(``)
        
        setTimeout(()=>{
          setMessage(null,null)
          setStyle(null)
        },5000)
        
      })
    }
  }

  const refresh = ()=>{
    noteService.getAll().then(initialNotes=>{
      console.log('Refreshed')
      setPersons(initialNotes)
    })
  }  
  


  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message = {message} style = {style}/>
      <Filter filter = {filter} handleFilter = {handleFilter}/>
  
      <h2>Add a new</h2>
      <PersonForm addName={addName} newName= {newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>

      <h2>Numbers</h2>

      <Persons persons = {persons} filterWord= {filter} deleteFunc={deleteFunc}/>
  
    </div>
  )
}

export default App