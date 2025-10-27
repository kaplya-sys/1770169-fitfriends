export type PromoType = {
    trainingId: string;
    promoText: string;
    oldPrice?: number;
    image: {
      file: string;
      file2x: string;
    };
}
