import { Link } from 'react-router-dom';

import { PreviewCardProps } from './preview-card-props.type';

export const PreviewCard = ({ className, training }: PreviewCardProps) => (
  <li className={ className }>
    <div className="thumbnail-preview">
      <div className="thumbnail-preview__image">
        <picture>
          <source type="image/webp" srcSet="img/content/thumbnails/preview-03.webp, img/content/thumbnails/preview-03@2x.webp 2x" />
          <img src="img/content/thumbnails/preview-03.jpg" srcSet="img/content/thumbnails/preview-03@2x.jpg 2x" width="452" height="191" alt="" />
        </picture>
      </div>
      <div className="thumbnail-preview__inner">
        <h3 className="thumbnail-preview__title">{ training.type }</h3>
        <div className="thumbnail-preview__button-wrapper">
          <Link className="btn btn--small thumbnail-preview__button" to={ `/trainings/${ training.id }` }>Подробнее</Link>
        </div>
      </div>
    </div>
  </li>
);
