import { useRef, useState } from 'react';

import axios from 'axios';

import { message } from '@/components/Message';

import './style.less';

interface Props {
  defaultType?: string;
  refresh: () => void;
}

const Index = (props: Props) => {
  const { defaultType, refresh } = props;

  const [type, setType] = useState(defaultType || 'skin');
  const [file, setFile] = useState<any>();

  const fileRef = useRef<any>();

  const handleChange = () => {
    const formData = new FormData();
    formData.append('type', type === 'skin' ? '0' : '1');
    formData.append('file', file);
    axios
      .post('/api/user/texture/add', formData, {
        headers: {
          'content-type': 'multipart/form-data',
        },
      })
      .then(() => {
        refresh();
        message.show({
          content: '材质上传成功！',
        });
        message.hide('add-texture');
      });
  };

  const handleUploadFile = () => {
    fileRef && fileRef.current.click();
  };

  return (
    <div className="usercenter-texture-add-mbx form">
      <div className="form-control">
        <div className="form-label">
          <span>材质类型</span>
        </div>
        <select
          name="type"
          value={type}
          onChange={(e) => {
            setType(e.target.value);
          }}
        >
          <option value="skin">皮肤</option>
          <option value="cape">披风</option>
        </select>
      </div>
      <div className="form-control">
        <div className="form-label">
          <span>材质文件</span>
        </div>
        <input
          className="form-input"
          type="text"
          value={file?.name}
          placeholder="点击选择您的材质文件"
          onClick={handleUploadFile}
        />
        <input
          style={{ display: 'none' }}
          type="file"
          name="file"
          onChange={(e: any) => {
            setFile(e.target.files[0]);
          }}
          ref={fileRef}
        />
      </div>
      <div className="form-button-group" style={{ marginTop: 40 }}>
        <button className="button button-form" onClick={handleChange}>
          上传材质
        </button>
      </div>
    </div>
  );
};

export default Index;
