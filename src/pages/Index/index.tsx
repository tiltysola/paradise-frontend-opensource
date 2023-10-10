import Page from '@/components/Page';

import Special from './Special';

import './style.less';

const Index = () => {
  return (
    <Page
      className="index"
      title={
        <img
          className="index-logo"
          src="/images/bop-logo.png"
        />
      }
      withoutBg
    >
      <Special />
    </Page>
  );
};

export default Index;
