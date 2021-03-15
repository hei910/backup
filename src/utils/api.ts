import axios, { Method, AxiosError, AxiosRequestConfig } from 'axios'
import { GenericObject } from '@type'

type ApiResponse<T> = {
    success: boolean
    data: T
    reason: string
}

const apiInstance = axios.create({
    // TODO: change to /api in future
    baseURL: '/',
    headers: {
        platform: process.env.APP_PLATFORM,
    },
    timeout: 20000,
})

const whiteList: Record<string, number> = {}

export const setApiRequestInterceptor = (requestHandler: (config: AxiosRequestConfig) => any) => {
    apiInstance.interceptors.request.use((config: AxiosRequestConfig) => {
        // if not in whitelist show loading
        if (!whiteList[config.url || ''] || whiteList[config.url || ''] < 1) {
            requestHandler(config)
        }
        return config
    })
}

export const setApiResponseInterceptor = (responseHandler: any) => {
    const commonHandler = (data: any) => {
        // remove url from white list for the case that the next api call may want to have loading
        if (whiteList[data.config.url] > 0) {
            whiteList[data.config.url] = whiteList[data.config.url] - 1
        }
        responseHandler(data)
    }

    apiInstance.interceptors.response.use(
        (response: any) => {
            commonHandler(response)
            return response
        },
        (error: any) => {
            commonHandler(error)
            return Promise.reject(error)
        },
    )
}

const getResolution = () => {
    const screenWidth = window.screen.width
    const screenHeight = window.screen.height

    return screenWidth + 'x' + screenHeight
}

const getHeaders = (headers: GenericObject = {}) => ({ ...headers, resolution: getResolution() })

const call = <T = any>(
    method: Method,
    url: string,
    data?: GenericObject,
    headers?: GenericObject,
    withoutLoading?: boolean,
): Promise<T> => {
    // add api url into white list for not showing loading
    if (withoutLoading) {
        whiteList[url] = whiteList[url] === undefined ? 1 : whiteList[url] + 1
    }

    return apiInstance({
        method,
        url,
        headers: getHeaders(headers),
        ...(method.toLowerCase() === 'get' ? { params: data } : { data }),
    })
        .catch((err: AxiosError) => Promise.reject(err?.response ?? err))
        .then((res) => {
            const apiData: ApiResponse<T> = res.data

            if (!apiData.success && apiData.success !== undefined) {
                return Promise.reject({ errorCode: apiData.reason })
            }

            return res.data.data
        })
}
export default call
