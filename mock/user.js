// // 代码中会兼容本地 service mock 以及部署站点的静态数据
const loginInfo = (req, res) => {
  res.json({
    id: 12,
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
  });
};
export default {
  'POST /api/login': loginInfo,
  'GET /api/user/authorityItem': {
    userid: '00000001',
    list: [
      { name: 'sysSettings', icon: 'warning', path: '/sys/settings', component: './sys/settings' },
    ],
  },
};
