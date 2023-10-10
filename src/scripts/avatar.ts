export const getUserAvatar = (userId: string, avatar?: string) => {
  if (/^https?/g.test(avatar || '')) {
    return avatar;
  } else if (avatar) {
    return `/api/user/avatar?userId=${userId}&avatar=${avatar}`;
  } else {
    return '/images/tilty_qq_avatar.png';
  }
};
