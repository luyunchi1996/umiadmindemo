import store from 'store';
import { router } from 'umi';

// eslint-disable-next-line no-unused-vars
const noUseToken = ['/user/login', '/redirect', '/user/register', '/user/retrypwd'];

// eslint-disable-next-line import/prefer-default-export
export function onRouteChange({ location }) {
  // 获取menuItem
  if (location.pathname === '/user/login') return true;
  if (location.pathname === '/redirect') return true;
  const token = store.get('token');
  const userInfo = store.get('userInfo');
  if (token && !userInfo) {
    router.push({
      pathname: '/redirect',
      query: { id: location.query.id, path: location.pathname },
    });
  } else if (!token || !userInfo) {
    router.push('/user/login');
  }
  return true;
}
