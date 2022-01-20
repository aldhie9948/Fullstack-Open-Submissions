import React, { useState } from "react";

// const Heading = ({ text }) => <h1>{text}</h1>;

// const Button = ({ handleClick, text }) => (
//   <button onClick={handleClick}>{text}</button>
// );

// const StatisticLine = ({ text, value }) => (
//   <tr>
//     <td>{text}</td>
//     <td>{value}</td>
//   </tr>
// );

// const Statistics = ({ arrayValues }) => {
//   const [good, neutral, bad] = arrayValues;
//   if (good === 0 && neutral === 0 && bad === 0) {
//     return <p>No Feedback Given</p>;
//   }

//   const average = () => {
//     const goodScore = 1 * good;
//     const neutralScore = 0 * neutral;
//     const badScore = -1 * bad;
//     const all = good + neutral + bad;
//     const average = (goodScore + neutralScore + badScore) / all;

//     return isNaN(average) ? 0 : average;
//   };

//   const positiveFeedback = () => {
//     const all = good + neutral + bad;
//     const positivePercent = (good / all) * 100;
//     return isNaN(positivePercent) ? 0 : positivePercent;
//   };

//   return (
//     <div>
//       <table>
//         <tbody>
//           <StatisticLine text="Good" value={good} />
//           <StatisticLine text="Neutral" value={neutral} />
//           <StatisticLine text="Bad" value={bad} />
//           <StatisticLine
//             text="All"
//             value={arrayValues.reduce((a, b) => a + b)}
//           />
//           <StatisticLine text="Average" value={average()} />
//           <StatisticLine text="Positive" value={`${positiveFeedback()} %`} />
//         </tbody>
//       </table>
//     </div>
//   );
// };

// const App = () => {
//   const [good, setGood] = useState(0);
//   const [neutral, setNeutral] = useState(0);
//   const [bad, setBad] = useState(0);

//   const setToValue = (newValue, setState) => setState(newValue);

//   return (
//     <div>
//       <Heading text="Give Feedback" />
//       <Button handleClick={() => setToValue(good + 1, setGood)} text="Good" />
//       <Button
//         handleClick={() => setToValue(neutral + 1, setNeutral)}
//         text="Neutral"
//       />
//       <Button handleClick={() => setToValue(bad + 1, setBad)} text="Bad" />
//       <Heading text="Statistics" />
//       <Statistics arrayValues={[good, neutral, bad]} />
//     </div>
//   );
// };

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const DisplayVotes = ({ values }) => <div>has {values} votes</div>;

const Heading = ({ text }) => <h1>{text}</h1>;

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients",
  ];
  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0));

  const randomNumber = () => setSelected(Math.round(Math.random() * 5));
  const voteAnecdote = () => {
    const copy = [...points];
    copy[selected] += 1;
    return setPoints(copy);
  };
  const mostVotes = () => {
    const largestVote = points.reduce((a, b) => Math.max(a, b));
    const indexAnecdote = points.findIndex((arr) => arr >= largestVote);
    return indexAnecdote;
  };
  mostVotes();

  return (
    <div>
      <div>
        <Heading text="Anecdote of the day" />
        {anecdotes[selected]}
        <DisplayVotes values={points[selected]} />
        <div>
          <Button handleClick={voteAnecdote} text="vote" />
          <Button handleClick={randomNumber} text="next anecdote" />
        </div>
      </div>
      <div>
        <Heading text="Anecdote with most votes" />
        {anecdotes[mostVotes()]}
      </div>
    </div>
  );
};

export default App;
