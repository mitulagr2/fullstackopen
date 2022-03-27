const Course = ({ course }) => (
  <div>
    <Header course={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </div>
);

const Header = ({ course }) => <h1>{course}</h1>;

const Content = ({ parts }) => (
  <div>
    {parts.map(({ name, exercises, id }) => (
      <Part key={id} part={name} exercises={exercises} />
    ))}
  </div>
);

const Part = ({ part, exercises }) => (
  <p>
    {part} {exercises}
  </p>
);

const Total = ({ parts }) => (
  <strong>
    total of {parts.reduce((s, p) => s + p.exercises, 0)} exercises
  </strong>
);

export default Course;
