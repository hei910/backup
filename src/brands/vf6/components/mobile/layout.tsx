import styled from 'styled-components/macro'
import Footer from './footer'
import Header from './header'
import { ContentContainerProps } from '@components/mobile/layout'

import useAppLayout from '@components/mobile/layout/hook'

const Container = styled.div<ContentContainerProps>`
    height: calc(100% - ${(props) => `${props.headerHeight}px - ${props.footerHeight}px`});
    overflow: ${(props) => (props.shouldDisableScroll ? 'hidden' : 'auto')};
`

const Layout: React.FC<{}> = ({ children }) => {
    const { headerRef, headerHeight, hideFooter, hideHeader, shouldDisableScroll } = useAppLayout()

    return (
        <>
            {!hideHeader && <Header ref={headerRef} />}
            <Container
                id="layout-container"
                headerHeight={headerHeight}
                footerHeight={0}
                shouldDisableScroll={shouldDisableScroll}>
                {children}
                {!hideFooter && <Footer />}
            </Container>
        </>
    )
}

export default Layout
