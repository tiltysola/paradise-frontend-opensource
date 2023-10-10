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
    title: '个人资料',
    link: '/usercenter',
  },
  {
    title: '角色管理',
    link: '/usercenter/character',
  },
  {
    title: '材质管理',
    link: '/usercenter/texture',
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
    <Page className="usercenter" title="用户中心">
      <Section className="usercenter-nav">
        <ul className="usercenter-nav-list">
          {menu.map((v) => (
            <li
              className={classNames('usercenter-nav-item', {
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
