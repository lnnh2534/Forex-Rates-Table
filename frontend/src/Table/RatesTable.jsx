import BigNumber from "bignumber.js";

const isEvenNumber = (num) => {
  const numString = num.toString();
  const lastDigit = numString[numString.length - 1];
  const lastNum = parseInt(lastDigit, 10);
  return lastNum % 2 === 0;
};

function RatesTable({ rates }) {
  return (
    <table id="rates-table">
      <thead>
        <tr>
          <th>Currency</th>
          <th>Rates</th>
          <th>Adted Rates</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(rates).map(([currency, originalRate]) => {
          const originalBN = new BigNumber(originalRate);
          const adjustedBN = originalBN.plus(new BigNumber(10.0002));
          const adjustedRate = adjustedBN.toString();

          const isEvenOriginal = isEvenNumber(originalRate);
          const isEvenAdjusted = isEvenNumber(adjustedRate);

          return (
            <tr key={currency}>
              <td>{currency}</td>
              <td className={isEvenOriginal || currency === "HKD" ? "red-border" : ""}>
                {originalRate}
              </td>
              <td className={isEvenAdjusted || currency === "HKD" ? "red-border" : ""}>
                {adjustedRate}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default RatesTable;
