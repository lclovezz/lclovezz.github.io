import request from '@/utils/request'

export function YourApi(data) {
  return request({
      url: '/API/YourApi',
      method: 'post',
      data
  })
}
