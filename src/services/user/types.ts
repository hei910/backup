export interface UserIpInfo {
    ip: string
    country: string
}

export interface UserInfo {
    A: number // announcement
    I: number // inbox
    N: number // notifications
    userProfile: {
        icon: string
        username: string
    }
    balance: string
    ipInfo: UserIpInfo
    isLoggedIn: boolean
    isAllowAccess: boolean
}

export interface GeoipRes {
    allowAccess: boolean
    clientIp: string
    country: string
    allowHost: boolean
}
