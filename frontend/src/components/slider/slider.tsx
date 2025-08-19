import {PropsWithChildren, useEffect, useRef} from 'react';
import Swiper from 'swiper';
import {Navigation} from 'swiper/modules';

type SliderProps = PropsWithChildren<{
  title: string;
  blockClassName: string;
}>

export const Slider = ({title, blockClassName, children}: SliderProps) => {
  const swiperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!swiperRef.current) {
      return;
    }
    const swiper: Swiper = new Swiper(swiperRef.current, {
      modules: [Navigation],
      speed: 400,
      spaceBetween: 20,
      breakpoints: {
        320: {
          slidesPerView: 1
        },
        768: {
          slidesPerView: 2
        },
        1024: {
          slidesPerView: 3
        }
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }
    });

    return () => {
      swiper.destroy();
    };
  }, []);

  return (
    <div className={`${blockClassName}__wrapper swiper`} ref={swiperRef}>
      <div className={`${blockClassName}__title-wrapper`}>
        <h2 className={`${blockClassName}__title`}>{title}</h2>
        <div className={`${blockClassName}__controls`}>
          <button className={`btn-icon ${blockClassName}__control swiper-button-prev`} type="button" aria-label="previous">
            <svg width="16" height="14" aria-hidden="true">
              <use xlinkHref="#arrow-left"></use>
            </svg>
          </button>
          <button className={`btn-icon ${blockClassName}__control swiper-button-next`} type="button" aria-label="next">
            <svg width="16" height="14" aria-hidden="true">
              <use xlinkHref="#arrow-right"></use>
            </svg>
          </button>
        </div>
      </div>
      <ul className={`${blockClassName}__list swiper-wrapper`} style={{overflow: 'hidden'}}>
        {children}
      </ul>
    </div>
  );
};
