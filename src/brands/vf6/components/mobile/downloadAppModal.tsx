import { useCallback, useState } from 'react'
import Modal, { Cross } from '@components/common/baseModal'
import styled from 'styled-components/macro'

import bgImg from '@mixins/backgroundImg'

import WLogo from '@brand/assets/images/downloadApp/mobile/6686-tiny-W.svg'
import BLogo from '@brand/assets/images/downloadApp/mobile/6686-tiny-B.svg'
import { directToDownloadApp, locationTo } from '@utils/v1Functions'
import useTranslation from '@hooks/useTranslation'
import BookmarkLink from '@brand/assets/files/6686.mobileconfig'
import { useSelector } from '@redux'
import { addDownloadCount } from '@services/download/api'

interface IDownloadAppModalProps {
    isOpen: boolean
    closeModal: () => void
}

interface IListTileProps {
    logo: string
    title: string
    subtitle: string
    onItemClick: () => void
}

const SHeader = styled(Modal.Header)`
    height: 36px;
    padding: 10px 0 0 16px;
    background-color: #f8f8f8;
    color: #3d7eeb;
    ${(props) => props.theme.typography.Body4}
`

const SBody = styled(Modal.Body)`
    padding: 8px 16px;
`

const SListTile = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 12px 0;

    &:not(:last-child) {
        border-bottom: 1px solid #f8f8f8;
    }
`

const SContent = styled.div`
    flex: 1;
`

const SLogo = styled.div<{ src: string }>`
    margin-right: 8px;
    width: 40px;
    height: 40px;
    border-radius: 5px;
    box-shadow: 0 0 6px 0 #c8c8c8;
    ${(props) => bgImg(props.src)}
`

const STitle = styled.div`
    color: #3d7eeb;
    ${(props) => props.theme.typography.Body4}
`

const SSubtitle = styled.div`
    color: #999999;
    ${(props) => props.theme.typography.Body6}
`

const SButton = styled.div`
    padding: 6px 24px;
    background-color: #3d7eeb;
    border-radius: 18px;
    color: #ffffff;
    ${(props) => props.theme.typography.Body3}
`

const SModal = styled(Modal)`
    ${Cross} {
        top: 12px;
    }
`

const ListTile: React.FC<IListTileProps> = ({ logo, title, subtitle, onItemClick }) => {
    const t = useTranslation()
    return (
        <SListTile>
            <SLogo src={logo} />
            <SContent>
                <STitle>{title}</STitle>
                <SSubtitle>{subtitle}</SSubtitle>
            </SContent>
            <SButton onClick={onItemClick}>{t('general.components.downloadAppModal.install')}</SButton>
        </SListTile>
    )
}

const DownloadAppModal: React.FC<IDownloadAppModalProps> = ({ isOpen, closeModal }) => {
    const t = useTranslation()
    const { clickRateBrandCode } = useSelector((state) => state.app.brandInfo)
    const [isBookmarkDownloaded, setIsBookmarkDownloaded] = useState(false)

    const onAppClick = useCallback(() => {
        directToDownloadApp()
    }, [])

    const onBookmarkClick = useCallback(() => {
        locationTo(BookmarkLink)
        addDownloadCount(clickRateBrandCode, BookmarkLink, true)
        setIsBookmarkDownloaded(true)
    }, [clickRateBrandCode])

    return (
        <SModal id="ios-download-app-modal" isOpen={isOpen} closeModal={closeModal}>
            <SHeader>{isBookmarkDownloaded ? t('general.components.downloadAppModal.hint') : ''}</SHeader>
            <SBody>
                <ListTile
                    logo={WLogo}
                    title={t('general.components.downloadAppModal.app.title')}
                    subtitle={t('general.components.downloadAppModal.app.subtitle')}
                    onItemClick={onAppClick}
                />
                {BookmarkLink && (
                    <ListTile
                        logo={BLogo}
                        title={t('general.components.downloadAppModal.web.title')}
                        subtitle={t('general.components.downloadAppModal.web.subtitle')}
                        onItemClick={onBookmarkClick}
                    />
                )}
            </SBody>
        </SModal>
    )
}

export default DownloadAppModal
