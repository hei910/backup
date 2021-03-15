import { useCallback, useMemo } from 'react'
import { useSelector } from '@redux'
import { useHistory } from 'react-router-dom'
import { AboutSections } from '@pages/about/desktop/constants'
import desktopPages from '@pages/desktop'
import { directToAgentJoin } from '@utils/v1Functions'
import useTranslation from '@hooks/useTranslation'

const getAboutPage = (param: string) => {
    return `about/${param}`
}

export default () => {
    const csLink = useSelector((state) => state.app.brandInfo.csLink)
    const history = useHistory()
    const t = useTranslation()

    const onLinkClick = useCallback(
        (path: string) => () => {
            history.push(path)
        },
        [history],
    )

    const onCsLinkClick = useCallback(() => {
        window.open(csLink)
    }, [csLink])

    return useMemo(
        () => ({
            aboutUs: {
                title: t('general.components.footer.aboutUs'),
                onClick: onLinkClick(getAboutPage(AboutSections.ABOUT_US)),
            },
            tnc: {
                title: t('general.components.footer.tnc'),
                onClick: onLinkClick(getAboutPage(AboutSections.TNC)),
            },
            qna: {
                title: t('general.components.footer.qna'),
                onClick: onLinkClick(getAboutPage(AboutSections.QNA)),
            },
            sitemap: {
                title: t('general.components.footer.sitemap'),
                onClick: onLinkClick(getAboutPage(AboutSections.SITEMAP)),
            },
            contactUs: {
                title: t('general.components.footer.contactUs'),
                onClick: onLinkClick(desktopPages.contactUs.path),
            },
            betResponsibility: {
                title: t('general.components.footer.betResponsibility.title'),
                onClick: onLinkClick(getAboutPage(AboutSections.BET_RESPONSIBILITY)),
            },
            liveChat: {
                title: t('general.components.footer.liveChat'),
                onClick: onCsLinkClick,
            },
            agentJoin: {
                title: t('general.components.footer.agentJoin'),
                onClick: directToAgentJoin,
            },
            privacy: {
                title: t('general.components.footer.privacy'),
                onClick: onLinkClick(getAboutPage(AboutSections.PRIVACY)),
            },
            privacyAlt: {
                title: t('general.components.footer.privacyAlt'),
                onClick: onLinkClick(getAboutPage(AboutSections.PRIVACY)),
            },
            depositHelp: {
                title: t('general.components.footer.depositHelp'),
                onClick: onLinkClick(getAboutPage(AboutSections.DEPOSIT_HELP)),
            },
            withdrawHelp: {
                title: t('general.components.footer.withdrawHelp'),
                onClick: onLinkClick(getAboutPage(AboutSections.WITHDRAW_HELP)),
            },
        }),
        [onCsLinkClick, onLinkClick, t],
    )
}
