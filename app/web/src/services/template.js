import request from '@/utils/request';

export async function query() {
  return request('/api/template');
}

export async function destroy(params) {
  return request(`/api/template/${params._id}`, {
    method: 'DELETE',
  });
}

export async function print(params) {
  return request(`/api/template/print/${params._id}`, {
    method: 'PUT',
    data: params,
  });
}
