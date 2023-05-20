interface ExerciseValues {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

const calculateExerciseAnalysis = (exerciseHours: number[], targetHours: number): ExerciseValues => {
  const periodLength = exerciseHours.length;
  const trainingDays = exerciseHours.filter(day => day!=0).length;
  const target = targetHours;
  const findMean = (array: number[]): number =>{
    const sum = array.reduce(function (a, b) {
      return a + b;
    });
    return sum / array.length;
  }
  const average = findMean(exerciseHours);
  const success = average >= target;
  let rating;
  let ratingDescription;

  switch (true) {
    case target/average >= 1.5:
      rating = 1;
      ratingDescription = "Push harder!";
      break;
    case target/average < 1.5 && target/average > 1:
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
    target,
    average
  };
}

console.log(calculateExerciseAnalysis([3, 0, 2, 4.5, 0, 3, 1], 2));