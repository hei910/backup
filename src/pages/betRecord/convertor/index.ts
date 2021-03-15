/* eslint-disable @typescript-eslint/no-unused-vars */
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import round from 'lodash/round'
import { Decimal } from 'decimal.js'
import { cancelReason } from './constants'
import { getSystemSetting } from '@utils/v1Functions'
import { IConvertedSportsData, IData } from '../types'

dayjs.extend(utc)

const statusType = {
    SETTLE: 'settle',
    UNSETTLE: 'unsettle',
    CANCEL: 'cancel',
    DANGEROUS_CANCEL: 'dangerouscancel',
}

const sportName: any = {
    '1': 'Soccer',
    '2': 'Basketball',
    '3': 'Tennis',
    '4': 'Baseball',
}

export function convertSportV1Detail(game: IData) {
    let i: number = 0

    const record: any = game.gameDetail
    const {
        betAmount,
        betAllowEarlySettle,
        betDt,
        betSportDetailEntities: betsDetails,
        cancelled,
        cCount,
        earlySettleTBC,
        earlySettleDt,
        isLive,
        mCount,
        matchCount,
        betSportOrDetailEntities: orBetDetails,
        payout,
        processed,
        totalAnte,
        uuId,
        masterId,
        estimatedWinnings,
        normalSettleTbc: normalSettleTBC,
    } = record
    const maxPayout = 0
    const allowEarlySettle = betsDetails.length > 0 ? betsDetails[0].allowEarlySettle : orBetDetails[0].allowEarlySettle
    const rowId = betsDetails.length > 0 ? betsDetails[0].rowId : orBetDetails[0].rowId
    let newBetInfo: any,
        id,
        betMethod,
        betDate,
        betChoice,
        ante,
        newPayout,
        payoutToShow,
        isWin,
        isCancel,
        betConfirm,
        maxWin,
        maxWinAmount = 0

    if (processed) {
        let countCancel = 0
        let allCancelled = false

        id = i + 1
        betDate = dayjs(dayjs(betDt).format()).utcOffset(4).format('YYYY年M月D日, HH:mm:ss')
        ante = round(totalAnte, 2).toFixed(2)
        newPayout = round(payout - totalAnte, 2).toFixed(2)
        payoutToShow = round(payout - totalAnte, 2).toFixed(2)
        maxWin = maxWinningAmount(game.gameDetail, null).toFixed(2)
        maxWinAmount = mCount > 1 && Number(maxWin) > maxPayout ? maxPayout : Number(maxWin)
        isCancel = betsDetails.length > 0 ? betsDetails[0].isCancel : orBetDetails[0].isCancel

        if (betsDetails.length > 0 && orBetDetails.length > 0) {
            newBetInfo = betSportContentProducer2(betsDetails, orBetDetails, !isCancel ? false : true, matchCount > 1)
        } else {
            const newBetsDetails = betsDetails.length <= 0 ? orBetDetails : betsDetails

            newBetInfo = betSportContentProducer(newBetsDetails, !isCancel ? false : true, matchCount > 1)
        }

        betChoice = newBetInfo.choice

        if (betsDetails.length > 1) {
            for (let j = 0; j < betsDetails.length; j++) {
                if (betsDetails[j].isMatchCancelled || betsDetails[j].isCancel || betsDetails[j].cancelReason) {
                    countCancel++
                }
                if (countCancel === betsDetails.length) {
                    allCancelled = true
                }
            }
        }

        if (mCount > 1) {
            betMethod = matchCount + '场' + (cCount > 1 ? '复' : '单') + '式 ' + mCount + '串' + cCount
        } else {
            betMethod = newBetInfo.method
        }

        if (payout > 0) {
            isWin = winLoseStatusSportSettled(record)
        } else if (parseInt(payout.toFixed(0)) === 0) {
            isWin = winLoseStatusSportSettled(record)
        } else {
            isWin = winLoseStatusSportSettled(record)
        }
        //const newUUId = uuId.substring(0, 17)

        return {
            estimatedWinnings,
            normalSettleTBC,
            sportsDetail: betChoice,
            allowEarlySettle,
            masterId,
            rowId,
        }
        //.push([id, betDate + newUUId, betMethod, betChoice, ante, maxWinAmount, payoutToShow, isWin])
    } else {
        const systemSetting = getSystemSetting()
        //const SCORE_SOCCER_CANCEL = (systemSetting && systemSetting.SCORE_SOCCER_CANCEL) || 0
        const SCORE_BASKETBALL_CANCEL = (systemSetting && systemSetting.SCORE_BASKETBALL_CANCEL) || 0
        const nowDt = new Date().getTime()
        //const transformedEarlySettleDt = Date.parse(earlySettleDt)

        id = i + 1
        betDate = dayjs(dayjs(betDt).format()).utcOffset(4).format('YYYY年M月D日, HH:mm:ss')

        const normalAccept = mCount > 1 || (record && !isLive) ? true : false
        if (betsDetails.length <= 0) {
            newBetInfo = betSportContentProducer(orBetDetails, matchCount > 1, !isCancel ? false : true)
        } else if (betsDetails.length > 0 && orBetDetails.length > 0) {
            newBetInfo = betSportContentProducer2(betsDetails, orBetDetails, matchCount > 1, !isCancel ? false : true)
        } else {
            newBetInfo = betSportContentProducer(betsDetails, matchCount > 1, !isCancel ? false : true)
        }

        if (mCount > 1) {
            betMethod = matchCount + '场' + (cCount > 1 ? '复' : '单') + '式 ' + mCount + '串' + cCount
        } else {
            betMethod = newBetInfo.method
        }

        betChoice = newBetInfo.choice
        ante = round(totalAnte, 2).toFixed(2)
        maxWin = maxWinningAmount(game.gameDetail, null).toFixed(2)
        maxWinAmount = mCount > 1 && Number(maxWin) > maxPayout ? maxPayout : Number(maxWin)
        if (betAllowEarlySettle === true) {
            betConfirm = '待确认'
        } else if (!normalAccept) {
            if (betsDetails[0].sId === 1) {
                if (earlySettleDt) {
                    betConfirm = earlySettleTBC ? '待确认' : '确认'
                } else {
                    betConfirm = normalSettleTBC ? '待确认' : '确认'
                }
            } else if (betsDetails[0].sId === 2) {
                betConfirm = nowDt - betDt < SCORE_BASKETBALL_CANCEL * 1000 ? '待确认' : '确认'
            } else {
                betConfirm = '确认'
            }
        } else {
            betConfirm = '确认'
        }

        //const newUUId = uuId.substring(0, 17)

        return {
            estimatedWinnings,
            normalSettleTBC,
            sportsDetail: betChoice,
            allowEarlySettle,
            masterId,
            rowId,
        }
        //.push([id, betDate + ' ' + newUUId, betMethod, betChoice, ante, maxWinAmount, '--', betConfirm])
    }
}

