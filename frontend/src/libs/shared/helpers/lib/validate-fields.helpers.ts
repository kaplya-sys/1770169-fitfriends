import {
  EMAIL_FIELD_ERROR,
  EMAIL_REGEX,
  EMPTY_FIELD_ERROR,
  NameLength,
  PasswordLength,
  PRICE_FIELD_ERROR,
  DescriptionLength,
  FIELD_VALUE_ERROR,
  FIELD_VALUE_TYPE_ERROR,
  ExperienceLength,
  CALORIES_FIELD_ERROR,
  EXERCISE_MAX_LENGTH_ERROR,
  EXERCISE_MAX_LENGTH,
  AttributeName,
  CaloriesRange,
  ContentLength
} from '../../constants';
import {
  Exercise,
  ExerciseType,
  FitnessLevel,
  Gender,
  Station,
  Role,
  TrainingTime,
  ValidatorType
} from '../../types';
import {createMessage} from './common.helpers';

const validateValue = (value: string | null | undefined, min: number, max: number, emptyCheck = true): string | null => {
  if (!value) {
    if (emptyCheck) {
      return EMPTY_FIELD_ERROR;
    }

    return null;
  }

  if (value.length < min || value.length > max) {
    return createMessage(FIELD_VALUE_ERROR, [min, max]);
  }

  return null;
};

const validateValueType = <T extends object>(value: string | null | undefined, type: T): string | null => {
  if (!value) {
    return EMPTY_FIELD_ERROR;
  }
  const values = Object.values(type);

  if (!values.includes(value)) {
    return createMessage(FIELD_VALUE_TYPE_ERROR, [values.join(',')]);
  }

  return null;
};

const validateEmail = (email: string | null | undefined): string | null => {
  if (!email) {
    return EMPTY_FIELD_ERROR;
  }

  if (!EMAIL_REGEX.test(email)) {
    return EMAIL_FIELD_ERROR;
  }

  return null;
};

const validatePrice = (price: string | null | undefined): string | null => {
  if (!price) {
    return EMPTY_FIELD_ERROR;
  }
  const value = parseInt(price, 10);

  if (isNaN(value) || value < 0 || value !== Number(price)) {
    return PRICE_FIELD_ERROR;
  }

  return null;
};

const validateCalories = (calories: string | null | undefined, min: number, max: number): string | null => {
  if (!calories) {
    return EMPTY_FIELD_ERROR;
  }
  const value = parseInt(calories, 10);

  if (isNaN(value) || value !== Number(calories) || value < min || value > max) {
    return createMessage(CALORIES_FIELD_ERROR, [min, max]);
  }

  return null;
};

const validateExercises = (values: string[] | null | undefined): string | null => {
  if (!values?.length) {
    return EMPTY_FIELD_ERROR;
  }
  const exercises = Object.values(Exercise);

  if (!values.every((value) => exercises.includes(value as ExerciseType))) {
    return createMessage(FIELD_VALUE_TYPE_ERROR, [exercises.join(',')]);
  }

  if (values.length > EXERCISE_MAX_LENGTH) {
    return EXERCISE_MAX_LENGTH_ERROR;
  }

  return null;
};

const validator: ValidatorType = {
  name: (value) => validateValue(value, NameLength.Min, NameLength.Max),
  email: validateEmail,
  password: (value) => validateValue(value, PasswordLength.Min, PasswordLength.Max),
  title: (value) => validateValue(value, NameLength.Min, NameLength.Max),
  price: validatePrice,
  description: (value) => validateValue(value, DescriptionLength.Min, DescriptionLength.Max, false),
  type: (value) => validateValueType(value, Exercise),
  gender: (value) => validateValueType(value, Gender),
  role: (value) => validateValueType(value, Role),
  station: (value) => validateValueType(value, Station),
  fitnessLevel: (value) => validateValueType(value, FitnessLevel),
  trainingTime: (value) => validateValueType(value, TrainingTime),
  caloriesLose: (value) => validateCalories(value, CaloriesRange.Min, CaloriesRange.Max),
  caloriesWaste: (value) => validateCalories(value, CaloriesRange.Min, CaloriesRange.Max),
  experience: (value) => validateValue(value, ExperienceLength.Min, ExperienceLength.Max),
  content: (value) => validateValue(value, ContentLength.Min, ContentLength.Max)
};

export const validateFields = <T extends object>(fields: T): Partial<Record<keyof T, string>> | null => {
  const newError: Partial<Record<keyof T, string>> = {};
  Object.entries(fields).forEach(([key, value]: [string, string]) => {
    if (key === AttributeName.EXERCISES && Array.isArray(value)) {
      const result = validateExercises(value);

      if(result) {
        newError[key as keyof T] = result;
      }
    }

    const validate = validator[key];

    if (validate) {
      const result = validate(value);

      if(result) {
        newError[key as keyof T] = result;
      }
    }
  });

  if (Object.keys(newError).length) {
    return newError;
  }

  return null;
};
