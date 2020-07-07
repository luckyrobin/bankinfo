import request from '@/utils/request';

export async function query() {
  return request('/api/user');
}

export async function queryCurrent() {
  return request('/api/currentUser');
}

export async function updateUser(params) {
  return request(`/api/user/${params._id}`, {
    method: 'PUT',
    data: params,
  });
}

export async function createUser(params) {
  return request(`/api/user`, {
    method: 'POST',
    data: params,
  });
}

export async function deleteUser(params) {
  return request(`/api/user/${params._id}`, {
    method: 'DELETE',
  });
}

export async function queryNotices() {
  return request('/api/notices');
}


