import AppBar from '@components/mobile/appbar'
import PageContainer from '@components/mobile/pageContainer'
import styled from 'styled-components/macro'
import DownloadSection from './downloadSection'
import TutorialSection from './tutorialSection'

import useDownloadApp from './hook'

import bgImg from '@mixins/backgroundImg'

import Bg from '@brand/assets/images/downloadApp/mobile/bg.jpg'
import useTranslation from '@hooks/useTranslation'

const SPageContainer = styled(PageContainer)`
    ${bgImg(Bg, 'cover')}
`

const SLayout = styled.div`
    max-width: 520px;
    margin: 0 auto;
`

const DownloadAppPage: React.FC = () => {
    const t = useTranslation()
    const { version, isDownloaded, onDownloadClick, onSettingClick } = useDownloadApp()

    return (
        <SPageContainer>
            <AppBar title={t('downloadApp.title')} isBackToHome />
            <SLayout>
                <DownloadSection
                    isDownloaded={isDownloaded}
                    onDownloadClick={onDownloadClick}
                    onSettingClick={onSettingClick}
                />
                <TutorialSection version={version} />
            </SLayout>
        </SPageContainer>
    )
}

export default DownloadAppPage
