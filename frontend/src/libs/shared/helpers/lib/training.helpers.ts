import {RangeType, TrainingType} from '../../types';


export const getPriceRange = (trainings: TrainingType[]): RangeType => {
  if (!trainings.length) {
    return {
      min: 0,
      max: 0
    };
  }

  const price = trainings.map((training) => training.price);

  return {
    min: Math.min(...price),
    max: Math.max(...price)
  };
};

export const getCalorieRange = (trainings: TrainingType[]): RangeType => {
  if (!trainings.length) {
    return {
      min: 0,
      max: 0
    };
  }

  const calories = trainings.map((training) => training.calories);

  return {
    min: Math.min(...calories),
    max: Math.max(...calories)
  };
};
