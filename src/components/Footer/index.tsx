import './style.less';

const Index = () => {
  return (
    <div className="footer">
      <div className="container">
        <div className="footer-left">
          <div className="footer-item">
            <span>缇尔蒂 · 索拉</span>
          </div>
          <div className="footer-item">
            <span className="footer-fflink">暂无友情链接</span>
          </div>
        </div>
        <div className="footer-right">
          <div className="footer-item">
            <span>Magic & Mana</span>
          </div>
          <div className="footer-item">
            <span>
              {'Made with ❤ by '}
              <a
                href="https://tilty.mahoutsukai.cn/"
                target="_blank"
                rel="noreferrer"
              >
                Tilty Sola
              </a>
              {'.'}
            </span>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="footer-icp">
          <span>Copyright 2023, All rights reserved.</span>
          <span>
            Tilty Sola,{' '}
            <a
              href="https://beian.miit.gov.cn/"
              target="_blank"
              rel="noreferrer"
            >
              #ICP
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Index;
