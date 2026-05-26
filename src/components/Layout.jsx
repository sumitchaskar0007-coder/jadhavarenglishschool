import { HelmetProvider } from 'react-helmet-async';
import Header from './Header';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';

const Layout = ({ children }) => {
  return (
    <HelmetProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow pt-14 sm:pt-16">
          {children}
        </main>
        <Footer />
        <ScrollToTop />
      </div>
    </HelmetProvider>
  );
};

export default Layout;

