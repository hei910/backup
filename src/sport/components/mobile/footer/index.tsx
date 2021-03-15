import React from 'react'
import styled from 'styled-components/macro'
import HG3535Footer from './HG3535'

interface FooterProps {}

const SFooterLayout = styled.div`
    background: ${(props) => props.theme.sport.colors.footer.background};
    flex: 0 0 auto;
`

const SFooterContent = styled.div`
    padding: 5px;
`

const Footer: React.FC<FooterProps> = () => {
    return (
        <SFooterLayout>
            <SFooterContent>
                <HG3535Footer />
            </SFooterContent>
        </SFooterLayout>
    )
}

export default Footer
