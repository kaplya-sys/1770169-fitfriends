type StubGumPropsType = {
  title?: string;
}

export const StubGum = ({title = 'Скоро здесь появится что - то полезное'}: StubGumPropsType) => (
  <div className="thumbnail-spec-gym">
    <div className="thumbnail-spec-gym__image">
      <picture>
        <source type="image/webp" srcSet="/img/content/thumbnails/nearest-gym-01.webp, /img/content/thumbnails/nearest-gym-01@2x.webp 2x"/>
        <img src="/img/content/thumbnails/nearest-gym-01.jpg" srcSet="/img/content/thumbnails/nearest-gym-01@2x.jpg 2x" width="330" height="190" alt=""/>
      </picture>
    </div>
    {/*<p className="thumbnail-spec-gym__type">Ближайший зал</p>*/}
    <div className="thumbnail-spec-gym__header" style={{textAlign: 'center'}}>
      <h3 className="thumbnail-spec-gym__title">{title}</h3>
    </div>
  </div>
);
