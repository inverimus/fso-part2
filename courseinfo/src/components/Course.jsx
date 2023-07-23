const Course = (props) => {
  return (
    <div>
      <Header course={props.course.name} />
      <Content parts={props.course.parts}/>
      <Total parts={props.course.parts}/>
    </div>
  )
}

const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Content = (props) => {
  const parts = props.parts
  return (
    <div>
      {parts.map(part => 
        <Part name={part.name} exercises={part.exercises} />
      )}
    </div>
  )
}

const Part = (props) => {
  return (
    <p>{props.name} {props.exercises}</p>
  )
}

const Total = (props) => {
  const parts = props.parts
  return (
    <p><b>total of {parts.map(part => part.exercises).reduce((a, b) => a + b, 0)} exercises</b></p>
  )
}

export default Course