import {TrainingCard} from '../training-card';
import {TrainingType} from '../../libs/shared/types';
import classNames from 'classnames';

type TrainingListPropsType = {
  className: string;
  trainings: TrainingType[];
  isWithSlider?: boolean;
}

export const TrainingList = ({className, trainings, isWithSlider = false}: TrainingListPropsType) => (
  <ul className={classNames({
    [`${className}__list`]: !className.includes('__'),
    [`${className}-list`]: className.includes('__'),
    'swiper-wrapper': isWithSlider
  })}
  >
    {
      trainings.map((training) => (
        <TrainingCard
          className={classNames({
            [`${className}__item`]: !className.includes('__'),
            [`${className}-item`]: className.includes('__'),
            'swiper-slide': isWithSlider
          })}
          training={training}
          key={training.id}
        />
      ))
    }
  </ul>
);
