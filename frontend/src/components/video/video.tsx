import classNames from 'classnames';
import {STATIC_BASE_PATH} from '../../libs/shared/constants';
import {TrainingType} from '../../libs/shared/types';
import {Picture} from '../picture';

type VideoProps = {
  training: TrainingType;
  isPlaying: boolean;
  isVideoDisabled: boolean;
  onPlayClick: () => void;
}

export const Video = ({training, isPlaying, isVideoDisabled, onPlayClick}: VideoProps) => (
  <div className="training-video__video">
    <div className="training-video__thumbnail">
      {
        isPlaying ?
          <video
            controls
            autoPlay
            muted
            width={922}
            height={566}
            onEnded={onPlayClick}
          >
            <source src={`${STATIC_BASE_PATH}/${training.video}`}/>
          </video> :
          <Picture
            width={922}
            height={566}
            alt='Обложка видео'
            image={training.background}
          />
      }
    </div>
    {!isPlaying &&
      <button
        className={classNames('training-video__play-button btn-reset', {'is-disabled': isVideoDisabled})}
        onClick={onPlayClick}
      >
        <svg width="18" height="30" aria-hidden="true">
          <use xlinkHref="#icon-arrow"></use>
        </svg>
      </button>}
  </div>
);
