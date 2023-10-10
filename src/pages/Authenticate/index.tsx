import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import axios from 'axios';
import { useRecoilState } from 'recoil';

import userStateRecoil from '@/store/user';

import Page from '@/components/Page';

import './style.less';

const Index = () => {
  const [, setUserState] = useRecoilState(userStateRecoil);

  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    axios
      .post('/api/auth/authenticate', {
        accessToken: params.accessToken,
      })
      .then(() => {
        axios.get('/api/user/profile').then((res) => {
          setUserState(res.data);
          navigate('/usercenter');
        });
      });
  }, []);

  return <Page className="authenticate" title="验证会话" />;
};

export default Index;
