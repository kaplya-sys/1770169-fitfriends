import { LayoutProps } from './layout-props.type';
import { Header } from '../header';

export const Layout = ({ children }: LayoutProps) => (
  <div className='wrapper'>
    <Header />
    <main>
      { children }
    </main>
  </div>
);
