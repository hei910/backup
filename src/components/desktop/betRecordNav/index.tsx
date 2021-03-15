import { useState } from 'react'
import { Collapse } from 'react-collapse'
import { betRecordUi } from '@utils/v1Functions'
import styled from 'styled-components/macro'
import arrow from '@brand/assets/images/betRecord/desktop/arrow_down.png'
import NavMap from './navList'
import bgImg from '@mixins/backgroundImg'

import { Link, useParams } from 'react-router-dom'

const Block = styled.div`
    .ReactCollapse--collapse {
        transition: height 0.3s ease;
    }
`
const PADDINGLEVEL = 15

const BlockTitle = styled.div<{ level: number; active: string }>`
    user-select: none;
    font-size: 16px;
    font-weight: bold;
    background: ${(props) =>
        props.active === 'true'
            ? props.theme.colors.component.desktop.betRecordNav.activeBlockBgColor
            : props.theme.colors.component.desktop.betRecordNav.blockBgColor};
    padding-left: ${(props) => props.level * PADDINGLEVEL + 'px'};
    padding-right: 10px;
    color: ${(props) =>
        props.active === 'true'
            ? props.theme.colors.component.desktop.betRecordNav.activeBlockColor
            : props.theme.colors.component.desktop.betRecordNav.blockColor};
    width: 100%;
    height: 35px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    border-bottom: 1px solid ${(props) => props.theme.colors.component.desktop.betRecordNav.border};

    :hover {
        background-color: ${(props) => !props.active && props.theme.colors.component.desktop.betRecordNav.hoverBgColor};
    }
`
const TitleLink = styled(Link)<{ level: number; active: string }>`
    text-decoration: none;
    user-select: none;
    font-size: 16px;
    background: ${(props) =>
        props.active === 'true'
            ? props.theme.colors.component.desktop.betRecordNav.activeBgColor
            : props.theme.colors.component.desktop.betRecordNav.bgColor};
    padding-left: ${(props) => props.level * PADDINGLEVEL + 'px'};
    padding-right: 10px;
    color: ${(props) =>
        props.active === 'true'
            ? props.theme.colors.component.desktop.betRecordNav.activeColor
            : props.theme.colors.component.desktop.betRecordNav.color};
    width: 100%;
    height: 35px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    border-bottom: 1px solid ${(props) => props.theme.colors.component.desktop.betRecordNav.border};

    :hover {
        background-color: ${(props) => props.active && props.theme.colors.component.desktop.betRecordNav.hoverBgColor};
    }
`
const ListTitle = styled.div`
    background: ${(props) => props.theme.colors.component.desktop.betRecordNav.titleBgColor};
    color: ${(props) => props.theme.colors.component.desktop.betRecordNav.titleColor};
    width: 100%;
    height: 35px;
    display: flex;
    align-items: center;
    padding-left: 15px;
    font-weight: 800;
`
const OuterContainer = styled.div`
    min-width: 166.66px;
    width: 18.5%;
    max-width: 240px;
`
const ArrowDownIcon = styled.div`
    width: 10px;
    height: 7px;
    ${bgImg(arrow, 'contain')}
`

const NavItem = ({ navData, level = 1, isToggle = true, currentSection }: any) => {
    const [toggled, setToggled] = useState(isToggle)
    const toggleHandler = () => {
        setToggled(!toggled)
    }

    const buttonHandler = () => {
        if (navData.link) {
            betRecordUi(navData.link)
        }
    }

    const active = (navData.child && toggled) || currentSection === navData.id

    return (
        <Block>
            {navData.child ? (
                <BlockTitle onClick={() => toggleHandler()} level={level} active={active.toString()}>
                    {navData.title}
                    {navData.child && <ArrowDownIcon />}
                </BlockTitle>
            ) : (
                <TitleLink
                    to={`/betRecord/${navData.id}`}
                    onClick={() => buttonHandler()}
                    level={level}
                    active={active.toString()}>
                    {navData.title}
                </TitleLink>
            )}
            {navData.child && (
                <Collapse isOpened={toggled}>
                    {navData.child.map(
                        (item: any, index: number) =>
                            item.title && (
                                <NavItem
                                    navData={item}
                                    level={level + 1}
                                    key={item.title + index}
                                    currentSection={currentSection}
                                />
                            ),
                    )}
                </Collapse>
            )}
        </Block>
    )
}

export default () => {
    const { section } = useParams<{ section: string }>()
    return (
        <OuterContainer>
            <ListTitle>{NavMap.title}</ListTitle>
            {NavMap.child.map((e) => (
                <NavItem navData={e} key={NavMap.title} currentSection={section} />
            ))}
        </OuterContainer>
    )
}
