import { ImageLoadProps } from './image-load-props.type';

export const ImageLoad = ({ blockClassName, onFileChange }: ImageLoadProps) => (
  <div className={ `${ blockClassName }__load-photo` }>
    <div className="input-load-avatar">
      <label>
        <input
          className="visually-hidden"
          type="file" accept="image/png, image/jpeg"
          onChange={ onFileChange }
        />
        <span className="input-load-avatar__btn">
          <svg width="20" height="20" aria-hidden="true">
            <use xlinkHref="#icon-import"></use>
          </svg>
        </span>
      </label>
    </div>
    <div className={ `${ blockClassName }__description` }>
      <h2 className={ `${ blockClassName }__legend` }>Загрузите фото профиля</h2>
      <span className={ `${ blockClassName }__text` }>JPG, PNG, оптимальный размер 100&times;100&nbsp;px</span>
    </div>
  </div>
);
