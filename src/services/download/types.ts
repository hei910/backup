export interface IDownloadProps {}

export type MobilePlatform = 'ios' | 'android'

export type DownloadButtonStatus = 'comingSoon' | 'needLogin' | 'available'
export interface DownloadState {
    ios: {
        status: DownloadButtonStatus
        version: string
        type: 'app' | 'bookmark' | 'individual'
        link: string
        bookmarkLink: string
    }
    android: {
        status: DownloadButtonStatus
        version: string
        link: string
    }
}
