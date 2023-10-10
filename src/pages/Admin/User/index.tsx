import { useEffect, useState } from 'react';

import axios from 'axios';

import { getUserAvatar } from '@/scripts/avatar';

import { message } from '@/components/Message';
import Section from '@/components/Section';

import './style.less';

const Index = () => {
  const [userList, setUserList] = useState<any[]>();

  const handleEdit = () => {
    message.show({
      content: '暂不支持修改！',
    });
  };

  useEffect(() => {
    axios.get('/api/admin/user/list', {
      params: {
        page: 1,
        pageSize: 999,
      },
    }).then((res) => {
      setUserList(res.data.list);
    });
  }, []);

  return (
    <Section className="admin-user">
      <table className="admin-user-table" border={0} cellSpacing={0}>
        <thead>
          <tr>
            <th style={{ width: 48 }}>头像</th>
            <th>昵称</th>
            <th>邮箱</th>
            <th>权限</th>
            <th style={{ width: 64 }}>封禁</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {userList?.map((v) => (
            <tr className="admin-user-table-item">
              <td>
                <img src={getUserAvatar(v.uuid, v.avatar)} />
              </td>
              <td>{v.username}</td>
              <td>{v.email}</td>
              <td>{v.permissions || '--'}</td>
              <td>{v.banned ? '已封禁' : '--'}</td>
              <td>
                <span className="button button-link" onClick={handleEdit}>
                  编辑
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Section>
  );
};

export default Index;
