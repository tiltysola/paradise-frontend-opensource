import { Route, Routes } from 'react-router-dom';

import Admin from '@/pages/Admin';
import AdminIndex from '@/pages/Admin/Index0';
import AdminUser from '@/pages/Admin/User';
import Authenticate from '@/pages/Authenticate';
import Index from '@/pages/Index';
import Login from '@/pages/Login';
import NotFound from '@/pages/NotFound';
import Recovery from '@/pages/Recovery';
import Register from '@/pages/Register';
import UserCenter from '@/pages/UserCenter';
import UserCenterCharacter from '@/pages/UserCenter/Character';
import UserCenterIndex from '@/pages/UserCenter/Index0';
import UserCenterTexture from '@/pages/UserCenter/Texture';
import Layout from '@/components/Layout';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Index />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="recovery" element={<Recovery />} />
        <Route path="authenticate/:accessToken" element={<Authenticate />} />
        <Route path="usercenter" element={<UserCenter />}>
          <Route index element={<UserCenterIndex />} />
        </Route>
        <Route path="authenticate/:accessToken" element={<Authenticate />} />
        <Route path="usercenter" element={<UserCenter />}>
          <Route index element={<UserCenterIndex />} />
          <Route path="character" element={<UserCenterCharacter />} />
          <Route path="texture" element={<UserCenterTexture />} />
        </Route>
        <Route path="admin" element={<Admin />}>
          <Route index element={<AdminIndex />} />
          <Route path="user" element={<AdminUser />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default Router;
