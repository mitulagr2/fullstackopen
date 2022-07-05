import { CoursePart } from "../types";

interface PartProps {
  part: CoursePart
}

const Part = ({ part } : PartProps) => {
  switch (part.name) {
    case "Fundamentals":
      return (
        <div>
          <p>
            <strong>{part.name}</strong>
          </p>
          <p>
            <em>{part.description}</em>
          </p>
          <p>
            project exercises {part.exerciseCount}
          </p>
          <br />
        </div>
      );
      case "Advanced":
      return (
        <div>
          <p>
            <strong>{part.name}</strong>
          </p>
          <p>
            <em>{part.description}</em>
          </p>
          <p>
            project exercises {part.exerciseCount}
          </p>
          <br />
        </div>
      );
    case "Using props to pass data":
      return (
        <div>
          <p>
            <strong>{part.name}</strong>
          </p>
          <p>
            project exercises {part.exerciseCount}
          </p>
          <p>
            group projects {part.groupProjectCount}
          </p>
          <br />
        </div>
      );
    case "Deeper type usage":
      return (
        <div>
          <p>
            <strong>{part.name}</strong>
          </p>
          <p>
            <em>{part.description}</em>
          </p>
          <p>
            project exercises {part.exerciseCount}
          </p>
          <p>
            submit to {part.exerciseSubmissionLink}
          </p>
          <br />
        </div>
      );
      case "Backend development":
      return (
        <div>
          <p>
            <strong>{part.name}</strong>
          </p>
          <p>
            <em>{part.description}</em>
          </p>
          <p>
            project exercises {part.exerciseCount}
          </p>
          <p>
            required skills: {part.requirements.join(", ")}
          </p>
          <br />
        </div>
      );
    default:
      return assertNever(part);
  }
};

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export default Part;