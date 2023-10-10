import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import axios from 'axios';
import classNames from 'classnames';
import cookies from 'js-cookie';
import qs from 'query-string';
import { useRecoilState } from 'recoil';

import userStateRecoil from '@/store/user';

import './style.less';

const Index = () => {
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
  const [userState, setUserState] = useRecoilState(userStateRecoil);

  const navigate = useNavigate();
  const location = useLocation();

  const params = qs.parse(location.search);

  if (params.accessToken) {
    cookies.set('accessToken', params.accessToken);
    delete params.accessToken;
    window.location.search = qs.stringify(params);
  }

  const handleIndex = () => {
    navigate('/');
  };

  const handleUsercenter = () => {
    navigate('/usercenter');
  };

  const handleLogout = () => {
    axios.post('/api/user/logout').then(() => {
      setUserState(null);
    });
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleRegister = () => {
    navigate('/register');
  };

  const handleMobileMenu = () => {
    setMobileMenuVisible(!mobileMenuVisible);
  };

  useEffect(() => {
    axios
      .get('/api/user/profile')
      .then((res) => {
        setUserState(res.data);
      })
      .catch(() => {
        setUserState(undefined);
      });
  }, []);

  return (
    <>
      <div
        className={classNames(
          'header',
          userState ? 'header-logged' : 'header-nologin',
        )}
      >
        <div className="container">
          <div className="header-left">
            <div className="header-item header-item-logo" onClick={handleIndex}>
              <img
                className="header-logo"
                src="/images/bop-logo.png"
              />
            </div>
            {userState && (
              <div className="header-item header-menu-h5">
                <button
                  className="button button-link"
                  onClick={handleMobileMenu}
                >
                  菜单
                </button>
              </div>
            )}
          </div>
          {userState ? (
            <div
              className={classNames('header-right header-logged', {
                toggle: !mobileMenuVisible,
              })}
            >
              <div className="header-item">
                <button
                  className="button button-link"
                  onClick={handleUsercenter}
                >
                  {userState.email}
                </button>
              </div>
              <div className="header-item">
                <button className="button button-link" onClick={handleLogout}>
                  注销账户
                </button>
              </div>
            </div>
          ) : (
            <div className="header-right header-nologin">
              <div className="header-item">
                <button className="button button-link" onClick={handleLogin}>
                  登录
                </button>
              </div>
              <div className="header-item">
                <button
                  className="button button-default"
                  onClick={handleRegister}
                >
                  新增账户
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="header-stream" />
    </>
  );
};

export default Index;