function betSportContentProducer(details: any, isParlay: any, isCancel: any) {
    let choice: IConvertedSportsData[] = [],
        method = '',
        i = 0

    if (details[0].kickOffDt) {
        method = details[0].betFormTitle
        for (; i < details.length; i++) {
            const d = details[i]
            const matchScore = d.matchScore ? parseMatchLiveScore(d) : null
            const isCancel =
                (d.isMatchCancelled && d.cancelReason) ||
                (d.isCancel && d.cancelReason) ||
                (d.odds2 === 1 && d.cancelReason)
            const oldChoice = {
                // old object for sport v1
                league: d.league + '  ' + d.kickOffDt.substring(0, 10),
                matchCancelReason: isCancel ? getCancelReason(d.cancelReason) : '',
                home: d.homeTeam,
                away: d.awayTeam,
                betFormTitle: d.betFormTitle,
                betFormH: d.betFormH,
                choice: d.betFormDetail,
                odds: isParlay && betNeedAddOne(d.sType) ? (d.odds1 + 1).toFixed(2) : d.odds1,
                score: '(' + d.homeScore + ' : ' + d.awayScore + ')',
                result:
                    d.isEarlySettled || d.isCancel || d.isMatchCancelled || matchScore === null
                        ? ''
                        : '(赛果: ' + matchScore.homeScore + ' - ' + matchScore.awayScore + ')',
            }
            const noMatchScore = d.isEarlySettled || d.isCancel || d.isMatchCancelled || matchScore === null
            const settleStatus = d.isEnded || d.isEarlySettled ? statusType.SETTLE : statusType.UNSETTLE
            const cancelStatus = isCancel ? statusType.CANCEL : settleStatus
            const newStatus = isCancel ? cancelStatus : settleStatus
            const newHomeScore = matchScore && matchScore.homeScore
            const newAwayScore = matchScore && matchScore.awayScore
            const isLive = d.isLive
            const newChoice = {
                homeTeam: oldChoice.home,
                awayTeam: oldChoice.away,
                score: {
                    homeScore: newHomeScore,
                    awayScore: newAwayScore,
                    hRedCard: 0,
                    aRedCard: 0,
                },
                startTime: d.kickOffDt.substring(0, 19),
                specifier: `${oldChoice.home} v ${oldChoice.away} ${isLive ? oldChoice.score : ''}`,
                odds: oldChoice.odds,
                seasonName: d.league,
                marketName: oldChoice.betFormTitle,
                outcomeName: `${d.betFormDetail} ${d.betFormH}`,
                status: newStatus,
                sportType: sportName[d.sId],
                cancelReason: oldChoice.matchCancelReason,
                isOr: false,
            }

            choice.push(newChoice)
        }
    } else {
        method = '冠军盘口'
        for (; i < details.length; i++) {
            const d = details[i]
            const oldChoice = {
                league: d.league + ' ' + d.lastKickOffDt.substring(0, 10),
                matchCancelReason: d.isEnded && d.odds2 === 1 ? ' ' + getCancelReason(d.cancelReason) + '' : '',
                betFormTitle: d.btype,
                choice: d.bItem,
                odds: d.odds1,
            }
            const isCancel = d.isCancel || (d.isCancel && cancelReason)
            const settleStatus = d.isEnded ? statusType.SETTLE : statusType.UNSETTLE
            const newStatus = isCancel ? statusType.CANCEL : settleStatus
            const newChoice: IConvertedSportsData = {
                homeTeam: '',
                awayTeam: '',
                score: {
                    homeScore: 0,
                    awayScore: 0,
                    hRedCard: 0,
                    aRedCard: 0,
                },
                startTime: d.lastKickOffDt.substring(0, 19),
                specifier: d.title,
                odds: oldChoice.odds,
                seasonName: d.league,
                marketName: oldChoice.betFormTitle,
                outcomeName: oldChoice.choice,
                status: newStatus,
                sportType: sportName[d.sId],
                cancelReason: oldChoice.matchCancelReason,
                isOr: true,
            }
            choice.push(newChoice)
        }
    }

    return {
        method: method,
        choice: choice,
    }
}

