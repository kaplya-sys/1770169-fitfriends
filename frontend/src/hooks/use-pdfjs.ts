import {useEffect, useState} from 'react';
import {getDocument, GlobalWorkerOptions, version} from 'pdfjs-dist';

import {PDFPageType, QualificationType} from '../libs/shared/types';

GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${version}/build/pdf.worker.min.mjs`;

export const usePDFJS = (qualifications: QualificationType[] | undefined) => {
  const [allPages, setAllPages] = useState<PDFPageType[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const loadPDF = async () => {
      if (!qualifications?.length) {
        setAllPages([]);
        return;
      }
      const pages: PDFPageType[] = [];

      try {
        for (const qualification of qualifications) {
          const pdf = await getDocument(qualification.path).promise;

          for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const viewport = page.getViewport({scale: 1.0});
            pages.push({
              id: `${qualification.id}-${i}`,
              qualificationId: qualification.id,
              page,
              pageNumber: i,
              viewport: viewport.clone()
            });
          }
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        }
      }

      setAllPages(pages);
    };

    loadPDF();
  }, [qualifications]);

  return {allPages, error};
};
