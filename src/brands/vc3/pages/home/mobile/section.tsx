import styled from 'styled-components/macro'
import { ISectionProps } from './types'
import useTranslation from '@hooks/useTranslation'

const SSection = styled.div`
    width: 100%;
    padding-top: 21px;

    :first-child {
        padding-top: 0;
    }
`

const FlexContainer = styled.div`
    display: flex;
`

const SectionTop = styled(FlexContainer)`
    justify-content: space-between;
    padding-bottom: 8px;
`

const SectionTitle = styled(FlexContainer)`
    align-items: center;
`

const ColorMargin = styled.div`
    height: 100%;
    width: 0;
    border: 2px solid #0c186c;
    border-radius: 2.5px;
`

const SectionMainTitle = styled.div`
    ${(props) => props.theme.typography.Subtitle1}
    color: #0c186c;
    margin-left: 5px;
`

// const SectionSubTitle = styled.div`
//     ${(props) => props.theme.mixins.typography(10, 10, '600')}
//     color: #0c186c;
//     background-image: linear-gradient(to bottom, #e4ddcb 97%, #ccae7d -1%);
//     border-radius: 10px;
//     padding: 3px 5px;
//     margin-left: 10px;
// `

// const Value = styled.div`
//     ${(props) => props.theme.typography.Body2}
//     margin-left: 5px;
//     color: #d8d8d8;
// `

const DirectLink = styled(FlexContainer)`
    ${(props) => props.theme.typography.Subtitle5}
    align-items: center;
    color: #666666;
`

const Section: React.FC<ISectionProps> = ({ mainTitle, children }) => {
    const t = useTranslation()

    return (
        <SSection>
            <SectionTop>
                <SectionTitle>
                    <ColorMargin />
                    <SectionMainTitle>{mainTitle}</SectionMainTitle>
                </SectionTitle>
                <DirectLink>{`${t('home.directToText')}  >`}</DirectLink>
            </SectionTop>
            {children}
        </SSection>
    )
}

export default Section