function betSportContentProducer2(details: any, orBetDetails: any, isParlay: any, isCancel: any) {
    let choice: IConvertedSportsData[] = [],
        method = '',
        i = 0,
        j = 0,
        c = details.length
    for (; j < orBetDetails.length; j++) {
        details[details.length] = orBetDetails[j]
    }
    if (details[0].kickOffDt) {
        method = details[0].betFormTitle
        for (; i < details.length; i++) {
            let d = details[i]
            let matchScore = d.matchScore ? parseMatchLiveScore(d) : null
            if (i < c) {
                const oldChoice = {
                    league: d.league + '  ' + d.kickOffDt.substring(0, 10),
                    matchCancelReason:
                        (d.isMatchCancelled && d.cancelReason) ||
                        (d.isCancel && d.cancelReason) ||
                        (d.odds2 === 1 && d.cancelReason)
                            ? ' ' + getCancelReason(d.cancelReason) + ''
                            : '',
                    home: d.homeTeam,
                    away: d.awayTeam,
                    betFormTitle: d.betFormTitle,
                    betFormH: d.betFormH,
                    choice: d.betFormDetail,
                    odds: isParlay && betNeedAddOne(d.sType) ? (d.odds1 + 1).toFixed(2) : d.odds1,
                    score: '(' + d.homeScore + ' : ' + d.awayScore + ')',
                    result:
                        d.isCancel || d.isMatchCancelled || matchScore === null
                            ? ''
                            : '(赛果: ' + matchScore.homeScore + ' - ' + matchScore.awayScore + ')',
                }
                const noMatchScore = d.isCancel || d.isMatchCancelled || matchScore === null
                const settleStatus = d.isEnded || d.isEarlySettled ? statusType.SETTLE : statusType.UNSETTLE
                const cancelStatus = isCancel ? statusType.CANCEL : settleStatus
                const newStatus = isCancel ? cancelStatus : settleStatus
                const newChoice: IConvertedSportsData = {
                    homeTeam: '',
                    awayTeam: '',
                    score: {
                        homeScore: matchScore && matchScore.homeScore,
                        awayScore: matchScore && matchScore.awayScore,
                        hRedCard: 0,
                        aRedCard: 0,
                    },
                    startTime: d.lastKickOffDt.substring(0, 19),
                    specifier: '',
                    odds: oldChoice.odds,
                    seasonName: d.league,
                    marketName: oldChoice.betFormTitle,
                    outcomeName: oldChoice.choice,
                    status: newStatus,
                    sportType: sportName[d.sId],
                    cancelReason: oldChoice.matchCancelReason,
                    isOr: false,
                }

                choice.push(newChoice)
            } else {
                const oldChoice = {
                    league: d.league + ' ' + d.kickOffDt.substring(0, 10),
                    matchCancelReason: d.isEnded && d.odds2 === 1 ? ' ' + getCancelReason(d.cancelReason) + '' : '',
                    betFormTitle: d.btype,
                    choice: d.bItem,
                    odds: d.odds1,
                }
                const isCancel = d.isCancel || (d.isCancel && cancelReason)
                const settleStatus = d.isEnded ? statusType.SETTLE : statusType.UNSETTLE
                const newStatus = isCancel ? statusType.CANCEL : settleStatus
                const newChoice: IConvertedSportsData = {
                    homeTeam: '',
                    awayTeam: '',
                    score: {
                        homeScore: 0,
                        awayScore: 0,
                        hRedCard: 0,
                        aRedCard: 0,
                    },
                    startTime: d.lastKickOffDt.substring(0, 19),
                    specifier: '',
                    odds: oldChoice.odds,
                    seasonName: d.league,
                    marketName: oldChoice.betFormTitle,
                    outcomeName: oldChoice.choice,
                    status: newStatus,
                    sportType: sportName[d.sId],
                    cancelReason: oldChoice.matchCancelReason,
                    isOr: true,
                }
                choice.push(newChoice)
            }
        }
    }
    return {
        method: method,
        choice: choice,
    }
}

