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
import personService from './services/persons'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('') 
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
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

  const handleDelete = (id) => {
    const person = persons.find(p => p.id === id)
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id))
        })
        .catch(() => {
          alert(`The person '${person.name}' was already removed from the server`)
          setPersons(persons.filter(p => p.id !== id))
        })
    }
  }

  const addPerson = (event) => {
    event.preventDefault()

    const existingPerson = persons.find(person => person.name === newName)

    if (existingPerson) {
      if (existingPerson.number === newNumber) {
        alert(`${newName} with number ${newNumber} is already in the phonebook`)
        return
      }
      
      const confirmUpdate = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      )

      if (confirmUpdate) {
        const updatePerson = { ...existingPerson, number: newNumber }
      
        personService
          .update(existingPerson.id, updatePerson)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id !== existingPerson.id ? p : returnedPerson))
            setNewName('')
            setNewNumber('')
          })
          .catch(() => {
            alert(`Failed to update ${newName}. It may have been removed from the server.`)
            setPersons(persons.filter(p => p.id !== existingPerson.id))
          })
      }

      return
    }


    const newPerson = {
      name: newName,
      number: newNumber,
    }

    personService
      .create(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
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
    <Persons 
    persons={personsToShow}
    handleDelete={handleDelete}
    />
    </div>
  )
}

export default App