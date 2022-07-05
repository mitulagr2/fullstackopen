import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
import express from 'express';
const app = express();

app.use(express.json())

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const data = {
    height: Number(req.query?.height),
    weight: Number(req.query?.weight),
    bmi: ""
  };

  if (!data.height || !data.weight || isNaN(data.height) || isNaN(data.weight)) {
    res.status(400).json({error: "malformatted parameters"});
  }

  data.bmi = calculateBmi(data.height, data.weight);
  
  res.json(data);
});

app.post('/exercises', (req, res) => {
  if (!req.body?.daily_exercises || !req.body?.target) {
    res.status(400).json({error: "parameters missing"});
  }

  const { daily_exercises, target } = req.body;

  if (isNaN(target) || daily_exercises.some((exercise: number) => isNaN(exercise))) {
    res.status(400).json({error: "malformatted parameters"});
  }
  
  res.json(calculateExercises(target, daily_exercises));
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});