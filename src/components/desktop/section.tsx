import { ReactNode } from 'react'
import styled from 'styled-components/macro'

const SSectionWrapper = styled.div`
    width: 100%;
    margin-bottom: 15px;
`
const STitle = styled.div`
    min-width: 124px;
    width: auto;
    display: inline-block;
    height: 36px;
    border-radius: 19px;
    background-color: ${(props) => props.theme.colors.component.desktop.section.title.bgColor};
    color: ${(props) => props.theme.colors.component.desktop.section.title.color};
    padding: 5px 25px;
    text-align: center;
    ${(props) => props.theme.typography.Subtitle2}
`

const SContent = styled.div`
    width: 100%;
    margin-top: 15px;
    ${(props) => props.theme.typography.Body3}
`

interface ISectionProps {
    title?: string
    children: ReactNode
}

export default ({ title, children }: ISectionProps) => {
    return (
        <SSectionWrapper>
            {title && <STitle>{title}</STitle>}
            <SContent>{children}</SContent>
        </SSectionWrapper>
    )
}
