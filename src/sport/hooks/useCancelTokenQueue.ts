import axios, { CancelToken, CancelTokenSource } from 'axios'
import { useEffect, useRef, useState } from 'react'
import { randomNumber } from '@sport/util/general'

const useCancelTokenQueue = (updateRef: any = randomNumber().toString()): any => {
    const [queue, setQueue] = useState<CancelTokenSource[]>([])
    const [init, setInit] = useState(false)
    const prevUpdateRef = useRef()

    const getCancelToken = (): CancelToken => {
        const cancelToken = axios.CancelToken
        const cancelSource = cancelToken.source()

        setQueue([...queue, cancelSource])
        return cancelSource.token
    }

    const cancelAll = () => {
        while (queue.length > 0) {
            queue.shift()?.cancel()
        }
    }

    useEffect(() => {
        init && prevUpdateRef.current !== updateRef && cancelAll()
        prevUpdateRef.current = updateRef

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [updateRef])

    useEffect(() => {
        prevUpdateRef !== undefined && setInit(true)
    }, [prevUpdateRef])

    return { getCancelToken, cancelAll }
}

export default useCancelTokenQueue
