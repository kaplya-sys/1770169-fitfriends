import {TrainingCard} from '../training-card';
import {TrainingType} from '../../libs/shared/types';

type TrainingListPropsType = {
  trainings: TrainingType[];
  className: string;
}

export const TrainingList = ({trainings, className}: TrainingListPropsType) => (
  <ul className={`${className}__list`}>
    {
      trainings.map((training) => (
        <TrainingCard training={training} className={`${className}__item`} key={training.id}/>
      ))
    }
  </ul>
);
