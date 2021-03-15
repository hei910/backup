import _axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, CancelTokenSource } from 'axios'
import store from '@redux'
import { getCookieByName, isEmptyObject } from '@sport/util/general'

interface ResponseCaches {
    timestamp: number
    response: AxiosResponse
}

interface PendingApi {
    key: string
    apiPath: string
    config: AxiosRequestConfig
    source: CancelTokenSource
    timestamp: number
}

const cancelApi = [
    'matches/matchStatus',
    'getSeasonList',
    'getOrSeasonList',
    'getDateList',
    'getTopPage',
    'getMatchCount',
    'getMatchStaticInfoByCompetitionIds',
]

const cachesApi = [
    'matches',
    'getSeasonList',
    'getOrSeasonList',
    'getDateList',
    'getTopPage',
    'getMatchStaticInfoByCompetitionIds',
]

const retryApi = [
    'matches',
    'getSeasonList',
    'getOrSeasonList',
    'getDateList',
    'getTopPage',
    'getMatchStaticInfoByCompetitionIds',
]

const isNetworkError = (error: any) => {
    return !error.response && Boolean(error.code) && error.code !== 'ECONNABORTED'
}

const isRetryableError = (error: any) => {
    return (
        error.code !== 'ECONNABORTED' &&
        (!error.response ||
            (error.response.status >= 500 && error.response.status <= 599) ||
            error.response.status === 400)
    )
}

const shouldRetry = (error: any) => isNetworkError(error) || isRetryableError(error)

class AxiosInterceptors {
    axios: AxiosInstance

    caches: Record<string, ResponseCaches> = {}
    cacheCleaner: any

    pendingList: Record<string, PendingApi> = {}

    inplayExpireTime = 1000 * 8
    normalExpireTime = 1000 * 8

    retryList: Record<string, number> = {}
    retryDelay: number = 1000 * 2
    retryTime: number = 10

    constructor(axios: AxiosInstance) {
        this.axios = axios
        this.axios.interceptors.request.use(this.interceptorsRequest, this.interceptorsRequestError)
        this.axios.interceptors.response.use(this.interceptorsResponse, this.interceptorsResponseError)
        this.cacheCleaner = setInterval(this.clearExpireCaches, 1000 * 5)
    }

    getKey = (config: AxiosRequestConfig) => config?.url ?? ''

    getCancelApiPath = (config: AxiosRequestConfig) => {
        const pathArray = (config?.url ?? '').split('/')
        const path = pathArray[0] ?? ''
        return path === 'matches' ? `${pathArray[0] ?? ''}/${pathArray[1] ?? ''}` : pathArray[0] ?? ''
    }

    getApiPath = (config: AxiosRequestConfig) => (config?.url ?? '').split('/')[0] ?? ''

    getCancelSource = () => {
        const CancelToken = _axios.CancelToken
        return CancelToken.source()
    }

    clearExpireCaches = () => {
        !isEmptyObject(this.caches) &&
            Object.entries(this.caches)
                .filter(([key, value]) => {
                    const pathKey = this.getKey(value.response.config)

                    const isInplay = pathKey?.includes('matchStatus/Live')

                    const expireTime = isInplay ? this.inplayExpireTime : this.normalExpireTime
                    return +new Date() - value.timestamp > expireTime
                })
                .forEach(([key, value]) => delete this.caches[key])
    }

    interceptorsRequest = (config: AxiosRequestConfig) => {
        const key = this.getKey(config)
        const apiPath = this.getCancelApiPath(config)
        const source = this.getCancelSource()
        config.cancelToken = source.token

        // add csrf header
        if (config.method !== 'GET' && config.method !== 'get') {
            if (!Object.prototype.hasOwnProperty.call(config, 'headers')) {
                config.headers = {}
            }

            config.headers['X-SPORT-XSRF-TOKEN'] = getCookieByName('_sport_csrf')
        }

        // cache

        if (store.getState().sportData.cacheData && this.caches[key]) {
            // find the cache date and cancel axios request
            source.cancel(key)
        }

        if (!store.getState().sportData.cacheData && Object.keys(this.caches).length > 0) {
            // disable cache function and clean all caches
            this.caches = {}
        }

        // cancel

        const currentPendingList = Object.values(this.pendingList)
            .filter((api) => api.apiPath === apiPath && cancelApi.includes(apiPath))
            .sort((a, b) => a.timestamp - b.timestamp)

        if (currentPendingList.length > 0) {
            // same pending request more than one
            currentPendingList.forEach((api) => api.source.cancel('duplicate request'))
        }

        if (cancelApi.includes(apiPath)) {
            this.pendingList[key] = { key, apiPath, source, config, timestamp: +new Date() }
        }

        return config
    }

    interceptorsResponse = (response: AxiosResponse) => {
        const { config } = response
        const key = this.getKey(config)
        const apiPath = this.getApiPath(config)

        if (this.pendingList[key]) {
            delete this.pendingList[key]
        }

        if (this.retryList[apiPath]) {
            delete this.retryList[apiPath]
        }

        if (store.getState().sportData.cacheData) {
            if (cachesApi.includes(apiPath)) {
                const key = this.getKey(config)
                const responseCaches = { timestamp: +new Date(), response }
                this.caches = { ...this.caches, [key]: responseCaches }
            }
        }

        return response
    }

    interceptorsRequestError = (error: any) => {
        return Promise.reject(error)
    }

    interceptorsResponseError = (error: any) => {
        const config = error.config

        const key = this.getKey(config)
        const apiPath = this.getApiPath(config)

        if (this.pendingList[key]) delete this.pendingList[key]

        if (_axios.isCancel(error) && this.caches[error?.message ?? '']?.response) {
            return Promise.resolve(this.caches[error.message].response)
        }

        if (!config) return Promise.reject(error)

        // console.log('163541 AxiosInterceptors.ts error', error)
        // const test = shouldRetry(error)

        if (shouldRetry(error) && retryApi.includes(apiPath) && !key.includes('matchStatus/Live')) {
            let currentRetryCount = this.retryList[apiPath] ?? 0

            currentRetryCount += 1
            this.retryList[apiPath] = currentRetryCount

            // console.log(`${key}`, currentRetryCount);

            if (currentRetryCount > this.retryTime) {
                delete this.retryList[apiPath]
                return Promise.reject(error)
            } else {
                config.transformRequest = [(data: any) => data]
                return new Promise((resolve) => setTimeout(() => resolve(this.axios(config)), this.retryDelay))
            }
        } else {
            return Promise.reject(error)
        }
    }
}

export default AxiosInterceptors
