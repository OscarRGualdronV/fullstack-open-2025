// import Course from './components/Course'

// const App = () => {
//   const courses = [
//     {
//     id: 1,
//     name: 'Half Stack application development',
//     parts: [
//             {
//         name: 'Fundamentals of React',
//         exercises: 10,
//         id: 1
//       },
//       {
//         name: 'Using props to pass data',
//         exercises: 7,
//         id: 2
//       },
//       {
//         name: 'State of a component',
//         exercises: 14,
//         id: 3
//       },
//       {
//         name: 'Redux',
//         exercises: 11,
//         id: 4
//       }
//     ]
//   },
//   {
//     name: 'Node.js',
//     id: 2,
//     parts: [
//       {
//         name: 'Routing',
//         exercises: 3,
//         id: 1
//       },
//       {
//         name: 'Middlewares',
//         exercises: 7,
//         id: 2
//       }
//     ]
//   }
// ]

//   return (
//     <div>
//       {courses.map(course => (
//         <Course key={course.id} course={course}/>
//       ))}
//     </div>
//   )
// }

// export default App

import { useEffect, useState } from "react";
import axios from 'axios';

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('') 
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const handleNamechange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterchange = (event) => {
    setFilter(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()

    const nameExists = persons.some(person => person.name === newName)

    if (nameExists) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    const nextId = persons.length > 0
      ? Math.max(...persons.map(p => p.id)) + 1
      : 1

    const newPerson = {
      id: nextId,
      name: newName,
      number: newNumber,
    }

    setPersons(persons.concat(newPerson))
    setNewName('')
    setNewNumber('')
  }

  const personsToShow = filter
    ? persons.filter( person =>
        person.name.toLowerCase().includes(filter.toLowerCase())
    )
    : persons

  return (
    <div>
    <h2>Phonebook</h2>

    <Filter value={filter} onChange={handleFilterchange}/>

    <h3>Add a new</h3>
    <PersonForm
      onSubmit={addPerson}
      newName={newName}
      handleNamechange={handleNamechange}
      newNumber={newNumber}
      handleNumberChange={handleNumberChange}
    />

    <h3>Numbers</h3>
    <Persons persons={personsToShow}/>
    </div>
  )
}

export default App