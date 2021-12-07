import React, { useState } from "react";

const Heading = ({ text }) => <h1>{text}</h1>;

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

const Statistics = ({ arrayValues }) => {
  const [good, neutral, bad] = arrayValues;
  if (good === 0 && neutral === 0 && bad === 0) {
    return <p>No Feedback Given</p>;
  }

  const average = () => {
    const goodScore = 1 * good;
    const neutralScore = 0 * neutral;
    const badScore = -1 * bad;
    const all = good + neutral + bad;
    const average = (goodScore + neutralScore + badScore) / all;

    return isNaN(average) ? 0 : average;
  };

  const positiveFeedback = () => {
    const all = good + neutral + bad;
    const positivePercent = (good / all) * 100;
    return isNaN(positivePercent) ? 0 : positivePercent;
  };

  return (
    <div>
      <table>
        <tbody>
          <StatisticLine text="Good" value={good} />
          <StatisticLine text="Neutral" value={neutral} />
          <StatisticLine text="Bad" value={bad} />
          <StatisticLine
            text="All"
            value={arrayValues.reduce((a, b) => a + b)}
          />
          <StatisticLine text="Average" value={average()} />
          <StatisticLine text="Positive" value={`${positiveFeedback()} %`} />
        </tbody>
      </table>
    </div>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const setToValue = (newValue, setState) => setState(newValue);

  return (
    <div>
      <Heading text="Give Feedback" />
      <Button handleClick={() => setToValue(good + 1, setGood)} text="Good" />
      <Button
        handleClick={() => setToValue(neutral + 1, setNeutral)}
        text="Neutral"
      />
      <Button handleClick={() => setToValue(bad + 1, setBad)} text="Bad" />
      <Heading text="Statistics" />
      <Statistics arrayValues={[good, neutral, bad]} />
    </div>
  );
};

export default App;
