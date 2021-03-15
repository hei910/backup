import React from 'react'
import styled from 'styled-components/macro'
import Header from '@brand/components/mobile/header'
import useAppLayout from '@components/mobile/layout/hook'
import Footer from './footer'

export interface ContentContainerProps {
    headerHeight: number
    footerHeight: number
}

const LayoutContainer = styled.div`
    height: 100%;
`

const Container = styled.div<ContentContainerProps>`
    height: calc(100% - ${(props) => `${props.footerHeight}px - ${props.headerHeight}px`});
    overflow: auto;
`

const InnerContainer = styled.div`
    min-height: calc(100% - ${(props) => props.theme.vars.mobileFooterHeight});
`

const Layout: React.FC<{}> = ({ children }) => {
    const { footerRef, headerHeight, headerRef, hideFooter, hideHeader } = useAppLayout()
    return (
        <LayoutContainer>
            {!hideHeader && <Header ref={headerRef} />}
            <Container id="layout-container" headerHeight={headerHeight} footerHeight={0}>
                <InnerContainer>{children}</InnerContainer>
                {!hideFooter && <Footer ref={footerRef} />}
            </Container>
        </LayoutContainer>
    )
}

export default Layout
