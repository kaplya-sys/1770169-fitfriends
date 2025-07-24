import { PicturePropsType } from './picture-props.type';

export const Picture = ({ image, width, height, alt }: PicturePropsType) => (
  <picture>
    <source type="image/webp" srcSet={ `${ image.webp.hashName }, ${ image.webp2x.hashName } 2x` } />
    <img
      src={ image.file.hashName }
      srcSet={ `${ image.file2x.hashName } 2x` }
      width={ width }
      height={ height }
      alt={ alt }
    />
  </picture>
);
