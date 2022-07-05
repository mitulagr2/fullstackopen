interface BmiValues {
  value1: number;
  value2: number;
}

const parseBMIArguments = (args: Array<string>): BmiValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3])
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

export const calculateBmi  = (height: number, weight: number) => {
  const bmi = 1.3 * weight / Math.pow((height/100), 2.5);
  const category = bmi < 16 ? "Underweight (Severe thinness)" : bmi < 17 ? "Underweight (Moderate thinness)" : bmi < 18.5 ? "Underweight (Mild thinness)" : bmi < 25 ? "Normal (Healthy Weight)" : bmi < 30 ? "Overweight (Pre-obese)" : bmi < 35 ? "Obese (Class I)" : bmi < 40 ? "Obese (Class II)" : "Obese (Class III)";
  return category;
};

try {
  const { value1, value2 } = parseBMIArguments(process.argv);
  console.log(calculateBmi(value1, value2));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}