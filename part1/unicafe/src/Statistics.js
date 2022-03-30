import StatisticLine from "./StatisticLine";

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;

  if (all === 0)
    return (
      <>
        <h1> statistics </h1>
        <p> No feedback given </p>
      </>
    );

  const avg = (good - bad) / all;
  const positive = (good / all) * 100;

  return (
    <>
      <h1> statistics </h1>

      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={all} />
          <StatisticLine text="avg" value={avg} />
          <StatisticLine text="positive" value={positive} />
        </tbody>
      </table>
    </>
  );
};

export default Statistics;
