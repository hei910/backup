import { useInterval } from '@sport/hooks/useInterval'
import React, { useEffect, useState } from 'react'

type MovingTimerProps = {
    currentTime: string
    className?: string
    staticTimer?: string
}

const MovingTimer: React.FC<MovingTimerProps> = ({ currentTime, className, staticTimer = false }) => {
    const [time, setTime] = useState(currentTime)

    useInterval(() => {
        let newTime = ''
        let mm = parseInt(time.split(':')[0])
        let ss = parseInt(time.split(':')[1])
        if (ss + 1 >= 60) {
            newTime += '00'
            mm++
        } else {
            ss += 1
            if (ss < 10) {
                newTime += `0${ss}`
            } else {
                newTime += ss
            }
        }

        if (mm < 10) {
            newTime = `0${mm}:${newTime}`
        } else {
            newTime = `${mm}:${newTime}`
        }

        setTime(newTime)
    }, 1000)

    useEffect(() => {
        setTime(currentTime)
    }, [currentTime])

    return <span className={className}>{time}</span>
}

export default MovingTimer
