
import store from 'store';
import { router } from 'umi';

const noUseToken =['/user/login','/user/register','/user/retrypwd']

// eslint-disable-next-line import/prefer-default-export
export function onRouteChange({ location }) {
    
    if (location.pathname==="/user/login")
        return true;
    const token = store.get("token")
    if(token)
        return true
    return router.push("/user/login")
}