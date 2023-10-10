import Section from '@/components/Section';

import './style.less';

const Index = () => {
  return (
    <Section className="index-special">
      <div className="index-special-title">
        <span>认证服务器特色</span>
      </div>
      <div className="index-special-item">
        <div className="index-special-item-grid">
          <span className="index-special-item-grid-title">登入系统</span>
          <span className="index-special-item-grid-content">
            基于Yggdrasil的认证系统，安全可靠。
          </span>
        </div>
        <div className="index-special-item-grid">
          <img style={{ display: 'none' }} src="#" />
        </div>
      </div>
      <div className="index-special-item">
        <div className="index-special-item-grid">
          <span className="index-special-item-grid-title">角色系统</span>
          <span className="index-special-item-grid-content">
            便捷的角色创建与管理系统，即使修改昵称也不会导致游戏资料重置。
          </span>
        </div>
        <div className="index-special-item-grid">
          <img style={{ display: 'none' }} src="#" />
        </div>
      </div>
      <div className="index-special-item">
        <div className="index-special-item-grid">
          <span className="index-special-item-grid-title">
            皮肤{'&'}披风系统
          </span>
          <span className="index-special-item-grid-content">
            自由的皮肤{'&'}披风上传功能，随时随地切换自己心仪的皮肤！
          </span>
        </div>
        <div className="index-special-item-grid">
          <img style={{ display: 'none' }} src="#" />
        </div>
      </div>
    </Section>
  );
};

export default Index;
