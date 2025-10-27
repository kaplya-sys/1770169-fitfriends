import classNames from 'classnames';

import {TrainingCard} from '../training-card';
import {TrainingType} from '../../libs/shared/types';

type TrainingListPropsType = {
  className: string;
  trainings: TrainingType[];
}

export const TrainingList = ({className, trainings}: TrainingListPropsType) => (
  <ul className={classNames({
    [`${className}__list`]: !className.includes('__'),
    [`${className}-list`]: className.includes('__'),
  })}
  >
    {
      trainings.map((training) => (
        <TrainingCard
          className={classNames({
            [`${className}__item`]: !className.includes('__'),
            [`${className}-item`]: className.includes('__'),
          })}
          training={training}
          key={training.id}
        />
      ))
    }
  </ul>
);
