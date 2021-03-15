import { useCallback, useEffect, useState } from 'react'
import { useSelector } from '@redux'
import Locales from '@constants/locales'
import merge from 'lodash/merge'

const APP_PLATFORM = process.env.APP_PLATFORM

const isEmptyObject = (obj?: Object) => (!obj ? true : Object.entries(obj).length === 0 && obj.constructor === Object)

const getLocales = async (locales: Locales, page: string) => {
    let defaultLocalesMessage: any = {}
    let brandLocalesMessage: any = {}

    const localesJson = page.toLowerCase()

    try {
        defaultLocalesMessage = await import(`@locales/${locales}/${localesJson}.json`).then((module) => module.default)
    } catch (error) {
        console.log(`[getLocales] Default translate ${locales}/${page} json file undefined.`)
    }

    try {
        brandLocalesMessage = await import(`@brand/assets/locales/${locales}/${localesJson}.json`).then(
            (module) => module.default,
        )
    } catch (error) {
        console.log(`[getLocales] Brand translate ${locales}/${page} json file undefined.`)
    }

    const defaultLocalesGeneral = defaultLocalesMessage['common'] ?? {}
    const defaultPlatformLocales = defaultLocalesMessage[APP_PLATFORM] ?? {}

    const brandLocalesGeneral = brandLocalesMessage['common'] ?? {}
    const brandPlatformLocales = brandLocalesMessage[APP_PLATFORM] ?? {}

    const defaultLocales = merge(defaultLocalesGeneral, defaultPlatformLocales)
    const brandLocales = merge(brandLocalesGeneral, brandPlatformLocales)

    return merge(defaultLocales, brandLocales)
}

export default () => {
    const locale = useSelector((state) => state.app.locale)
    const [localesMessage, setLocalesMessage] = useState<Record<string, any>>({})
    const [isReady, setIsReady] = useState(false)

    const loadLocales = useCallback(
        (page: string = 'general') => {
            !localesMessage[page] &&
                getLocales(locale, page).then((response) => {
                    if (!isEmptyObject(response)) {
                        localesMessage[page] = response
                        setLocalesMessage({ ...localesMessage })
                    }
                })
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [locale],
    )

    useEffect(() => {
        loadLocales()
        loadLocales('maintenance')
        loadLocales('regionblock')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [locale])

    return { localesMessage, loadLocales, isReady, setIsReady }
}
