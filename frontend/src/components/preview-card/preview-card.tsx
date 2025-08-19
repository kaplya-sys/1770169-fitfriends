import {Link} from 'react-router-dom';

import {TrainingType} from '../../libs/shared/types';
import {Picture} from '../picture';

type PreviewCardProps = {
  className: string;
  training: TrainingType;
}

export const PreviewCard = ({className, training}: PreviewCardProps) => (
  <li className={className}>
    <div className="thumbnail-preview">
      <div className="thumbnail-preview__image">
        <Picture
          width={452}
          height={191}
          alt=''
          image={training.background}
        />
      </div>
      <div className="thumbnail-preview__inner">
        <h3 className="thumbnail-preview__title">{training.type}</h3>
        <div className="thumbnail-preview__button-wrapper">
          <Link className="btn btn--small thumbnail-preview__button" to={`/trainings/${training.id}`}>Подробнее</Link>
        </div>
      </div>
    </div>
  </li>
);
