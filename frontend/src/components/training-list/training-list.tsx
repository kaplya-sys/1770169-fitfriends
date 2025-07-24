import { TrainingCard } from '../training-card';
import { TrainingListPropsType } from './training-list-props.type';

export const TrainingList = ({ trainings }: TrainingListPropsType) => (
  <ul className="training-catalog__list">
    {
      trainings.map((training) => (
        <TrainingCard training={ training } className='training-catalog__item' key={ training.id } />
      ))
    }
  </ul>
);
