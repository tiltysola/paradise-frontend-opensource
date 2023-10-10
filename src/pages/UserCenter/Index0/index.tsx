import { useRef } from 'react';

import axios from 'axios';
import { useRecoilState } from 'recoil';

import { getUserAvatar } from '@/scripts/avatar';
import userStateRecoil from '@/store/user';

import { message } from '@/components/Message';
import Section from '@/components/Section';

import ChangePassword from './ChangePassword';
import ChangeUsername from './ChangeUsername';

import './style.less';

const Index = () => {
  const [userState, setUserState] = useRecoilState(userStateRecoil);

  const fileRef = useRef<any>();

  const handleChangeAvatar = () => {
    fileRef.current && fileRef.current.click();
  };

  const handleChangeUsername = () => {
    message.show({
      key: 'change-username',
      title: '修改昵称',
      content: <ChangeUsername />,
    });
  };

  const handleChangePassword = () => {
    message.show({
      key: 'change-password',
      title: '修改密码',
      content: <ChangePassword />,
    });
  };

  const handleUploadAvatar = () => {
    console.dir(fileRef.current.files);
    const formData = new FormData();
    formData.append('file', fileRef.current.files[0]);
    axios
      .post('/api/user/edit/avatar', formData, {
        headers: {
          'content-type': 'multipart/form-data',
        },
      })
      .then(() => {
        axios.get('/api/user/profile').then((res) => {
          setUserState(res.data);
          message.show({
            content: '头像更换成功！',
          });
        });
      });
  };

  return (
    <Section className="usercenter-index">
      <div className="usercenter-index-item">
        <img src={getUserAvatar(userState?.uuid, userState?.avatar)} />
      </div>
      <div className="usercenter-index-item">
        <span>
          用户ID：{userState?.id}{' '}
          <span className="secondary">({userState?.uuid})</span>
        </span>
      </div>
      <div className="usercenter-index-item">
        <span>邮箱：{userState?.email}</span>
      </div>
      <div className="usercenter-index-item">
        <span>昵称：{userState?.username}</span>
        <button
          className="button button-link-dark button-inline"
          onClick={handleChangeUsername}
        >
          [修改昵称]
        </button>
      </div>
      <div className="usercenter-index-item">
        <button className="button button-form" onClick={handleChangeAvatar}>
          修改头像
        </button>
        <input
          style={{ display: 'none' }}
          type="file"
          name="file"
          ref={fileRef}
          onChange={handleUploadAvatar}
        />
      </div>
      <div className="usercenter-index-item">
        <button className="button button-form" onClick={handleChangePassword}>
          修改密码
        </button>
      </div>
    </Section>
  );
};

export default Index;
