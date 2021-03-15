import { useCallback, useEffect } from 'react'
import { useDispatch } from '@sport/stores'
import { switchTheme } from '@services/sportGlobal/actions'

const useThemeController = () => {
    const dispatch = useDispatch()
    const colorSchemeQuery = window.matchMedia('(prefers-color-scheme: dark)')

    const setTheme = useCallback(() => {
        ;(!process.env.NODE_ENV || process.env.NODE_ENV === 'development') &&
            dispatch(switchTheme(colorSchemeQuery.matches ? 'dark' : 'default'))
    }, [colorSchemeQuery.matches, dispatch])

    useEffect(() => {
        colorSchemeQuery.addListener(setTheme)
        return () => {
            colorSchemeQuery.removeListener(setTheme)
        }
    }, [colorSchemeQuery, setTheme])

    useEffect(() => {
        // setTheme();
    }, [setTheme])
}

export default useThemeController
