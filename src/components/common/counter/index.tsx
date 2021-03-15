import { useInterval } from '@hooks/useInterval'
import { useEffect, useState } from 'react'

type ComponentProps = {
    currentTime: string
    className?: string
    staticTimer?: boolean
}


// const sportConfig: Dictionary<SportConfig> = {
//     football: {
//         countMode: 'countUp',
//     },
//     basketball: {
//         countMode: 'countDown',
//     },
// }

const toMS = (cTime: string) => [parseInt(cTime.split(':')[0]), parseInt(cTime.split(':')[1])]

const countUp = (minute: number, second: number) => {
    const nextMinute = `0${second + 1 >= 60 ? minute + 1 : minute}`
    const nextSecond = `0${second + 1 >= 60 ? 0 : second + 1}`

    return `${nextMinute.substr(-2)}:${nextSecond.substr(-2)}`
}

// const countDown = (minute: number, second: number) => {
//     if (minute === 0 && second === 0) return '00:00'

//     const nextMinute = `0${second === 0 ? minute - 1 : minute}`
//     const nextSecond = `0${second === 0 ? 59 : second - 1}`

//     return `${nextMinute.substr(-2)}:${nextSecond.substr(-2)}`
// }

const MovingTimer: React.FC<ComponentProps> = ({ currentTime, className, staticTimer = false }) => {
    const [time, setTime] = useState(currentTime)

    // const config = sportConfig[sport ?? '']

    useEffect(() => {
        setTime(currentTime)
    }, [currentTime])

    useInterval(() => {
        const [mm, ss] = toMS(time)

        if (staticTimer) return

        const newTime = countUp(mm, ss)

        setTime(newTime)
    }, 1000)

    useEffect(() => {
        setTime(currentTime)
    }, [currentTime])

    return <span className={className}>{time}</span>
}

export default MovingTimer
