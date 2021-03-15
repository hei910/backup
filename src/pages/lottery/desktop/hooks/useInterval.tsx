import { IGameDetail, IFullInterval, ICustomizedInterval } from '@pages/lottery/desktop/types'
import { useEffect, useState } from 'react'
import useTranslation from '@hooks/useTranslation'

export default (detail?: IGameDetail | null) => {
    const t = useTranslation();
    const [fullInterval, setFullInterval] = useState<IFullInterval>({
        issueString: t('lottery.lotoInterval.issue', { issue: '--' }),
        intervalString: t('lottery.lotoInterval.interval', { intervalNum: '--', timeUnit: '', totalNum: '--' })
    })
    const [customizedInterval, setCustomizedInterval] = useState<ICustomizedInterval>({
        customIssue: '--',
        customInterval: '--',
        customTimeUnit: '',
        customTotal: '--',
        isMarkSix: false,
        markSixMonth: 0,
        markSixDay: 0,
    })


    useEffect(() => {
        if (!detail) return () => console.log(`useInterval failed`)

        const { gameCode, interval, issue, total, time } = detail
        let timeUnit: string = '',
            seconds: number = 0,
            issueString: string = t('lottery.lotoInterval.issue', { issue: '--' }),
            intervalString: string = t('lottery.lotoInterval.interval', { intervalNum: ' -- ', timeUnit: '', totalNum: ' -- ' })
        let intervalNum: string = ' -- ',
            totalNum: string = ' -- ',
            isMarkSix: boolean = false,
            markSixMonth: number | string = 0,
            markSixDay: number | string = 0

        const setMode = (time: string, second: number) => {
            timeUnit = time
            seconds = second
        }

        const handleCommonInterval = () => {
            if (!interval || interval === 0) return;
            if (interval >= 86400) setMode(t('lottery.lotoInterval.day'), 86400)
            else if (interval >= 120) setMode(t('lottery.lotoInterval.minute'), 60)
            else setMode(t('lottery.lotoInterval.second'), 1)

            intervalNum = interval ? `${Math.floor(interval / seconds)}` : '--'
            totalNum = total ? `${total}` : '--'

            intervalString = t('lottery.lotoInterval.interval', { intervalNum, timeUnit, totalNum })
            issueString = t('lottery.lotoInterval.issue', { issue })
        }

        const handleMarkSix = () => {
            let dates = time.split(' ')[0].split('-')
            isMarkSix = true
            markSixMonth = parseInt(dates[1], 10) || '--'
            markSixDay = parseInt(dates[2], 10) || '--'
            // intervalString = markSixMonth + '月' + markSixDay + '日开奖'
            intervalString = t('lottery.lotoInterval.markSixInterval', { markSixMonth, markSixDay })
        }

        // most case
        handleCommonInterval()

        // mark six
        if (gameCode === 69 && time && time !== '0') handleMarkSix()

        setFullInterval({
            intervalString,
            issueString,
        })

        setCustomizedInterval({
            customIssue: issue || '--',
            customInterval: intervalNum,
            customTimeUnit: timeUnit,
            customTotal: totalNum,
            isMarkSix,
            markSixMonth,
            markSixDay,
        })
    }, [detail, t])

    return {
        fullInterval,
        customizedInterval,
    }
}
