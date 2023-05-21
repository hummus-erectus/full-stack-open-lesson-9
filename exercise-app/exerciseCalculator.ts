interface InputValues {
  targetHours: number;
  exerciseHours: number[];
}

interface ExerciseValues {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  targetHours: number;
  average: number;
}

const parseArgs = (args: string[]): InputValues => {
  if (args.length < 4) throw new Error('Not enough arguments');

  const targetHours = Number(args[2]);
  if (isNaN(targetHours)) {
    throw new Error('Provided values were not numbers!');
  }

  const exerciseHours = args.slice(3).map(Number);
  if (exerciseHours.some(isNaN)) {
    throw new Error('Provided values were not numbers!');
  }

  return {
    targetHours,
    exerciseHours
  };
}

const calculateExerciseAnalysis = (targetHours: number, exerciseHours: number[]): ExerciseValues | string => {
  try {
    const { targetHours, exerciseHours } = parseArgs(process.argv);
    const periodLength = exerciseHours.length;
    const trainingDays = exerciseHours.filter(day => day!=0).length;
    const findMean = (array: number[]): number =>{
      const sum = array.reduce(function (a, b) {
        return a + b;
      });
      return sum / array.length;
    }
    const average = findMean(exerciseHours);
    const success = average >= targetHours;
    let rating;
    let ratingDescription;

    switch (true) {
      case targetHours/average >= 1.5:
        rating = 1;
        ratingDescription = "Push harder!";
        break;
      case targetHours/average < 1.5 && targetHours/average > 1:
        rating = 2;
        ratingDescription = "Not bad, but could do better";
        break;
      default:
        rating = 3;
        ratingDescription = "Great job!";
        break;
    }
    return {
      periodLength,
      trainingDays,
      success,
      rating,
      ratingDescription,
      targetHours,
      average
    };
  } catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    return errorMessage;
  }
}

const targetHours: number = Number(process.argv[2]);
const exerciseHours: number[] = process.argv.slice(3).map(Number);
console.log(calculateExerciseAnalysis(targetHours, exerciseHours));