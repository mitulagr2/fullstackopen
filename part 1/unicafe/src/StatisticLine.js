const StatisticLine = ({ text, value }) => (
  <>
    <tr>
      <td> {text} </td>
      <td>
        {" "}
        {value} {text === "positive" ? "%" : ""}{" "}
      </td>
    </tr>
  </>
);

export default StatisticLine;
