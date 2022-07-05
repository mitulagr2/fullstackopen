import Part from "./Part";
import { CoursePart } from "../types";

interface ContentProps {
  courseParts: Array<CoursePart>
}

const Content = ({ courseParts } : ContentProps) => {
  return (
    <>
      {courseParts.map(part => 
        <Part key={part.name} part={part} />
      )}
      
    </>
  )
};

export default Content;