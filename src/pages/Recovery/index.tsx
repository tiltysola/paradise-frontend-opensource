import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useInterval } from 'ahooks';
import axios from 'axios';
import { useRecoilState } from 'recoil';

import userStateRecoil from '@/store/user';

import { message } from '@/components/Message';
import Page from '@/components/Page';
import Section from '@/components/Section';

import './style.less';

const Index = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [emailCode, setEmailCode] = useState('');
  const [countdown, setCountdown] = useState<number>(0);
  const [userState] = useRecoilState(userStateRecoil);

  const navigate = useNavigate();

  const onVerify = () => {
    if (countdown === 0) {
      axios
        .post('/api/auth/acquire/mail', {
          email,
        })
        .then(() => {
          setCountdown(60);
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

  const handleRecovery = () => {
    if (password === rePassword) {
      axios
        .post('/api/auth/recovery', {
          email,
          password,
          emailCode,
        })
        .then(() => {
          message.show({
            content: '找回成功，即将跳转到登录页面。',
          });
          navigate('/');
        });
    } else {
      message.show({
        content: '两次密码输入不一致！',
      });
    }
  };

  useEffect(() => {
    if (userState) {
      navigate('/usercenter');
    }
  }, [userState]);

  useInterval(() => {
    if (countdown > 0) {
      setCountdown(countdown - 1);
    }
  }, 1000);

  return (
    <Page className="recovery" title="找回密码">
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
            <button className="button button-form" onClick={handleRecovery}>
              找回密码
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
