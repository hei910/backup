import { Platform, ThemeName } from '@services/sportGlobal/types'
import { Theme } from './common/types'
import { mDarkTheme, mDefaultTheme, mUbsTheme } from './mobile/colors'
import mHG9393Theme from './mobile/HG9393Theme'

type ThemeType = Record<ThemeName, Theme>

const desktop: ThemeType = {
    default: mDefaultTheme,
    dark: mDarkTheme,
    ubs: mUbsTheme,
    hg9393: mHG9393Theme,
}

const mobile: ThemeType = {
    default: mDefaultTheme,
    dark: mDarkTheme,
    ubs: mUbsTheme,
    hg9393: mHG9393Theme,
}

export const theme: Record<Platform, ThemeType> = {
    desktop,
    mobile,
}
