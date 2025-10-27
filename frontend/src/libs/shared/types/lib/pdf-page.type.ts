import {PageViewport, PDFPageProxy} from 'pdfjs-dist';

export type PDFPageType = {
  id: string;
  qualificationId: string;
  page: PDFPageProxy;
  pageNumber: number;
  viewport: PageViewport;
}
