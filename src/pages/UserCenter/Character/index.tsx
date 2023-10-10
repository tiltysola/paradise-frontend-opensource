import { useEffect, useState } from 'react';

import axios from 'axios';

import { message } from '@/components/Message';
import Section from '@/components/Section';
import Viewer from '@/components/Viewer';

import Add from './Add';
import Delete from './Delete';
import Edit from './Edit';

import './style.less';

const Index = () => {
  const [characterList, setCharacterList] = useState<any[]>();

  const getCharacterList = () => {
    axios.get('/api/user/character/list').then((res: any) => {
      setCharacterList(res.data);
    });
  };

  const handleEdit = (uuid: string) => {
    message.show({
      key: 'edit-character',
      title: '编辑角色',
      content: <Edit uuid={uuid} refresh={getCharacterList} />,
    });
  };

  const handleDelete = (uuid: string) => {
    message.show({
      key: 'delete-character',
      title: '删除角色',
      content: <Delete uuid={uuid} refresh={getCharacterList} />,
    });
  };

  const handleAdd = () => {
    message.show({
      key: 'add-character',
      title: '新增角色',
      content: <Add refresh={getCharacterList} />,
    });
  };

  useEffect(() => {
    getCharacterList();
  }, []);

  return (
    <Section className="usercenter-character">
      <>
        {characterList?.map((v) => (
          <div className="usercenter-character-item">
            <div className="usercenter-character-title">
              <span>{v.nickname}</span>
            </div>
            <div className="usercenter-character-viewer">
              <Viewer
                userId={v.userId}
                skin={v.skin}
                cape={v.cape}
                skinType={v.skinType}
              />
            </div>
            <div className="usercenter-character-operator">
              <button
                className="button button-form"
                onClick={() => {
                  handleEdit(v.uuid);
                }}
              >
                编辑角色
              </button>
              <button
                className="button button-form button-form-danger"
                onClick={() => {
                  handleDelete(v.uuid);
                }}
              >
                删除角色
              </button>
            </div>
          </div>
        ))}
        <div
          className="usercenter-character-add"
          onClick={() => {
            handleAdd();
          }}
        >
          <div>
            <span className="usercenter-character-add-icon">+</span>
            <span className="usercenter-character-add-desc">新增角色</span>
          </div>
        </div>
      </>
    </Section>
  );
};

export default Index;
