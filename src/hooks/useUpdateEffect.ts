import { useEffect, useRef } from 'react'

type UseEffect = typeof useEffect

const useUpdateEffect: UseEffect = (effect, deps) => {
    const isMounted = useRef(false)

    useEffect(() => {
        if (!isMounted.current) {
            isMounted.current = true
        } else {
            return effect()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps)
}

// eslint-disable-next-line import/no-unused-modules
export default useUpdateEffect
