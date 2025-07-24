export type PromoSliderProps = {
  blockClassName: string;
  promotions: Promo[];
}

export type Promo = {
  id: string;
  title: string;
  image: string;
  image2x: string;
  promoText: string;
  oldPrice: number;
  newPrice: number;
  dotLabel: string;
}
