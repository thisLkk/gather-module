/**
 * 请求转发：与views文件夹一一对应
 */
import request from '@/assets/request.js';
// demo
export function getUser(data) {
  return request('/getUser', {
    method: 'post',
    data
  });
}