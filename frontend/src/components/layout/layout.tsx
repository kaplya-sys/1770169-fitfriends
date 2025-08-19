import { PropsWithChildren } from 'react';

import {Header} from '../header';

type LayoutProps = PropsWithChildren

export const Layout = ({children}: LayoutProps) => (
  <div className='wrapper'>
    <Header />
    <main>
      {children}
    </main>
  </div>
);
