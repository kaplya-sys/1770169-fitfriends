import {useEffect, useRef} from 'react';
import Swiper from 'swiper';
import {Navigation} from 'swiper/modules';

export const useSlider = (elementsCount: number, perView = 1, perGroup = 1, direction: 'horizontal' | 'vertical' = 'horizontal', spaceBetween = 20) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const buttonNextRef = useRef<HTMLButtonElement>(null);
  const buttonPrevRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!elementsCount || !sliderRef.current) {
      return;
    }
    sliderRef.current.classList.add('swiper');
    sliderRef.current.style.overflow = 'hidden';
    const listCollection = sliderRef.current.getElementsByTagName('ul');
    const itemCollection = sliderRef.current.getElementsByTagName('li');
    listCollection[0].classList.add('swiper-wrapper');

    for (const item of itemCollection) {
      item.classList.add('swiper-slide');
    }

    const swiper: Swiper = new Swiper(sliderRef.current, {
      modules: [Navigation],
      speed: 400,
      spaceBetween,
      slidesPerView: perView,
      slidesPerGroup: perGroup,
      direction,
      navigation: {
        nextEl: buttonNextRef.current,
        prevEl: buttonPrevRef.current
      }
    });

    return () => {
      swiper.destroy();
    };
  }, [elementsCount, perView, perGroup, spaceBetween]);

  return {sliderRef, buttonNextRef, buttonPrevRef};
};
