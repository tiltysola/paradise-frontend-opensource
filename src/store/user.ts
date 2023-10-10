import { atom } from 'recoil';

const userState = atom<any>({
  key: 'userState',
  default: null,
});

export default userState;
