import React, { useCallback } from 'react'
import styled from 'styled-components/macro'
import logo1 from '@brand/assets/images/home/footer/a.png'
import logo2 from '@brand/assets/images/home/footer/b.png'
import logo3 from '@brand/assets/images/home/footer/c.png'
import logo4 from '@brand/assets/images/home/footer/d.png'
import logo5 from '@brand/assets/images/home/footer/e.png'
import logo13 from '@brand/assets/images/home/footer/f.png'
import logo6 from '@brand/assets/images/home/footer/a1.png'
import logo7 from '@brand/assets/images/home/footer/a2.png'
import logo8 from '@brand/assets/images/home/footer/a3.png'
import logo9 from '@brand/assets/images/home/footer/a4.png'
import logo10 from '@brand/assets/images/home/footer/1.png'
import logo11 from '@brand/assets/images/home/footer/2.png'
import logo12 from '@brand/assets/images/home/footer/3.png'
import useCopyRight from '@hooks/useCopyRight'
import desktopPages from '@pages/desktop'
import { AboutSections } from '@pages/about/desktop/constants'
import { directToAgentJoin, openRule } from '@utils/v1Functions'
import { useHistory } from 'react-router-dom'

const SLayout = styled.div`
    max-width: 1300px;
    padding: 40px 0 20px 0;
    margin: auto;
`

const SIconLayout = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    & > img:not(:first-child) {
        margin-left: 8px;
    }
`

const SIcon = styled.img`
    height: 32px;
    margin-bottom: 40px;
`
const SLargeIcon = styled.img`
    height: 36px;
    margin-bottom: 40px;
`

const SDivider = styled.div`
    width: 1px;
    height: 30px;
    background-color: #dddddd;
`

const SBottomLayout = styled.div`
    width: 1024px;
    margin: 10px auto 0 auto;
    display: flex;
    justify-content: space-between;
    color: #fff;
`

const SCopyRight = styled.div`
    font-size: 12px;
`

const SLinkLayout = styled.div`
    display: flex;
`

const SLinkItem = styled.div`
    font-size: 12px;
    margin-left: 20px;
    cursor: pointer;
`

const getAboutPage = (param: string) => {
    return `${desktopPages.about.path}/${param}`
}

const HomeFooter = () => {
    const copyRight = useCopyRight()
    const history = useHistory()

    const onLinkClick = useCallback(
        (path: string) => () => {
            history.push(path)
        },
        [history],
    )

    const links = [
        {
            text: '关于我们',
            action: onLinkClick(getAboutPage(AboutSections.ABOUT_US)),
            dataQa: 'btnFooterNavItem1',
        },
        {
            text: '博彩责任',
            action: onLinkClick(getAboutPage(AboutSections.BET_RESPONSIBILITY)),
            dataQa: 'btnFooterNavItem2',
        },
        {
            text: '隐私保护',
            action: onLinkClick(getAboutPage(AboutSections.PRIVACY)),
            dataQa: 'btnFooterNavItem3',
        },
        {
            text: '规则条款',
            action: onLinkClick(getAboutPage(AboutSections.TNC)),
            dataQa: 'btnFooterNavItem4',
        },
        {
            text: '联系我们',
            action: onLinkClick(desktopPages.contactUs.path),
            dataQa: 'btnFooterNavItem5',
        },
        {
            text: '代理加盟',
            action: directToAgentJoin,
            dataQa: 'btnFooterNavItem6',
        },
        {
            text: '玩法规则',
            action: openRule,
            dataQa: 'btnFooterNavItem7',
        },
    ]

    return (
        <SLayout>
            <SIconLayout>
                <SIcon src={logo1} />
                <SIcon src={logo2} />
                <SIcon src={logo3} />
                <SIcon src={logo4} />
                <SIcon src={logo5} />
                <SIcon src={logo13} />
                <SDivider />
                <SIcon src={logo10} />
                <SIcon src={logo11} />
                <SIcon src={logo12} />
                <SLargeIcon src={logo6} />
                <SLargeIcon src={logo7} />
                <SLargeIcon src={logo8} />
                <SLargeIcon src={logo9} />
            </SIconLayout>

            <SBottomLayout>
                <SCopyRight data-qa="txtFooterCopyRight">{copyRight}</SCopyRight>
                <SLinkLayout>
                    {links.map((item, index) => {
                        return (
                            <SLinkItem key={`${item.text}-${index}`} onClick={item.action} data-qa={item.dataQa}>
                                {item.text}
                            </SLinkItem>
                        )
                    })}
                </SLinkLayout>
            </SBottomLayout>
        </SLayout>
    )
}

export default HomeFooter
