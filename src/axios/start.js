import request from '@/utils/request'

export function getAreas(){
    return request({
        url: 'register/getAreas',
        method: 'get'
    })
}

export function login(data){
    return request({
        url: 'user/login',
        method: 'post',
/*         headers: {
            'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
          }, */
          params: data,
    })
}

export function logout(){
    return request({
        url: 'user/logout',
        method: 'get'
    })
}