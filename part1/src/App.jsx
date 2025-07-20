// Ejericios de 1.0 al 1.15

// const Header = ({course}) => {
//   return (
//     <h1>{course.name}</h1>
//   )
// }

// const Part = ({name, exercises}) => {
//   return (
//     <p>{name} {exercises}</p>
//   )
// }

// const Content = ({course}) => {
//   return (
//     <>
//       <Part name={course.parts[0].name} exercises={course.parts[0].exercises}/>
//       <Part name={course.parts[1].name} exercises={course.parts[1].exercises}/>
//       <Part name={course.parts[2].name} exercises={course.parts[2].exercises}/>
//     </>
//   )
// }

// const Total = ({course}) => {
//   return (
//     <>
//       <p>Number of exercises {course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises}</p>
//     </>
//   )
// }


// const App = () => {
//   const course = {
//     name: 'Half Stack application development',
//     parts: [
//     {
//     name: 'fundamentals of React',
//     exercises: 10
//     },
//     {
//     name: 'Using props to pass data',
//     exercises: 7
//     },
//     {
//     name: 'State of a component',
//     exercises: 14
//     }
//   ]
//   } 
  

//   return (
//     <>
//       <Header course={course}/>
//       <Content course={course}/>
//       <Total course={course}/>
//     </>
//   )
  
// }

// export default App


// Ejercicios de 1.6 al 1.14

// import { useState } from "react";

// const Statistics = ({good, neutral, bad}) => {
//     const all = good + neutral + bad
//     const average = all === 0 ? 0 : (good - bad) / all
//     const positive = all === 0 ? 0 : (good / all) * 100

//     if (all === 0) {
//       return <p>No feedback given</p>
//     }

//     return (
//       <div>
//         <h1>statistics</h1>
//         <table>
//           <tbody>
//             <StatisticsLine text='good' value={good}/>
//             <StatisticsLine text='neutral' value={neutral}/>
//             <StatisticsLine text='bad' value={bad}/>
//             <StatisticsLine text='all' value={all}/>
//             <StatisticsLine text='average' value={average}/>
//             <StatisticsLine text='positive' value={`${positive} %`}/>
//           </tbody>
//         </table>
//       </div>
//     )
// }

// const Button = ({handleClick, text}) => {
//   return <button onClick={handleClick}>{text}</button>
// }

// const StatisticsLine = ({text, value}) => {
//   return (
//     <tr>
//       <td>{text}</td>
//       <td>{value}</td>
//     </tr>
//   )
// }

// const App = () => {
//   const [good, setGood] = useState(0)
//   const [neutral, setNeutral] = useState(0)
//   const [bad, setBad] = useState(0)

//   const handleGoodClick = () => setGood(good +1)
//   const handleNeutralclick = () => setNeutral(neutral + 1)
//   const handleBadClick = () => setBad(bad + 1)


//   return (
//     <div>
//       <h1>give feedback</h1>
//       <Button handleClick={handleGoodClick} text='good'/>
//       <Button handleClick={handleNeutralclick} text='neutral'/>
//       <Button handleClick={handleBadClick} text='bad'/>
//       <Statistics good={good} neutral={neutral} bad={bad}/>
//     </div>
//   )
// }

// export default App


// Ejercicios 1.12 al 1.14

import { useState } from "react";

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))

  const handleNextAnecdote = () => {
    const randomIndex = Math.floor(Math.random() * anecdotes.length)
    setSelected(randomIndex)
  }

  const handleVote = () => {
    const updateVotes = [...votes]
    updateVotes[selected] += 1
    setVotes(updateVotes)
  }

  const maxvotes = Math.max(...votes)
  const maxIndex = votes.indexOf(maxvotes)

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>this anectote has {votes[selected]} votes</p>
      <button onClick={handleVote}>Vote</button>
      <button onClick={handleNextAnecdote}>Next anecdote</button>
      <h1>Anecdote with most votes</h1>
      {maxvotes === 0 ? (
        <p>No votes yet</p>
      ): (
        <>
          <p>{anecdotes[maxIndex]}</p>
          <p>has {maxvotes} votes</p>
        </>
      )}

    </div>
  )
}

export default App