import { useState } from 'react';

import axios from 'axios';

import { message } from '@/components/Message';

import './style.less';

const Index = () => {
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');

  const handleChange = () => {
    if (password === rePassword) {
      axios
        .post('/api/user/edit/password', {
          password,
        })
        .then(() => {
          message.show({
            content: '密码修改成功！',
          });
          message.hide('change-password');
        });
    } else {
      message.show({
        content: '两次密码输入不一致！',
      });
    }
  };

  return (
    <div className="usercenter-index-changepassword form">
      <div className="form-control">
        <div className="form-label">
          <span>新密码</span>
        </div>
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>
      <div className="form-control" style={{ marginBottom: 12 }}>
        <div className="form-label">
          <span>确认新密码</span>
        </div>
        <input
          type="password"
          value={rePassword}
          onChange={(e) => {
            setRePassword(e.target.value);
          }}
        />
      </div>
      <div className="form-button-group" style={{ marginTop: 40 }}>
        <button className="button button-form" onClick={handleChange}>
          确定修改
        </button>
      </div>
    </div>
  );
};

export default Index;
