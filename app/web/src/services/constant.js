import request from '@/utils/request';

export async function query() {
  return request('/api/constant');
}

export async function update(params) {
  return request(`/api/constant`, {
    method: 'POST',
    data: params,
  });
}