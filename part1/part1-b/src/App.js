import React from "react";

const Header = (props) => {
  return <h1> {props.course} </h1>;
};

const Total = (props) => {
  let total = props.parts.map((arr) => arr.exercises).reduce((a, b) => a + b);
  return <p>Number of exercises {total} </p>;
};

const Part = (props) => {
  return (
    <p>
      {" "}
      {props.part} {props.exercise}{" "}
    </p>
  );
};

const Content = (props) => {
  return (
    <div>
      <Part part={props.parts[0].name} exercise={props.parts[0].exercises} />
      <Part part={props.parts[1].name} exercise={props.parts[1].exercises} />
      <Part part={props.parts[2].name} exercise={props.parts[2].exercises} />
    </div>
  );
};

const App = () => {
  const course = {
    name: "Half Stack Application Development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of component",
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default App;
