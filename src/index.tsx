import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components/macro'
import { ModalProvider } from 'styled-react-modal'

import store, { useSelector } from './store'
import App from './app'

import AppOverlay from '@components/common/overlay'

import GlobalStyle from '@styles/global'
import { getMergeTheme } from '@styles/theme'

const ThemeLayout = ({ children }: any) => {
    const sportTheme = useSelector((state) => state.sportGlobal.theme)

    // theme.sport = sportTheme

    return <ThemeProvider theme={getMergeTheme(sportTheme)}>{children}</ThemeProvider>
    // return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

ReactDOM.render(
    <Provider store={store}>
        <ThemeLayout>
            <ModalProvider backgroundComponent={AppOverlay}>
                <GlobalStyle />
                <App />
            </ModalProvider>
        </ThemeLayout>
    </Provider>,
    document.getElementById('root'),
)
