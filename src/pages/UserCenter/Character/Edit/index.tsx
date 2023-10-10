import { useEffect, useState } from 'react';

import axios from 'axios';

import { message } from '@/components/Message';

import './style.less';

interface Props {
  uuid: string;
  refresh: () => void;
}

const Index = (props: Props) => {
  const { uuid, refresh } = props;

  const [nickname, setNickname] = useState('');
  const [type, setType] = useState('default');

  const handleChange = () => {
    axios
      .post('/api/user/character/edit', {
        charId: uuid,
        nickname,
        skinType: type === 'default' ? 0 : 1,
      })
      .then(() => {
        refresh();
        message.show({
          content: '角色编辑成功！',
        });
        message.hide('edit-character');
      });
  };

  useEffect(() => {
    axios.get('/api/user/character/list').then((res: any) => {
      for (const char of res.data) {
        if (char.uuid === uuid) {
          setNickname(char.nickname);
          setType(char.skinType === 0 ? 'default' : 'slim');
        }
      }
    });
  }, [uuid]);

  return (
    <div className="usercenter-character-edit form">
      <div className="form-control">
        <div className="form-label">
          <span>昵称</span>
        </div>
        <input
          value={nickname}
          onChange={(e) => {
            setNickname(e.target.value);
          }}
        />
      </div>
      <div className="form-control">
        <div className="form-label">
          <span>类型</span>
        </div>
        <select
          name="type"
          value={type}
          onChange={(e) => {
            setType(e.target.value);
          }}
        >
          <option value="default">Steve</option>
          <option value="slim">Alex</option>
        </select>
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
