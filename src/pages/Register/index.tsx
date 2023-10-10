import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useInterval } from 'ahooks';
import axios from 'axios';
import qs from 'query-string';
import { useRecoilState } from 'recoil';

import userStateRecoil from '@/store/user';

import { message } from '@/components/Message';
import Page from '@/components/Page';
import Section from '@/components/Section';

import './style.less';

const Index = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [emailCode, setEmailCode] = useState('');
  const [countdown, setCountdown] = useState<number>(0);
  const [userState, setUserState] = useRecoilState(userStateRecoil);

  const { redirect } = qs.parse(location.search);

  const navigate = useNavigate();

  const onVerify = () => {
    if (countdown === 0) {
      axios
        .post('/api/auth/acquire/mail', {
          email,
        })
        .then(() => {
          setCountdown(60);
        })
        .catch((err) => {
          message.show(err.toString());
          setCountdown(0);
        });
    } else {
      message.show({
        content: '请稍后重试！',
      });
    }
  };

  const handleLogin = () => {
    navigate('/');
  };

  const handleRegisterConfirmed = () => {
    if (password === rePassword) {
      axios
        .post('/api/auth/register', {
          email,
          username,
          password,
          emailCode,
        })
        .then(() => {
          axios.get('/api/user/profile').then((res) => {
            setUserState(res.data);
          });
        });
    } else {
      message.show({
        content: '两次密码输入不一致！',
      });
    }
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

  useInterval(() => {
    if (countdown > 0) {
      setCountdown(countdown - 1);
    }
  }, 1000);

  return (
    <Page className="register" title="注册账户">
      <Section>
        <div className="form">
          <div className="form-control">
            <div className="form-label">
              <span>邮箱</span>
            </div>
            <input
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="form-control">
            <div className="form-label">
              <span>昵称</span>
            </div>
            <input
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
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
          <div className="form-control">
            <div className="form-label">
              <span>确认密码</span>
            </div>
            <input
              type="password"
              value={rePassword}
              onChange={(e) => {
                setRePassword(e.target.value);
              }}
            />
          </div>
          <div className="form-control">
            <div className="form-label">
              <span>验证码</span>
            </div>
            <input
              value={emailCode}
              onChange={(e) => {
                setEmailCode(e.target.value);
              }}
            />
            {countdown > 0 ? (
              <button className="button button-link-dark form-acquire-code">
                获取验证码 ({countdown})
              </button>
            ) : (
              <button
                className="button button-link-dark form-acquire-code"
                onClick={onVerify}
              >
                获取验证码
              </button>
            )}
          </div>
          <div className="form-button-group">
            <button className="button button-form" onClick={handleRegisterConfirmed}>
              注册账户
            </button>
            <button className="button button-form" onClick={handleLogin}>
              返回
            </button>
          </div>
        </div>
      </Section>
    </Page>
  );
};

export default Index;