function parseMatchLiveScore(betsDetail: any) {
    let matchScore: any = { homeScore: '', awayScore: '' }
    if (checkNull(betsDetail.matchScore) !== '') {
        matchScore = JSON.parse(betsDetail.matchScore)
        if (betsDetail.sType.indexOf('ahfts') !== -1 || betsDetail.sType.indexOf('oufts') !== -1) {
            matchScore.homeScore = matchScore.homeSectionScore
            matchScore.awayScore = matchScore.awaySectionScore
        } else if (betsDetail.sType.indexOf('fglg') !== -1) {
            if (betsDetail.betDetail === 'hfg' || betsDetail.betDetail === 'afg' || betsDetail.betDetail === 'ng') {
                if (matchScore.homeScore === 'hfg') {
                    matchScore.awayScore = betsDetail.matchDetail.homeTeam
                } else if (matchScore.homeScore === 'afg') {
                    matchScore.awayScore = betsDetail.matchDetail.awayTeam
                } else if (matchScore.homeScore === 'ng') {
                    matchScore.awayScore = '无进球'
                } else {
                    matchScore.awayScore = '-'
                }
                matchScore.homeScore = '最先进球'
            } else if (betsDetail.betDetail === 'hlg' || betsDetail.betDetail === 'alg') {
                if (matchScore.awayScore === 'hlg') {
                    matchScore.awayScore = betsDetail.matchDetail.homeTeam
                } else if (matchScore.awayScore === 'alg') {
                    matchScore.awayScore = betsDetail.matchDetail.awayTeam
                } else if (matchScore.awayScore === 'ng') {
                    matchScore.awayScore = '无进球'
                } else {
                    matchScore.awayScore = ' - '
                }
                matchScore.homeScore = '最后一粒入球'
            }
        }
    }
    return matchScore
}

