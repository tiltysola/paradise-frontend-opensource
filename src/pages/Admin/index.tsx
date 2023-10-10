import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { useUpdateEffect } from 'ahooks';
import classNames from 'classnames';
import { useRecoilState } from 'recoil';

import userStateRecoil from '@/store/user';

import Page from '@/components/Page';
import Section from '@/components/Section';

import './style.less';

const menu = [
  {
    title: '首页',
    link: '/admin',
  },
  {
    title: '用户管理',
    link: '/admin/user',
  },
];

const Index = () => {
  const [userState] = useRecoilState(userStateRecoil);

  const location = useLocation();
  const navigate = useNavigate();

  useUpdateEffect(() => {
    if (!userState) {
      navigate('/');
    }
  }, [userState]);

  return (
    <Page className="admin" title="管理中心">
      <Section className="admin-nav">
        <ul className="admin-nav-list">
          {menu.map((v) => (
            <li
              className={classNames('admin-nav-item', {
                active: location.pathname === v.link,
              })}
              onClick={() => {
                navigate(v.link);
              }}
            >
              <span>{v.title}</span>
            </li>
          ))}
        </ul>
      </Section>
      <Outlet />
    </Page>
  );
};

export default Index;
