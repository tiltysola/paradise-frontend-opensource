import { useEffect, useState } from 'react';

import axios from 'axios';

import { message } from '@/components/Message';
import Section from '@/components/Section';
import Viewer from '@/components/Viewer';

import Add from './Add';
import Apply from './Apply';
import Delete from './Delete';

import './style.less';

const Index = () => {
  const [skinList, setSkinList] = useState<any[]>();
  const [capeList, setCapeList] = useState<any[]>();

  const getSkinList = () => {
    axios.get('/api/user/texture/list?type=0').then((res: any) => {
      setSkinList(res.data);
    });
  };

  const getCapeList = () => {
    axios.get('/api/user/texture/list?type=1').then((res: any) => {
      setCapeList(res.data);
    });
  };

  const handleApply = (uuid: string, type: string) => {
    message.show({
      key: 'apply-texture',
      title: '编辑材质',
      content: (
        <Apply
          uuid={uuid}
          type={type}
          refresh={() => {
            getSkinList();
            getCapeList();
          }}
        />
      ),
    });
  };

  const handleDelete = (uuid: string) => {
    message.show({
      key: 'delete-texture',
      title: '删除材质',
      content: (
        <Delete
          uuid={uuid}
          refresh={() => {
            getSkinList();
            getCapeList();
          }}
        />
      ),
    });
  };

  const handleAdd = (defaultType: string) => {
    message.show({
      key: 'add-texture',
      title: '新增材质',
      content: (
        <Add
          defaultType={defaultType}
          refresh={() => {
            getSkinList();
            getCapeList();
          }}
        />
      ),
    });
  };

  useEffect(() => {
    getSkinList();
    getCapeList();
  }, []);

  return (
    <>
      <Section className="usercenter-texture">
        <>
          {skinList?.map((v, i) => (
            <div key={v.uuid} className="usercenter-texture-item">
              <div className="usercenter-texture-title">
                <span>个人皮肤 {i + 1}</span>
              </div>
              <div className="usercenter-texture-viewer">
                <Viewer userId={v.userId} skin={v.uuid} />
              </div>
              <div className="usercenter-character-operator">
                <button
                  className="button button-form"
                  onClick={() => {
                    handleApply(v.uuid, 'skin');
                  }}
                >
                  应用材质
                </button>
                <button
                  className="button button-form button-form-danger"
                  onClick={() => {
                    handleDelete(v.uuid);
                  }}
                >
                  删除材质
                </button>
              </div>
            </div>
          ))}
          <div
            className="usercenter-texture-add"
            onClick={() => {
              handleAdd('skin');
            }}
          >
            <div>
              <span className="usercenter-texture-add-icon">+</span>
              <span className="usercenter-texture-add-desc">新增皮肤</span>
            </div>
          </div>
        </>
      </Section>
      <Section className="usercenter-texture">
        <>
          {capeList?.map((v, i) => (
            <div key={v.uuid} className="usercenter-texture-item">
              <div className="usercenter-texture-title">
                <span>个人披风 {i + 1}</span>
              </div>
              <div className="usercenter-texture-viewer">
                <Viewer userId={v.userId} cape={v.uuid} />
              </div>
              <div className="usercenter-character-operator">
                <button
                  className="button button-form"
                  onClick={() => {
                    handleApply(v.uuid, 'cape');
                  }}
                >
                  应用材质
                </button>
                <button
                  className="button button-form button-form-danger"
                  onClick={() => {
                    handleDelete(v.uuid);
                  }}
                >
                  删除材质
                </button>
              </div>
            </div>
          ))}
          <div
            className="usercenter-texture-add"
            onClick={() => {
              handleAdd('cape');
            }}
          >
            <div>
              <span className="usercenter-texture-add-icon">+</span>
              <span className="usercenter-texture-add-desc">新增披风</span>
            </div>
          </div>
        </>
      </Section>
    </>
  );
};

export default Index;
