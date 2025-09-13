import {useEffect, useRef} from 'react';
import Swiper from 'swiper';
import {Navigation} from 'swiper/modules';

export const useSlider = (isInitialized: boolean) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const buttonNextRef = useRef<HTMLButtonElement>(null);
  const buttonPrevRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isInitialized || !sliderRef.current) {
      return;
    }
    sliderRef.current.classList.add('swiper');
    sliderRef.current.style.overflow = 'hidden';

    const swiper: Swiper = new Swiper(sliderRef.current, {
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
          slidesPerView: 4
        }
      },
      navigation: {
        nextEl: buttonNextRef.current,
        prevEl: buttonPrevRef.current
      }
    });

    return () => {
      swiper.destroy();
    };
  }, [isInitialized]);

  return {sliderRef, buttonNextRef, buttonPrevRef};
};
