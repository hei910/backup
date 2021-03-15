import BrandLocales from '@brand/assets/locales'
import Locales from '@constants/locales'
import zhCN from './zh_CN.json'
import merge from 'lodash/merge'

import { AppMessages } from './types'

const appMessages: AppMessages = {
    [Locales.ZH_CN]: zhCN,
}

const locales: AppMessages = Object.values(Locales).reduce((messages: any, locale: Locales) => {
    return {
        ...messages,
        [locale]: merge(appMessages[locale], BrandLocales[locale]),
    }
}, {})

export default locales