function winLoseStatusSportSettled(master: any) {
    let profit = master.payout - master.totalAnte
    if (master.mCount > 1 || master.betsDetails === undefined) {
        return profit === 0 ? '平局' : profit > 0 ? '赢' : '输'
    }
    let payout = master.payout
    let totalAnte = master.totalAnte
    let betDetail
    if (master.betsDetails.length > 0) {
        betDetail = master.betsDetails[0]
    } else {
        betDetail = master.orBetDetails[0]
    }
    let odds1 = betDetail.odds1
    if (
        betDetail.sType &&
        (betDetail.sType.indexOf('ah') > -1 || betDetail.sType.indexOf('ou') > -1 || betDetail.sType.indexOf('oe') > -1)
    ) {
        if (profit > 0) {
            if (payout.toFixed(2) === (totalAnte * ((odds1 + 1) / 2 + 0.5)).toFixed(2)) {
                return '赢半'
            }
            return '赢'
        } else if (profit < 0) {
            if (Math.abs(profit) === totalAnte * 0.5) {
                return '输半'
            }
            return '输'
        } else if (profit === 0) {
            return '和'
        }
    } else {
        if (profit > 0) {
            if (payout.toFixed(2) === (totalAnte * (odds1 / 2 + 0.5)).toFixed(2)) {
                return '赢半'
            }
            return '赢'
        } else if (profit < 0) {
            if (Math.abs(profit) === totalAnte * 0.5) {
                return '输半'
            }
            return '输'
        } else if (profit === 0) {
            return '和'
        }
    }
    return ''
}

function checkNull(val: any) {
    if (val === null || val === 'undefined' || val.length < 1) {
        return ''
    } else {
        return val
    }
}

function betNeedAddOne(sType: any) {
    return startsWith(sType, 'ah') || sType.indexOf('ou') > -1 || startsWith(sType, 'oe')
}

function startsWith(str: any, word: any) {
    return str.lastIndexOf(word, 0) === 0
}

