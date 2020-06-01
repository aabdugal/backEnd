import React from 'react'

const Persons = ({persons,filterWord}) =>{
    const arr = persons.filter(person=>person.name.toLowerCase().includes(filterWord.toLowerCase()))
    return(
      arr.map(note=><p>{note.name}: {note.number}</p>)
    )
  
}

export default Persons