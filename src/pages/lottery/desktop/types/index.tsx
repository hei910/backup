
export interface IGameDetail {
    gameCode?: number
    interval: number
    issue: string
    total: string
    time: string
    drawResult?: string[]
}

export interface IFullInterval {
    intervalString: string,
    issueString: string

    // Case: 第 20210128006 期开奖 | 每 2 分钟 一期全日 180 期
    // Case: 第 20210128190 期开奖 | 1月28日开奖
    // Usage: ${ issueString } | ${ intervalString }
}

export interface ICustomizedInterval {
    customIssue: string,
    customInterval: string,
    customTimeUnit: string,
    customTotal: string,
    isMarkSix: boolean,
    markSixMonth: number | string,
    markSixDay: number | string

    // Case: 第 20210128006 期开奖 | 每 2 分钟 一期全日 180 期
    // Usage: 第 ${customIssue} 期开奖 | 每 ${customInterval} ${customTimeUnit} 一期全日 ${customTotal} 期

    // if(isMarkSix) =>
    // Case: 第 20210128190 期开奖 | 1月28日开奖
    // Usage: 第 {customIssue} 期开奖 | {markSixMonth} 月 {markSixDay} 日开奖

}

export interface IColorCodes {
    allcolor: string[],
    orange: string,
    blue: string,
    hklucky6: string[]
}
