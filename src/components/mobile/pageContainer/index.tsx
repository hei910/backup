import styled from 'styled-components/macro'

interface PageContainerProps {
    className?: string
}

const AppContainer = styled.div`
    padding: 0 ${props => props.theme.vars.containerPadding} 28px;
`

export const FullWidthContainer = styled.div`
    margin: 0 -${props => props.theme.vars.containerPadding};
`

const PageContainer: React.FC<PageContainerProps> = ({ children, className }) => {
    return <AppContainer className={className}>{children}</AppContainer>
}

export default PageContainer
