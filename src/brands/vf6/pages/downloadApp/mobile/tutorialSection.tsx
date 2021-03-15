import styled from 'styled-components/macro'

import TutorialImg from '@brand/assets/images/downloadApp/mobile/turto.png'
import useTranslation from '@hooks/useTranslation'

interface ITutorialSectionProps {
    version: string
}

const STutorialSection = styled.div``

const SVersionHint = styled.div`
    margin-top: 28px;
    padding: 8px 0;
    border-radius: 18px;
    box-shadow: 0 0 16px 0 #bed7ff;
    background-color: #ffffff;
    color: #3d7eeb;
    text-align: center;
    ${(props) => props.theme.typography.Body3}
`

const SDescription = styled.div`
    margin-top: 8px;
    color: #194da3;
    text-align: center;
    ${(props) => props.theme.typography.Body4}
`

const STutorialImg = styled.img`
    width: 100%;
    margin-top: 8px;
`

const TutorialSection: React.FC<ITutorialSectionProps> = ({ version }) => {
    const t = useTranslation()

    return (
        <STutorialSection>
            <SVersionHint>{t('downloadApp.versionHint', { version })}</SVersionHint>
            <SDescription>{t('downloadApp.description')}</SDescription>
            <STutorialImg src={TutorialImg} />
        </STutorialSection>
    )
}

export default TutorialSection
