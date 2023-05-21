interface CalcValues {
  height: number;
  weight: number;
}

const parseArguments = (args: string[]): CalcValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}

const calculateBmi = (height: number, weight: number): string => {
  try {
    const { height, weight } = parseArguments(process.argv);
    const heightInMetres = height/100
    const bmi = weight / (heightInMetres*heightInMetres)
    let category
    switch (true) {
      case bmi < 16.0:
        category = "Underweight (Severe thinness)";
        break;
      case bmi >= 16.0 && bmi <= 16.9:
        category = "Underweight (Moderate thinness)";
        break;
      case bmi >= 17.0 && bmi <= 18.4:
        category = "Underweight (Mild thinness)";
        break;
      case bmi >= 18.5 && bmi <= 24.9:
        category = "Normal range";
        break;
      case bmi >= 25.0 && bmi <= 29.9:
        category = "Overweight (Pre-obese)";
        break;
      case bmi >= 30.0 && bmi <= 34.9:
        category = "Obese (Class I)";
        break;
      case bmi >= 35.0 && bmi <= 39.9:
        category = "Obese (Class II)";
        break;
      default:
        category = "Obese (Class III)";
        break;
    }
    return category
  } catch (error: unknown) {
    let errorMessage = 'Something bad happened.'
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    return errorMessage;
  }
}

const height: number = Number(process.argv[2])
const weight: number = Number(process.argv[3])

console.log(calculateBmi(height, weight))