// eslint-disable-next-line import/no-unresolved
import Authorized from './Authorized';
// eslint-disable-next-line import/no-unresolved
import AuthorizedRoute from './AuthorizedRoute';
// eslint-disable-next-line import/no-unresolved
import Secured from './Secured';
// eslint-disable-next-line import/no-unresolved
import check from './CheckPermissions';
import renderAuthorize from './renderAuthorize';

Authorized.Secured = Secured;
Authorized.AuthorizedRoute = AuthorizedRoute;
Authorized.check = check;
const RenderAuthorize = renderAuthorize(Authorized);
export default RenderAuthorize;
