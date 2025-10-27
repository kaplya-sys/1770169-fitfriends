import {PayloadAction} from '@reduxjs/toolkit';
import {PDFDocument} from 'pdf-lib';

import {
  ErrorRequestType,
  PDFPageType,
  PromoTraining,
  PromoType,
  QualificationType,
  RedirectPayloadType,
  TrainingType
} from '../../types';
import {
  NO_FOUND_PARAM_ERROR,
  PDF_NO_FOUND_ERROR,
  PDF_REMOVE_ERROR,
  PDF_UPDATE_ERROR, REGEX
} from './helpers.constant';

export const isRedirectAction = (action: unknown): action is PayloadAction<RedirectPayloadType> =>
  action !== null
    && typeof action === 'object'
    && 'type' in action
    && 'payload' in action;

export const getRouteWithParam = <T extends string>(route: T, param: Record<string, string | number | undefined>): T => {
  let path: T = route;

  for (const [key, value] of Object.entries(param)) {
    if (!value) {
      throw new Error(NO_FOUND_PARAM_ERROR);
    }
    path = path.replace(`:${key}`, value.toString()) as T;
  }

  return path;
};

export const addPromo = (trainings: TrainingType[], promotions: PromoType[]): PromoTraining[] => {
  const promoMap = new Map<string, PromoType>(
    promotions.map((promo) => [promo.trainingId, promo])
  );
  const promoTrainings = trainings.filter((training) => promoMap.has(training.id));

  return promoTrainings.map((promoTraining) => {
    const promo = promoMap.get(promoTraining.id) as PromoType;

    return {...promoTraining, promoText: promo.promoText, oldPrice: getPriceWithoutDiscount(promoTraining.price), image: promo.image};
  });
};

export const createMessage = <T>(message: string, expressions: T[] = []): string => {
  if (!expressions.length) {
    return message.replace(REGEX, '').trim();
  }

  return expressions.reduce((accumulator: string, currentValue: T) => accumulator.replace(REGEX, String(currentValue)), message);
};

export const getWeekCalculation = (value: number | undefined): number => value ? value * 7 : 0;

export const formatNumber = (value = 0, locale = 'ru-Ru'): string => Intl.NumberFormat(locale).format(value);

export const isEscape = (key: string): boolean => key === 'Escape';

export const getPriceWithDiscount = (price: number, discount = 10): number => price - (price * discount / 100);

export const getPriceWithoutDiscount = (price: number, discount = 10): number => price * 100 / (100 - discount);

export const getUint8ArrayFromUrl = async(url: string) => {
  const response = await fetch(url);
  return response.arrayBuffer();
};

export const removePDFPage = async (qualifications: QualificationType[], page: PDFPageType) => {
  try {
    const pdfFile = qualifications.find((qualification) => qualification.id === page.qualificationId);

    if (!pdfFile) {
      throw new Error(PDF_NO_FOUND_ERROR);
    }
    const response = await fetch(pdfFile.path);
    const arrayBuffer = await response.arrayBuffer();
    const pdfDocument = await PDFDocument.load(arrayBuffer);
    const pages = pdfDocument.getPages();

    if (pages.length <= 1) {
      return;
    }
    const newPDFDocument = await PDFDocument.create();

    for (let i = 0; i < pages.length; i++) {
      if (page.pageNumber !== (i + 1)) {
        const [copiedPage] = await newPDFDocument.copyPages(pdfDocument, [i]);
        newPDFDocument.addPage(copiedPage);
      }
    }

    const pdfBytes = await newPDFDocument.save();

    return new Blob([pdfBytes as unknown as ArrayBuffer], {type: 'application/pdf'});
  } catch (err: unknown) {
    if (err instanceof Error) {
      return err;
    }

    return new Error(PDF_REMOVE_ERROR);
  }
};

export const updatePDFPage = async (qualifications: QualificationType[], page: PDFPageType, file: File) => {
  try {
    const pdfFile = qualifications.find((qualification) => qualification.id === page.qualificationId);

    if (!pdfFile) {
      throw new Error(PDF_NO_FOUND_ERROR);
    }
    const response = await fetch(pdfFile.path);
    const arrayBuffer = await response.arrayBuffer();
    const pdfDocument = await PDFDocument.load(arrayBuffer);
    const pages = pdfDocument.getPages();
    const newPDFDocument = await PDFDocument.create();

    for (let i = 0; i < pages.length; i++) {
      if (page.pageNumber !== (i + 1)) {
        const [copiedPage] = await newPDFDocument.copyPages(pdfDocument, [i]);
        newPDFDocument.addPage(copiedPage);
      } else {
        const fileArrayBuffer = await file.arrayBuffer();
        const fileDocument = await PDFDocument.load(fileArrayBuffer);
        const [copiedPage] = await newPDFDocument.copyPages(fileDocument, [0]);
        newPDFDocument.addPage(copiedPage);
      }
    }

    const pdfBytes = await newPDFDocument.save();

    return new Blob([pdfBytes as unknown as ArrayBuffer], {type: 'application/pdf'});
  } catch (err: unknown) {
    if (err instanceof Error) {
      return err;
    }

    return new Error(PDF_UPDATE_ERROR);
  }
};

export const isErrorObject = (error: string | ErrorRequestType | null | undefined): error is ErrorRequestType => (
  error !== null && typeof error === 'object' && Object.hasOwn(error, 'message') && Object.hasOwn(error, 'statusCode')
);
