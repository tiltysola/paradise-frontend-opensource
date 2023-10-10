import dayjs from 'dayjs';

import Section from '@/components/Section';

import './style.less';

const Index = () => {
  const greeting = () => {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 12) {
      return '早上好';
    } else if (hour >= 12 && hour < 14) {
      return '中午好';
    } else if (hour >= 14 && hour < 18) {
      return '下午好';
    } else if (hour >= 18 && hour < 24) {
      return '晚上好';
    } else {
      return '午夜好';
    }
  };

  return (
    <Section className="admin-index">
      <div className="admin-index-item">
        <span>尊敬的管理员，{greeting()}！</span>
      </div>
      <div className="admin-index-item">
        <span>当前时间：{dayjs().format('ddd MMM YYYY HH:mm:ss [GMT]ZZ')}</span>
      </div>
    </Section>
  );
};

export default Index;
