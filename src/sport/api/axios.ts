import axios, { AxiosRequestConfig } from 'axios'
import qs, { IStringifyOptions } from 'qs'
import AxiosInterceptors from './AxiosInterceptors'

const qsOption: IStringifyOptions = { arrayFormat: 'comma' }

const axisoConfig: AxiosRequestConfig = {
    baseURL: process.env.REACT_APP_API_URL,
    paramsSerializer: function (params) {
        return qs.stringify(params, qsOption)
    },
}

// console.log('175353 axios.ts axios', axisoConfig);

const instance = axios.create(axisoConfig)

new AxiosInterceptors(instance)

export default instance
