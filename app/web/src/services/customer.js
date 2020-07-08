import request from '@/utils/request';

export async function query() {
  return request('/api/customer');
}

export async function update(params) {
  return request(`/api/customer/${params._id}`, {
    method: 'PUT',
    data: params,
  });
}

export async function create(params) {
  return request(`/api/customer`, {
    method: 'POST',
    data: params,
  });
}

export async function destroy(params) {
  return request(`/api/customer/${params._id}`, {
    method: 'DELETE',
  });
}
