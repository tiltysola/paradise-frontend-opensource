import axios from 'axios';

import { message } from '@/components/Message';

import './style.less';

interface Props {
  uuid: string;
  refresh: () => void;
}

const Index = (props: Props) => {
  const { uuid, refresh } = props;

  const handleDelete = () => {
    axios
      .post('/api/user/texture/remove', {
        textId: uuid,
      })
      .then(() => {
        refresh();
        message.show({
          content: '材质删除成功！',
        });
        message.hide('delete-texture');
      });
  };

  return (
    <div className="usercenter-texture-delete form">
      <div className="form-control">
        <span>请注意，删除材质后将无法找回！</span>
      </div>
      <div className="form-button-group" style={{ marginTop: 40 }}>
        <button
          className="button button-form button-form-danger"
          onClick={handleDelete}
        >
          确认删除
        </button>
      </div>
    </div>
  );
};

export default Index;
