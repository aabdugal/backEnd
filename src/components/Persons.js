import React from 'react'


const Persons = ({persons,filterWord, deleteFunc}) =>{

    const arr = persons.filter(person=>person.name.toLowerCase().includes(filterWord.toLowerCase()))
    return(
      arr.map(note=><p>{note.name}: {note.number} <button onClick={deleteFunc} name = {note.name} noteId={note.id}>delete</button></p>)
    )
  
}

export default Persons