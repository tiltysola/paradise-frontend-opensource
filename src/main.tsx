import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { RecoilRoot } from 'recoil';

import Router from '@/router';

import Message, { message } from '@/components/Message';

import '@/scripts/axios';
import '@/global.less';
import '@/bopui/index.less';

const root = document.getElementById('app');

window.onunhandledrejection = (event) => {
  message.show({
    content: event.reason,
  });
};

window.onload = () => {
  root &&
    ReactDOM.createRoot(root).render(
      <React.StrictMode>
        <RecoilRoot>
          <BrowserRouter>
            <Router />
          </BrowserRouter>
          <Message />
        </RecoilRoot>
      </React.StrictMode>,
    );
};
