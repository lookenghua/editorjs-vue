import { MockMethod } from 'vite-plugin-mock'

export default [
  {
    url: '/api/upload/file',
    method: 'post',
    timeout: 3000,
    response: () => {
      return {
        success: 1,
        data: 'https://cdn.pixabay.com/photo/2021/10/23/16/31/italy-6735340_960_720.jpg',
      }
    },
  },
] as MockMethod[]
