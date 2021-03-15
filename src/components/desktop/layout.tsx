import styled from 'styled-components/macro'
import { useLocation } from 'react-router-dom'

const MainContainer = styled.main<{ removeMinHeight: boolean; removeMinWidth: boolean }>`
    min-height: ${(props) =>
        props.removeMinHeight ? 'auto' : `calc(100vh - ${props.theme.vars.desktopHeaderHeight})`};
    ${(props) =>
        process.env.APP_PLATFORM === 'desktop' &&
        !props.removeMinWidth &&
        `min-width: ${props.theme.vars.desktopBreakpointWidth}`};
    position: relative;
`

const Layout: React.FC<{}> = ({ children }) => {
    const location = useLocation()
    // when brand is vf6 and index page, remove the min-height in mainContainer
    const shouldRemoveMinHeight = () => {
        if (location.pathname === '/' && process.env.BRAND_CODE === 'vf6') {
            return true
        }

        return false
    }

    const shouldRemoveMinWidth = () => {
        if (location.pathname === '/' && process.env.BRAND_CODE === 'vf6') {
            return true
        }

        return false
    }

    return (
        <MainContainer removeMinHeight={shouldRemoveMinHeight()} removeMinWidth={shouldRemoveMinWidth()}>
            {children}
        </MainContainer>
    )
}

export default Layout
