import {STATIC_BASE_PATH} from '../../libs/shared/constants';
import {ImageType} from '../../libs/shared/types';

type PictureProps = {
  width: number;
  height: number;
  alt: string;
  image?: ImageType;
}

export const Picture = ({image, width, height, alt}: PictureProps) => (
  <picture>
    <source
      type="image/webp"
      srcSet={`${STATIC_BASE_PATH}/${image?.imageWebp}, ${STATIC_BASE_PATH}/${image?.imageWebp2x} 2x`}
    />
    <img
      src={`${STATIC_BASE_PATH}/${image?.image}`}
      srcSet={`${STATIC_BASE_PATH}/${image?.image2x} 2x`}
      width={width}
      height={height}
      alt={alt}
    />
  </picture>
);
