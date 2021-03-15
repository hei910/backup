import styled from 'styled-components/macro'
import Footer from '../footer'
import Header from '../header'

import useAppLayout from './hook'

export interface ContentContainerProps {
    headerHeight: number
    footerHeight: number
    shouldDisableScroll: boolean
}

const LayoutContainer = styled.div`
    min-height: 100%;
`

const Container = styled.div<ContentContainerProps>`
    min-height: calc(100% - ${(props) => `${props.footerHeight}px - ${props.headerHeight}px`});
    ${(props) => props.shouldDisableScroll && 'overflow: hidden;'}
`

const Layout: React.FC<{}> = ({ children }) => {
    const {
        headerRef,
        footerRef,
        headerHeight,
        footerHeight,
        hideSubheader,
        hideHeader,
        hideFooter,
        shouldDisableScroll,
        isHeaderLogoCenter,
    } = useAppLayout()

    return (
        <LayoutContainer>
            {!hideHeader && <Header ref={headerRef} hideSubheader={hideSubheader} isCenter={isHeaderLogoCenter} />}
            <Container
                headerHeight={headerHeight}
                footerHeight={footerHeight}
                shouldDisableScroll={shouldDisableScroll}>
                {children}
            </Container>
            {!hideFooter && <Footer ref={footerRef} />}
        </LayoutContainer>
    )
}

export default Layout
