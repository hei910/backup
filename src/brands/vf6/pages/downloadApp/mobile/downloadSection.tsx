import styled from 'styled-components/macro'
import bgImg from '@mixins/backgroundImg'

import Banner from './banner'

import Logo from '@brand/assets/images/downloadApp/mobile/logo-6686@3x.png'
import DownArrow from '@brand/assets/images/downloadApp/mobile/down-arrow.svg'
import useTranslation from '@hooks/useTranslation'

interface IDownloadSectionProps {
    isDownloaded: boolean
    onDownloadClick: () => void
    onSettingClick: () => void
}

const SDownloadSection = styled.div``

const SLogo = styled.div`
    width: 260px;
    height: 95px;
    margin: 0 auto;
    ${bgImg(Logo)}
`

const SButton = styled.div`
    margin: 16px 8px 8px 8px;
    padding: 12px 0;
    box-shadow: 0 6px 16px 0 #a0b6ff;
    border: solid 2px #9fc3ff;
    border-radius: 30px;
    background-image: linear-gradient(to bottom, #448aff, #448aff);
    color: #ffffff;
    text-align: center;
    ${(props) => props.theme.typography.Body1}
`

const SConfirmHint = styled.div`
    color: #333333;
    text-align: center;
    ${(props) => props.theme.typography.Body4}
`

const SConfirm = styled.span`
    color: #448aff;
`

const SHint = styled.div`
    margin-top: 24px;
    color: #448aff;
    text-align: center;
    ${(props) => props.theme.typography.Body4}
`

const SDownArrow = styled.div`
    margin: 4px auto;
    height: 21px;
    ${bgImg(DownArrow, 'contain')}
`

const DownloadSection: React.FC<IDownloadSectionProps> = ({ isDownloaded, onDownloadClick, onSettingClick }) => {
    const t = useTranslation()

    return (
        <SDownloadSection>
            <SLogo />
            <Banner />
            <SButton onClick={onDownloadClick}>{t('downloadApp.install')}</SButton>
            {isDownloaded && (
                <SConfirmHint>
                    {t('downloadApp.confirmMessage')}{' '}
                    <SConfirm onClick={onSettingClick}>{t('downloadApp.confirm')}</SConfirm>
                </SConfirmHint>
            )}
            <SHint>{t('downloadApp.hint')}</SHint>
            <SDownArrow />
        </SDownloadSection>
    )
}

export default DownloadSection
