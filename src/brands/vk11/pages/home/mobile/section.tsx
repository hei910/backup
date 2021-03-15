import styled from 'styled-components/macro'
import { ISectionProps } from './types'
import bgImg from '@mixins/backgroundImg'

const SSection = styled.div`
    width: 100%;
    padding-top: 21px;

    :first-child {
        padding-top: 0;
    }

    > div:last-child {
        position: relative;

        &::before {
            content: '';
            position: absolute;
            left: 40px;
            top: 0;
            display: block;
            background: #f5f5f5;
            width: 15px;
            height: 15px;
            transform: translate(-50%, -50%) rotate(-135deg);
        }
    }
`

const FlexContainer = styled.div`
    display: flex;
`

const SectionTop = styled(FlexContainer)<{ bg: string }>`
    height: 56px;
    justify-content: space-between;
    ${(props) => bgImg(props.bg, 'cover', 'no-repeat', 'center center')};
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
`

const SectionTitle = styled(FlexContainer)`
    align-items: center;
`

const SectionMainTitle = styled.div`
    ${(props) => props.theme.typography.Subtitle1}
    color: white;
    margin-left: 22px;
`

const Section: React.FC<ISectionProps> = ({ topHeaderBg, mainTitle, children }) => {
    return (
        <SSection>
            <SectionTop bg={topHeaderBg}>
                <SectionTitle>
                    <SectionMainTitle>{mainTitle}</SectionMainTitle>
                </SectionTitle>
            </SectionTop>
            {children}
        </SSection>
    )
}

export default Section
