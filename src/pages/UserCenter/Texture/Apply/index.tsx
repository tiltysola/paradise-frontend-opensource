import { useEffect, useState } from 'react';

import axios from 'axios';

import { message } from '@/components/Message';

import './style.less';

interface Props {
  uuid: string;
  type: string;
  refresh: () => void;
}

const Index = (props: Props) => {
  const { uuid, type, refresh } = props;

  const [characterList, setCharacterList] = useState<any[]>();
  const [charId, setCharId] = useState<string>();

  const getCharacterList = () => {
    axios.get('/api/user/character/list').then((res: any) => {
      setCharacterList(res.data);
      if (res.data.length > 0) {
        setCharId(res.data[0].uuid);
      }
    });
  };

  const handleApply = () => {
    axios
      .post('/api/user/texture/apply', {
        textId: uuid,
        charId,
        type: type === 'skin' ? 0 : 1,
      })
      .then(() => {
        refresh();
        message.show({
          content: '材质应用成功！',
        });
        message.hide('apply-texture');
      });
  };

  useEffect(() => {
    getCharacterList();
  }, []);

  return (
    <div className="usercenter-texture-edit form">
      <div className="form-control">
        <div className="form-label">
          <span>材质类型</span>
        </div>
        <select name="type" value={type} disabled>
          <option value="skin">皮肤</option>
          <option value="cape">披风</option>
        </select>
      </div>
      <div className="form-control">
        <div className="form-label">
          <span>昵称</span>
        </div>
        <select
          value={charId}
          onChange={(e) => {
            setCharId(e.target.value);
          }}
        >
          {characterList?.map((v) => (
            <option value={v.uuid}>{v.nickname}</option>
          ))}
        </select>
        <div className="form-button-group" style={{ marginTop: 40 }}>
          <button className="button button-form" onClick={handleApply}>
            确定应用
          </button>
        </div>
      </div>
    </div>
  );
};

export default Index;
