import { useState } from 'react';

import axios from 'axios';
import { useRecoilState } from 'recoil';

import userStateRecoil from '@/store/user';

import { message } from '@/components/Message';

import './style.less';

const Index = () => {
  const [username, setUsername] = useState('');

  const [, setUserState] = useRecoilState(userStateRecoil);

  const handleChange = () => {
    axios
      .post('/api/user/edit/username', {
        username,
      })
      .then(() => {
        axios.get('/api/user/profile').then((res) => {
          setUserState(res.data);
          message.show({
            content: '昵称修改成功！',
          });
          message.hide('change-username');
        });
      });
  };

  return (
    <div className="usercenter-index-changeusername form">
      <div className="form-control">
        <div className="form-label">
          <span>新昵称</span>
        </div>
        <input
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
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