function maxWinningAmount(rc: any, detailsLength: number | null) {
    let maxWinAmount

    if (rc.betDetail || rc.orDetail) return 0
    if (detailsLength !== 0 && rc.cCount === 1 && detailsLength !== rc.mCount) {
        maxWinAmount = mX1MaxWinAmount(rc) // a場b串1 a>b
    } else if (detailsLength !== 0 && rc.cCount !== 1) {
        maxWinAmount = mXcMaxWinAmount(rc) // b串c  c>1
    } else {
        maxWinAmount = mX1WinAmount(rc) // a場b串1  a=b
    }

    function mX1WinAmount(master: any) {
        const { betSportDetailEntities: betsDetails, betSportOrDetailEntities: orBetDetails } = master
        let totalOdds: any = new Decimal(1)
        let expectAmount: any = 0

        for (let i = 0; i < betsDetails.length; i++) {
            if (
                betsDetails[i]['sType'].indexOf('ah') > -1 ||
                betsDetails[i]['sType'].indexOf('ou') > -1 ||
                betsDetails[i]['sType'].indexOf('oe') > -1
            ) {
                totalOdds = totalOdds.times(new Decimal(betsDetails[i].odds1).plus(new Decimal(1)))
            } else {
                totalOdds = totalOdds.times(new Decimal(betsDetails[i].odds1))
            }
        }
        for (let i = 0; i < orBetDetails.length; i++) {
            totalOdds = totalOdds.times(new Decimal(orBetDetails[i].odds1))
        }

        expectAmount = new Decimal(master.totalAnte).times(totalOdds).minus(new Decimal(master.totalAnte))
        return expectAmount.toFixed(2).replace(/\.?0+$/, '')
    }

    function mX1MaxWinAmount(master: any) {
        const { betSportDetailEntities: betsDetails, betSportOrDetailEntities: orBetDetails } = master
        const detailsLength = betsDetails.length + orBetDetails.length
        let finalOdds = new Decimal(0)
        let oddsArr = []
        for (let i = 0; i < betsDetails.length; i++) {
            if (
                betsDetails[i]['sType'].indexOf('ah') > -1 ||
                betsDetails[i]['sType'].indexOf('ou') > -1 ||
                betsDetails[i]['sType'].indexOf('oe') > -1
            ) {
                oddsArr.push(Number(betsDetails[i]['odds1'] + 1))
            } else {
                oddsArr.push(Number(betsDetails[i]['odds1']))
            }
        }
        for (let i = 0; i < orBetDetails.length; i++) {
            oddsArr.push(Number(orBetDetails[i]['odds1']))
        }
        finalOdds = finalOdds.plus(new Decimal(calcTempOdd(oddsArr, master.mCount, 0)))

        return finalOdds
            .minus(nCr(detailsLength, master.mCount))
            .times(Number(master.ante))
            .toFixed(2)
            .replace(/\.?0+$/, '')
    }

    function mXcMaxWinAmount(master: any) {
        const { betSportDetailEntities: betsDetails, betSportOrDetailEntities: orBetDetails } = master
        const detailsLength = betsDetails.length + orBetDetails.length
        let finalOdds = new Decimal(0)
        let oddsArr = []
        for (let i = 0; i < betsDetails.length; i++) {
            if (
                betsDetails[i]['sType'].indexOf('ah') > -1 ||
                betsDetails[i]['sType'].indexOf('ou') > -1 ||
                betsDetails[i]['sType'].indexOf('oe') > -1
            ) {
                oddsArr.push(Number(betsDetails[i]['odds1'] + 1))
            } else {
                oddsArr.push(Number(betsDetails[i]['odds1']))
            }
        }
        for (let i = 0; i < orBetDetails.length; i++) {
            oddsArr.push(Number(orBetDetails[i]['odds1']))
        }
        for (let k = 2; k <= detailsLength; k++) {
            finalOdds = finalOdds.plus(new Decimal(calcTempOdd(oddsArr, k, 0)))
        }

        return finalOdds
            .minus(calc(detailsLength))
            .times(Number(master.ante))
            .toFixed(2)
            .replace(/\.?0+$/, '')
    }

    function calc(matchLen: any) {
        return Math.pow(2, matchLen) - matchLen - 1
    }

    function nCr(n: any, r: any) {
        if (r > n) {
            return 0
        }
        let result = 1
        if (~~(n / 2) + 1 > r) {
            r = n - r
        }
        for (let i = r + 1; i <= n; i++) {
            result *= i
        }
        for (let i = 1; i <= n - r; i++) {
            result /= i
        }
        return result
    }

    function calcTempOdd(oddsArr: any, k: any, i: any) {
        let resultOdds = 0

        if (i === undefined) {
            i = 0
        }

        if (k > 0) {
            let n = oddsArr.length

            for (let j = i; j <= n - k; j++) {
                resultOdds += oddsArr[j] * calcTempOdd(oddsArr, k - 1, j + 1)
            }
        } else {
            resultOdds = 1
        }

        return resultOdds
    }

    return Number(maxWinAmount)
}

function getCancelReason(val: string) {
    const newCancelReason = cancelReason[val]

    return newCancelReason ? newCancelReason : val
}

export function convertEsportDetail(game: IData) {
    const items: any = game.gameDetail?.items
    const itemsLength = items.length || 0
    const newSportDetail = []
    const newStatus: any = {
        NONE: 'UNSETTLE',
        CANCEL: 'CANCEL',
        REVOKE: 'CANCEL',
        WIN: 'WIN',
        LOSE: 'LOSE',
        WINHALF: 'WINHALF',
        LOSEHALT: 'LOSEHALF',
    }

    if (!itemsLength) {
        return null
    }

    for (let i = 0; i < itemsLength; i++) {
        const item = items[i]
        const newChoice: IConvertedSportsData = {
            homeTeam: '',
            awayTeam: '',
            match: item.match,
            score: {
                homeScore: 0,
                awayScore: 0,
                hRedCard: 0,
                aRedCard: 0,
            },
            startTime: item?.startAt,
            specifier: `${item.match} ${item.result}`,
            odds: item.odds,
            seasonName: `${item.category}/${item.league}`,
            marketName: item.bet,
            outcomeName: item.content,
            status: newStatus[item.status.toUpperCase()],
            sportType: 'esport',
            cancelReason: '',
        }

        newSportDetail.push(newChoice)
    }

    return {
        estimatedWinnings: 0,
        sportsDetail: newSportDetail,
    }
}
