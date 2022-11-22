import request from '@/utils/request'
// import qs from 'qs'

export function getPlans(params){
    return request({
        url: 'register/getPlans',
        method: 'post',
        data: params,
       /*  paramsSerializer: {
            serialize:function(params){
                return qs.stringify(params,{arrayFormat: 'repeat'})
            }
        } */
    })
}

export function getRegisters(params){
    return request({
        url: 'register/getRegisters',
        method: 'get',
        params,
    })
}

export function register(data){
    return request({
        url: 'register/register',
        method: 'post',        
        data
    })
}

export function updateRegister(data){
    return request({
        url: 'register/updateRegister',
        method: 'post',
        data
    })
}

export function deleteRegister(data){
    return request({
        url: 'register/deleteRegister',
        method: 'post',
        data
    })
}

export function deleteAllRegister(data){
    return request({
        url: 'register/deleteAll',
        method: 'post',
        data
    })
}