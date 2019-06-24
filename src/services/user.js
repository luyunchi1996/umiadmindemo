import request from '@/utils/request';
// eslint-disable-next-line no-unused-vars
import { func } from 'prop-types';

export async function login(params) {
  return request('/api/login', {
    method: 'POST',
    data: params,
  });
}

export async function query() {
  return request('/api/users');
}

export async function queryCurrent() {
  return request('/api/currentUser');
}
export async function queryNotices() {
  return request('/api/notices');
}

export async function authorityItem() {
  return request('/api/notices');
}
