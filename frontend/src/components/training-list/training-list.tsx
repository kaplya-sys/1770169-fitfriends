import {TrainingCard} from '../training-card';
import {TrainingType} from '../../libs/shared/types';

type TrainingListPropsType = {
  trainings: TrainingType[];
}

export const TrainingList = ({trainings}: TrainingListPropsType) => (
  <ul className="training-catalog__list">
    {
      trainings.map((training) => (
        <TrainingCard training={training} className='training-catalog__item' key={training.id} />
      ))
    }
  </ul>
);
