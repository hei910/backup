import styled from 'styled-components/macro'

const SectionContainer = styled.div`
    width: 380px;
    margin: 0 auto;

    & + & {
        margin-top: 24px;
    }
`

const SectionTitle = styled.div`
    ${(props) => props.theme.typography.Subtitle2}
    color: ${(props) => props.theme.colors.brand};
    margin-bottom: 20px;
`

const Section: React.FC<{ title: string }> = ({ title, children }) => (
    <SectionContainer>
        <SectionTitle>{title}</SectionTitle>
        {children}
    </SectionContainer>
)

export default Section
