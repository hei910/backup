import call from '@utils/api'
import axios from 'axios'

export const getDownloadAppStatus = () => {
    return call('GET', `/info/appInfo`).then((res) => res)
}

// should not throw error even if the api call is fail
export const addDownloadCount = (clickRateBrandCode: string, appLink: string, isIOS: boolean) => {
    return axios
        .get(
            `https://d1bacx80on251l.cloudfront.net/statistics/appdl?brand=${clickRateBrandCode}&domain=${
                window.location.hostname
            }&applink=${encodeURIComponent(appLink)}&platform=${isIOS ? 'ios' : 'android'}`,
        )
        .catch()
}
