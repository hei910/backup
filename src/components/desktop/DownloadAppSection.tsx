import { ReactNode } from 'react'
import styled from 'styled-components/macro'

const SSectionWrapper = styled.div`
    min-width: 455.33px;
    height: 656.83px;
    /* margin-bottom: 15px; */
    padding: 20px;
`
const STitle = styled.div`
    min-width: 124px;
    width: auto;
    display: inline-block;
    height: 45px;
    border-left: 7px solid #f9a755;
    color: #545454;
    font-weight: 700;
    padding: 5px 25px;
    text-align: center;
    ${(props) => props.theme.typography.H3Headline};
`
const SHr = styled.div`
    padding: 24px 0;

    hr {
        border: 0;
        border-top: 1px solid #ccc;
    }
`
const SContent = styled.div`
    width: 100%;
    /* height: 510px; */
    /* margin: 16px 0; */
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
            <SHr>
                <hr />
            </SHr>
            <SContent>{children}</SContent>
        </SSectionWrapper>
    )
}
