import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import Footer from '../Footer';
import Header from '../Header';

import './style.less';

const Index = () => {
  useEffect(() => {
    const resizeEvent = () => {
      const doc = document.documentElement;
      doc?.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
    };
    resizeEvent();
    window.addEventListener('resize', resizeEvent);
    return () => {
      window.removeEventListener('resize', resizeEvent);
    };
  }, []);

  return (
    <div className="layout">
      <div className="background" />
      <Header />
      <div className="layout-content">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Index;
