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
      .post('/api/user/character/remove', {
        charId: uuid,
      })
      .then(() => {
        refresh();
        message.show({
          content: '角色删除成功！',
        });
        message.hide('delete-character');
      });
  };

  return (
    <div className="usercenter-character-delete form">
      <div className="form-control">
        <span>请注意，删除角色会丢失所有数据，并且无法找回！</span>
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
