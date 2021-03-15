// eslint-disable-next-line import/no-named-as-default
import i18n from 'i18next'
import locale_en_US from '@sport/locale/en-US.json'
import locale_id from '@sport/locale/id.json'
import locale_zh_CN from '@sport/locale/zh-CN.json'
import locale_zh_TW from '@sport/locale/zh-TW.json'
import { initReactI18next } from 'react-i18next'
import store from '@redux'
import { Language } from '@services/sportGlobal/types'

i18n.use(initReactI18next).init({
    lng: localStorage.getItem('language') || store?.getState().sportGlobal.language,
    fallbackLng: Language.zh_CN,
    resources: {
        [Language.zh_CN]: {
            translation: locale_zh_CN,
        },
        [Language.zh_TW]: {
            translation: locale_zh_TW,
        },
        [Language.en_US]: {
            translation: locale_en_US,
        },
        [Language.id]: {
            translation: locale_id,
        },
    },
})

export default i18n
