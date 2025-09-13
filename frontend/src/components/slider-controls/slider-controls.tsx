import {RefObject} from 'react';
import classNames from 'classnames';

type SliderControlsPropsType = {
  className: string;
  prevRef: RefObject<HTMLButtonElement>;
  nextRef: RefObject<HTMLButtonElement>;
  isOutlined?: boolean;
}

export const SliderControls = ({className, prevRef, nextRef, isOutlined = false}: SliderControlsPropsType) => (
  <div className={`${className}__controls`}>
    <button
      className={classNames(`btn-icon ${className}__control`, {'btn-icon--outlined': isOutlined})}
      type="button"
      aria-label="previous"
      ref={prevRef}
    >
      <svg width="16" height="14" aria-hidden="true">
        <use xlinkHref="#arrow-left"></use>
      </svg>
    </button>
    <button
      className={classNames(`btn-icon ${className}__control`, {'btn-icon--outlined': isOutlined})}
      type="button"
      aria-label="next"
      ref={nextRef}
    >
      <svg width="16" height="14" aria-hidden="true">
        <use xlinkHref="#arrow-right"></use>
      </svg>
    </button>
  </div>
);
