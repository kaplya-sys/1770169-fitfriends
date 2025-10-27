import {useEffect, useRef} from 'react';

import {PDFPageType} from '../../libs/shared/types';

import './pdf-viewer.css';

type PDFViewerPropsType = {
  pdfPage: PDFPageType;
  width: number;
  height: number;
};

export const PDFViewer = ({pdfPage, width, height}: PDFViewerPropsType) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const renderTaskRef = useRef<ReturnType<PDFPageType['page']['render']> | null>(null);

  useEffect(() => {
    const renderPage = async () => {
      if (!canvasRef.current) {
        return;
      }
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      if (!context) {
        return;
      }
      context.clearRect(0, 0, canvas.width, canvas.height);
      const pageWidth = pdfPage.viewport.width;
      const pageHeight = pdfPage.viewport.height;
      const scaleX = width / pageWidth;
      const scaleY = height / pageHeight;
      const scale = Math.min(scaleX, scaleY);
      const viewport = pdfPage.page.getViewport({scale});

      if (renderTaskRef.current) {
        renderTaskRef.current.cancel();
      }

      try {
        renderTaskRef.current = pdfPage.page.render({
          canvasContext: context,
          canvas,
          viewport
        });
        await renderTaskRef.current.promise;
      } catch (err: unknown) {
        if (err instanceof Error && err.name === 'RenderingCancelledException') {
          return;
        }
      } finally {
        renderTaskRef.current = null;
      }
    };

    renderPage();

    return () => {
      if (renderTaskRef.current) {
        renderTaskRef.current.cancel();
        renderTaskRef.current = null;
      }
    };
  }, [pdfPage, height, width]);

  return <canvas className="page-img" width={width} height={height} ref={canvasRef}/>;
};
