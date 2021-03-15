/* eslint-disable indent */
import { ArrowUpIcon, IconWrapper } from '@sport/components/icons'
import React, { memo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled, { css } from 'styled-components/macro'

interface ComponentProps {
    title: string
    defaultShow?: boolean
    children?: any
    rightSide?: JSX.Element | React.FC
    isDetail?: boolean
    isEps?: boolean
    isCorner?: boolean
    cornerScore?: string
    onClick?: () => void
}

const STableTitleContainer = styled.div<{ isDetail?: boolean; isEps?: boolean }>`
    width: 100%;
    background: ${(props) => (props.isEps ? props.theme.sport.colors.table.detail.higherRate.background : '#ffffff')};
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    /* border-top: 1px solid ${(props) => props.theme.sport.colors.secondary}; */
    border-bottom: 1px solid ${(props) => props.theme.sport.colors.background};
    box-shadow: ${(props) => (props.isDetail ? `none` : props.theme.sport.boxShadow)};
    margin-bottom: ${(props) => (props.isDetail ? `0` : `8px`)};
`

const SLeftColumn = styled.div<{ isCorner?: boolean }>`
    display: flex;
    align-items: center;
    padding: ${(props) => (props.isCorner ? '7px 15px 5px' : '8px 15px')};
`

const STitleColumn = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`

const SRightColumn = styled.div`
    display: flex;
    align-items: center;
`

const SHeaderTitle = styled.span<{ isEps?: boolean; isCorner?: boolean }>`
    color: ${(props) => (props.isEps ? '#ffffff' : props.theme.sport.colors.primary)};
    font-size: 14px;
    font-weight: 500;
    ${(props) => props.isCorner && `line-height: 13px;`}
`

const SCorner = styled.div`
    color: ${(props) => props.theme.sport.colors.accent};
    font-size: 12px;
    line-height: 12px;
`

const SExpandLayout = styled.div`
    width: 100%;
`

const SArrowUpIcon = styled(IconWrapper)<{ isOpen: boolean; isEps?: boolean }>`
    margin-top: 4px;
    margin-right: 10px;
    transform: rotate(180deg);

    svg {
        ${(props) =>
            props.isOpen &&
            css`
                transform: rotate(180deg);
            `}

        transition: transform 0.25s ease;

        path {
            fill: ${(props) => (props.isEps ? '#ffffff' : props.theme.sport.colors.primary)};
        }
    }
`

const ExpandableHeader: React.FC<ComponentProps> = ({
    title,
    defaultShow = true,
    children,
    rightSide,
    isDetail,
    isEps,
    isCorner,
    cornerScore,
    onClick = () => {},
}) => {
    const [isOpen, setOpen] = useState(defaultShow)
    const { t } = useTranslation()

    const toggleHeader = () => {
        setOpen(!isOpen)
        onClick()
    }

    return (
        <>
            <STableTitleContainer isDetail={isDetail} onClick={toggleHeader} isEps={isEps}>
                <SLeftColumn isCorner={isCorner}>
                    <SArrowUpIcon size={13} isOpen={isOpen} isEps={isEps}>
                        <ArrowUpIcon />
                    </SArrowUpIcon>
                    <STitleColumn>
                        <SHeaderTitle isEps={isEps} isCorner={isCorner}>
                            {title}
                        </SHeaderTitle>
                        {isCorner && (
                            <SCorner>
                                {t(`table.subheader.currentTotal`)} {cornerScore}{' '}
                            </SCorner>
                        )}
                    </STitleColumn>
                </SLeftColumn>
                <SRightColumn>{rightSide}</SRightColumn>
            </STableTitleContainer>
            <SExpandLayout>{isOpen && children}</SExpandLayout>
        </>
    )
}

export default memo(ExpandableHeader)
