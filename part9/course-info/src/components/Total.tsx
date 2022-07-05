interface TotalProps {
  courseParts: Array<{
    name: string;
    exerciseCount: number;
  }>;
}

const Total = ({ courseParts } : TotalProps) => {
  return (
    <>
      <p>
        Number of exercises{" "}
        {courseParts.reduce((sum, part) => sum + part.exerciseCount, 0)}
      </p>
    </>
  )
};

export default Total;