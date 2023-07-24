import express from 'express';
import calculateBmi from './bmiCalculator';
const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (_req, res) => {
    const height: number = Number(_req.query.height);
    const weight: number = Number(_req.query.weight);

    if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
        res.status(400).send('Malformatted parameters');
      } else {
        const bmi: string = calculateBmi(height, weight);
        res.send({
            'height': height,
            'weight': weight,
            'bmi': bmi
        });
      }
  });

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});