interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

const parseExArguments = (args: Array<string>): Array<number> => {
  if (args.length < 4) throw new Error('Not enough arguments');
  const inputs = [];

  for (let i = 2; i < args.length; i++) {
    inputs[i - 2] = +args[i];

    if (isNaN(inputs[i - 2])){
      throw new Error('Provided values were not numbers!');
    }
  }

  return inputs;
};

export const calculateExercises = (target: number, exHours: Array<number>) : Result => {
  const periodLength = exHours.length;
  const trainingDays = exHours.filter((hour) => hour > 0).length;
  const totalHours = exHours.reduce((total, hours) => total + hours, 0);
  const average = totalHours / periodLength;
  const success = average >= target;
  const percentageRating = (average / target) * 100;

  let rating;
  let ratingDescription;

  if (percentageRating >= 100) {
    rating = 3;
    ratingDescription = "You've met your exercise target. Excellent!";
  } else if (percentageRating >= 75 && percentageRating < 100) {
    rating = 2;
    ratingDescription = "Almost there.";
  } else {
    rating = 1;
    ratingDescription = "Poor.";
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

try {
  const inputs = parseExArguments(process.argv);
  console.log(calculateExercises(inputs[0], inputs.slice(1)));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}