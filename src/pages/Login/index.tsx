import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import qs from 'query-string';
import { useRecoilState } from 'recoil';

import userStateRecoil from '@/store/user';

import Page from '@/components/Page';
import Section from '@/components/Section';

import './style.less';

const Index = () => {
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const [userState, setUserState] = useRecoilState(userStateRecoil);

  const { redirect } = qs.parse(location.search);

  const navigate = useNavigate();

  const handleLogin = () => {
    axios
      .post('/api/auth/login', {
        account,
        password,
      })
      .then(() => {
        axios.get('/api/user/profile').then((res) => {
          setUserState(res.data);
        });
      });
  };

  const handleRegister = () => {
    navigate('/register');
  };

  const handleRecovery = () => {
    navigate('/recovery');
  };

  useEffect(() => {
    if (userState) {
      if (redirect) {
        window.location.href =
          typeof redirect === 'string' ? redirect : redirect[0] || '#';
      } else {
        navigate('/usercenter');
      }
    }
  }, [userState]);

  return (
    <Page className="login" title="登录">
      <Section>
        <div className="form">
          <div className="form-control">
            <div className="form-label">
              <span>邮箱/昵称</span>
            </div>
            <input
              value={account}
              onChange={(e) => {
                setAccount(e.target.value);
              }}
            />
          </div>
          <div className="form-control">
            <div className="form-label">
              <span>密码</span>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div className="form-button-group">
            <button className="button button-form" onClick={handleLogin}>
              登入
            </button>
            <button className="button button-form" onClick={handleRegister}>
              注册账户
            </button>
            <button
              className="button button-link-dark"
              onClick={handleRecovery}
            >
              找回密码
            </button>
          </div>
        </div>
      </Section>
    </Page>
  );
};

export default Index;
