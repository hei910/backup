import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import styled from 'styled-components/macro'

import Tnc from './sections/tnc'
import Qna from './sections/qna'
import AboutUs from './sections/aboutUs'
import BetResponsibility from './sections/betResponsibility'
import Privacy from './sections/privacy'
import DepositHelp from './sections/depositHelp'
import WithdrawHelp from './sections/withdrawHelp'
import Sitemap from './sections/sitemap'

import { AboutSections } from './constants'

import useTranslation from '@hooks/useTranslation'

import { directToHomePage } from '@utils/v1Functions'
import BackIcon from '@images/aboutUs/icon_back@2x.png'

const SMainContainer = styled.div`
    display: flex;
    flex-direction: row;
`
const SSideTabContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    flex: 1.5;
    min-width: 208px;
    max-width: 208px;
    min-height: 100vh;
    box-shadow: 4px 0 16px 0 rgba(0, 0, 0, 0.1);
`
const SBackIcon = styled.img`
    width: 14px;
    height: auto;
    margin-right: 8px;
`

const SSideTab = styled(Link)<{ isActive: boolean }>`
    padding: 15px 0px 15px 47px;
    width: 100%;
    text-decoration: none;
    color: #000000;
    ${(props) =>
        props.isActive &&
        `
        background:${props.theme.colors.component.desktop.section.title.bgColor};
        color: ${props.theme.colors.component.desktop.section.title.color};
        border-right: 4px solid ${props.theme.colors.component.desktop.section.title.color};
    `}
`

const SBackTab = styled.div`
    padding: 20px 0px 20px 47px;
    width: 100%;
    text-decoration: none;
    color: #a8a8a8;
    cursor: pointer;
`
const SContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex: 8.5;
    margin-left: 106px;
    margin-right: 134px;
    margin-top: 62px;
`

const About = () => {
    const { tab1 } = useParams<{ tab1: AboutSections }>()
    const t = useTranslation()
    const [sectionContent, setSectionContent] = useState<any>(null)
    const [activeSection, setActiveSection] = useState(AboutSections.ABOUT_US)

    useEffect(() => {
        let sectionComponent = null
        let activeSection = tab1

        switch (tab1) {
            case AboutSections.TNC:
                sectionComponent = <Tnc />
                break
            case AboutSections.QNA:
                sectionComponent = <Qna />
                break
            case AboutSections.BET_RESPONSIBILITY:
                sectionComponent = <BetResponsibility />
                break
            case AboutSections.PRIVACY:
                sectionComponent = <Privacy />
                break
            case AboutSections.WITHDRAW_HELP:
                sectionComponent = <WithdrawHelp />
                break
            case AboutSections.DEPOSIT_HELP:
                sectionComponent = <DepositHelp />
                break
            case AboutSections.SITEMAP:
                sectionComponent = <Sitemap />
                break
            default:
                sectionComponent = <AboutUs />
                activeSection = AboutSections.ABOUT_US
        }

        setSectionContent(sectionComponent)
        setActiveSection(activeSection)
    }, [tab1])

    return (
        <SMainContainer>
            <SSideTabContainer>
                <>
                    <SBackTab onClick={directToHomePage}>
                        <SBackIcon src={BackIcon} alt={t('general.backToHome')} />
                        {t('general.backToHome')}
                    </SBackTab>
                    {Object.values(AboutSections).map((sectionName, index) => (
                        <SSideTab
                            key={`${t(`about.${sectionName}.header`)}-${index}`}
                            to={`/about/${sectionName}`}
                            isActive={sectionName === activeSection}>
                            {t(`about.${sectionName}.header`)}
                        </SSideTab>
                    ))}
                </>
            </SSideTabContainer>
            <SContentContainer>{sectionContent}</SContentContainer>
        </SMainContainer>
    )
}

export default About
