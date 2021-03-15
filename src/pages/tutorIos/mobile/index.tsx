import { useEffect, useMemo } from 'react'
import styled from 'styled-components/macro'
import SectionList from './sectionList'
import PageContainer from '@components/mobile/pageContainer'

import useTranslation from '@hooks/useTranslation'

import useTutorIosInit from './hook'

import bgImg from '@mixins/backgroundImg'

import SafariIcon from '@brand/assets/images/tutorIos/mobile/safari.png'

import Ios2 from '@brand/assets/images/tutorIos/mobile/tutorial_ios02.jpg'
import Ios3 from '@brand/assets/images/tutorIos/mobile/tutorial_ios03.jpg'
import Ios4 from '@brand/assets/images/tutorIos/mobile/tutorial_ios04.jpg'
import Ios5 from '@brand/assets/images/tutorIos/mobile/tutorial_ios05.jpg'

import Ios1a from '@brand/assets/images/tutorIos/mobile/tutorial_ios01a.jpg'
import Ios2a from '@brand/assets/images/tutorIos/mobile/tutorial_ios02a.jpg'
import Ios3a from '@brand/assets/images/tutorIos/mobile/tutorial_ios03a.jpg'
import Ios4a from '@brand/assets/images/tutorIos/mobile/tutorial_ios04a.jpg'
import Ios5a from '@brand/assets/images/tutorIos/mobile/tutorial_ios05a.jpg'
import Ios6a from '@brand/assets/images/tutorIos/mobile/tutorial_ios06a.jpg'
import Ios7a from '@brand/assets/images/tutorIos/mobile/tutorial_ios07a.jpg'
import Ios8a from '@brand/assets/images/tutorIos/mobile/tutorial_ios08a.jpg'
import Ios9a from '@brand/assets/images/tutorIos/mobile/tutorial_ios09a.jpg'
import Ios10a from '@brand/assets/images/tutorIos/mobile/tutorial_ios10a.jpg'

import Ios0b from '@brand/assets/images/tutorIos/mobile/tutorial_ios00b.jpg'
import Ios1b from '@brand/assets/images/tutorIos/mobile/tutorial_ios01b.jpg'
import Ios2b from '@brand/assets/images/tutorIos/mobile/tutorial_ios02b.jpg'
import Ios3b from '@brand/assets/images/tutorIos/mobile/tutorial_ios03b.jpg'
import Ios4b from '@brand/assets/images/tutorIos/mobile/tutorial_ios04b.jpg'
import Ios5b from '@brand/assets/images/tutorIos/mobile/tutorial_ios05b.jpg'
import Ios6b from '@brand/assets/images/tutorIos/mobile/tutorial_ios06b.jpg'
import Ios7b from '@brand/assets/images/tutorIos/mobile/tutorial_ios07b.jpg'
import Ios8b from '@brand/assets/images/tutorIos/mobile/tutorial_ios08b.jpg'
import { scrollToTop } from '@utils/v1Functions'

interface IButtonProps {
    disable?: boolean
}

const StyledTutorIosPage = styled(PageContainer)`
    position: relative;
    padding: 22.5px 0 0 0;
`

const Title = styled.div`
    font-size: 22.5px;
    color: ${(props) => props.theme.colors.page.mobile.tutorIos.color};
    text-align: center;
    margin-bottom: 22.5px;
`

const Logo = styled.img`
    width: 260px;
    margin: 10px auto;
    display: block;
`

const SpecialText = styled.span`
    margin-right: 6px;
    color: ${(props) => props.theme.colors.page.mobile.tutorIos.specialColor};
`

const Remark = styled.div`
    margin: 30px 0;
    font-size: 15px;
    text-align: center;
`

const Overlay = styled.div`
    width: 100%;
    position: sticky;
    bottom: 0;
    padding: 15px;
    background: ${(props) => props.theme.colors.page.mobile.tutorIos.overlayBgColor};
`

const OverlayContent = styled.div`
    margin: 0 auto;
    max-width: 480px;
    display: flex;
    justify-content: center;
`

const Button = styled.div<IButtonProps>`
    flex: 1;
    max-width: 143px;
    margin: 0 16px 8px 16px;
    padding: 14px 0;
    color: ${(props) =>
        props.disable
            ? props.theme.colors.page.mobile.tutorIos.btnColor
            : props.theme.colors.page.mobile.tutorIos.activeBtnColor};
    border-radius: 3px;
    background: ${(props) =>
        props.disable
            ? props.theme.colors.page.mobile.tutorIos.btnBgColor
            : props.theme.colors.page.mobile.tutorIos.activeBtnBgColor};
    text-align: center;
    font-size: 14px;
    transition: 0.25s ease-in all;
`

const OverlayMessage = styled.p`
    font-size: 13px;
    color: ${(props) => props.theme.colors.page.mobile.tutorIos.overlayColor};
    margin: 0;
    letter-spacing: 0.5px;
    width: 100%;
    text-align: center;
`

const SReminder = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 16px;
`

const SSafariIcon = styled.div`
    width: 40px;
    height: 40px;
    margin-right: 8px;
    ${bgImg(SafariIcon)}
`

const imagesMap: Record<string, Array<string>> = {
    app: [Ios2, Ios3, Ios4, Ios5],
    bookmark: [Ios1a, Ios2a, Ios3a, Ios4a, Ios5a, Ios6a, Ios7a, Ios8a, Ios9a, Ios10a],
    individual: [Ios1b, Ios2b, Ios3b, Ios4b, Ios5b, Ios6b, Ios7b, Ios8b],
}

const TutorIosPage = () => {
    const t = useTranslation()
    const { type, count, onDownloadClick, onSettingClick, version } = useTutorIosInit()

    const data = useMemo(() => {
        if (type) {
            const images = imagesMap[type]
            return images.map((_, index) => ({
                title: t(`tutorIos.steps.${type}.step${index + 1}`),
                image: images[index],
                index,
            }))
        }

        return []
    }, [t, type])

    // fix safari header layout bug
    useEffect(() => {
        scrollToTop()
    }, [])

    return (
        <StyledTutorIosPage>
            <SReminder>
                <SSafariIcon />
                {t('tutorIos.reminder')}
            </SReminder>
            {type === 'individual' ? (
                <Logo data-qa="imgBrandLogo" src={Ios0b} />
            ) : (
                <Title>
                    <SpecialText>{t('tutorIos.ios')}</SpecialText>
                    {t('tutorIos.title')}
                </Title>
            )}
            <SectionList data={data} type={type} />
            <Remark data-qa="txtSupportVerIOS">{t('tutorIos.remark', { version })}</Remark>
            <Overlay>
                <OverlayContent>
                    <Button data-qa={`btn${type}DL`} onClick={onDownloadClick}>
                        {t('tutorIos.button1')}
                    </Button>
                    {type !== 'individual' && (
                        <Button data-qa="btnSettingLink" onClick={onSettingClick} disable={count >= 0}>
                            {t('tutorIos.button2a')}&nbsp;&gt;&nbsp;
                            {t('tutorIos.button2b')}&nbsp;
                            {count >= 0 ? count : ''}
                        </Button>
                    )}
                </OverlayContent>
                <OverlayMessage>{t('tutorIos.message')}</OverlayMessage>
            </Overlay>
        </StyledTutorIosPage>
    )
}

export default TutorIosPage
