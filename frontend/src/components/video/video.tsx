import {STATIC_BASE_PATH} from '../../libs/shared/constants';
import {TrainingType} from '../../libs/shared/types';
import {Picture} from '../picture';

type VideoProps = {
  training: TrainingType;
  isPlaying: boolean;
  onPlayClick: () => void;
}

export const Video = ({training, isPlaying, onPlayClick}: VideoProps) => (
  <div className="training-video">
    <h2 className="training-video__title">Видео</h2>
    <div className="training-video__video">
      <div className="training-video__thumbnail">
        {
          isPlaying ?
            <video controls width="922" height={566}>
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
        <button className="training-video__play-button btn-reset" onClick={onPlayClick}>
          <svg width="18" height="30" aria-hidden="true">
            <use xlinkHref="#icon-arrow"></use>
          </svg>
        </button>}
    </div>
    <div className="training-video__buttons-wrapper">
      {isPlaying ?
        <button
          className="btn training-video__button training-video__button--stop"
          onClick={onPlayClick}
          type="button"
        >
            Закончить
        </button> :
        <button
          className="btn training-video__button training-video__button--start"
          type="button"
          onClick={onPlayClick}
        >
          Приступить
        </button>}
    </div>
  </div>
);
