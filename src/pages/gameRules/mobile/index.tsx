import { useMemo } from 'react'
import PageContainer, { FullWidthContainer } from '@components/mobile/pageContainer'
import styled from 'styled-components/macro'
import { NavLink, useLocation } from 'react-router-dom'
import useTranslation from '@hooks/useTranslation'
import HtmlContainer from './htmlContainer'
import GoToTop from '@components/mobile/goToTop.tsx'
import Sports from './sports'
import GeneralRules from './generalRules'
import AppBar from '@components/mobile/appbar'

const TabBar = styled(FullWidthContainer)`
    display: flex;
    align-items: stretch;
    height: 53px;
    background-color: #ffffff;
    box-shadow: ${(props) => props.theme.colors.page.mobile.gameRules.tabShadow};
`

const SAppBar = styled(AppBar)`
    box-shadow: none;
`

const Tab = styled(NavLink)`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    color: ${(props) => props.theme.colors.component.common.tab.color};
    border-top: 3px solid transparent;
    border-bottom: 3px solid transparent;
    ${(props) => props.theme.typography.Body3}

    &.active {
        border-bottom: 3px solid ${(props) => props.theme.colors.component.common.tab.activeBorder};
        color: ${(props) => props.theme.colors.component.common.tab.activeColor};
    }
`

const GameRulesPage = () => {
    const t = useTranslation()
    const location = useLocation()
    const category = useMemo(() => location.pathname.split('/').slice(-1)[0], [location.pathname])
    const tabs = useMemo(() => ['sports', 'liveCasino', 'casino', 'lottery'], [])

    return (
        <PageContainer>
            <SAppBar title={t('gameRules.title')} isBackToHome />
            <TabBar>
                {tabs.map((tab) => (
                    <Tab key={tab} to={`/gameRules/${tab === 'sports' ? '' : tab}`} exact>
                        {t(`gameRules.${tab}`)}
                    </Tab>
                ))}
            </TabBar>
            <HtmlContainer>
                {category === '' || category === 'gameRules' ? <Sports /> : <GeneralRules category={category} />}
            </HtmlContainer>
            <GoToTop />
        </PageContainer>
    )
}

export default GameRulesPage
