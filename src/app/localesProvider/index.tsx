import React, { createContext } from 'react'
import useLocales from './hook'

type ILocalesContext = ReturnType<typeof useLocales>

export const LocalesContext = createContext<ILocalesContext>({
    localesMessage: {},
    loadLocales: () => {},
    isReady: false,
    setIsReady: () => {},
})

const LocalesProvider: React.FC<{}> = ({ children }) => {
    const locales = useLocales()
    return <LocalesContext.Provider value={locales}>{children}</LocalesContext.Provider>
}

export default LocalesProvider
