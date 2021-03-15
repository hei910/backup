import { appWindow } from './v1Functions'

export const isWeixin = () => {
    const ua = navigator.userAgent.toLowerCase()
    if (ua.match(/MicroMessenger/i)) {
        return true
    } else {
        return false
    }
}

export const isAndroid = () => {
    const ua = window.navigator.userAgent
    return ua.toLowerCase().includes('android')
}

export const isIos = () => {
    const ua = window.navigator.userAgent
    return /iPad/i.test(ua) || /iPhone/i.test(ua)
}

export const isUcBrowser = () => {
    const ua = window.navigator.userAgent
    return /UCBrowser/i.test(ua)
}

export const isWebView = () => {
    const standalone = appWindow.navigator.standalone,
        userAgent = window.navigator.userAgent.toLowerCase(),
        safari = /safari/.test(userAgent),
        ios = /iphone|ipod|ipad/.test(userAgent)

    if (ios) {
        if (!standalone && safari) {
            //browser
            return false
        } else if (standalone && !safari) {
            //standalone
            return false
        } else if (!standalone && !safari) {
            //uiwebview
            return true
        }
    } else {
        //not iOS
        let rules = ['WebView', 'Android.*(wv|.0.0.0)', 'android.*(wv|.0.0.0)']
        let regex = new RegExp(`(${rules.join('|')})`, 'ig')
        return Boolean(userAgent.match(regex))
    }
}
