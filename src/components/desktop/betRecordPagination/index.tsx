import React from 'react'
import styled from 'styled-components/macro'

import MoreIcon from '@brand/assets/images/betRecordPagination/slots-more.png'
import { usePagination, usePaginationButton } from './hook'
import bgImg from '@mixins/backgroundImg'

export interface IPagination {
    currentPage: number
    totalPage: number
    onChange: (page: number) => void
}

export interface IPaginationButton {
    onChange: (page: number) => void
    index: number
    currentPage: number
    totalPage: number
}

interface IPaginationItem {
    active?: boolean
    onClick: () => void
}

const SPaginationContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

const SPaginationItem = styled.button<IPaginationItem>`
    min-width: 32px;
    min-height: 32px;
    font-size: 16px;
    color: ${(props) =>
        props.active
            ? props.theme.colors.component.desktop.betRecordPagination.activeColor
            : props.theme.colors.component.desktop.betRecordPagination.color};
    background-color: ${(props) =>
        props.active
            ? props.theme.colors.component.desktop.betRecordPagination.activeBgColor
            : props.theme.colors.component.desktop.betRecordPagination.bgColor};
    margin-right: 8px;
    border: solid 1px transparent;
    border-radius: ${(props) => props.theme.vars.desktopPaginationBorderRadius};

    :not(:first-child):not(:last-child) {
        border-color: ${(props) =>
        props.active
            ? props.theme.colors.component.desktop.betRecordPagination.activeBorderColor
            : props.theme.colors.component.desktop.betRecordPagination.borderColor};
    }

    padding: 0;
    cursor: pointer;
`

const SMoreIcon = styled.div`
    width: 20px;
    height: 4px;
    margin: 0 auto;
    ${bgImg(MoreIcon)}
`

const PaginationButton: React.FC<IPaginationButton> = ({ onChange, index, currentPage, totalPage }) => {
    const { showButton, isPrevButton, isNextButton, onButtonClick } = usePaginationButton({
        onChange,
        index,
        currentPage,
        totalPage,
    })

    return showButton || isPrevButton || isNextButton ? (
        <SPaginationItem active={index + 1 === currentPage} onClick={onButtonClick}>
            {!showButton && (isNextButton || isPrevButton) ? <SMoreIcon /> : index + 1}
        </SPaginationItem>
    ) : null
}

const Pagination: React.FC<IPagination> = ({ currentPage, totalPage, onChange }) => {
    const { prevPage, nextPage } = usePagination({ currentPage, totalPage, onChange })

    return totalPage > 1 ? (
        <SPaginationContainer>
            {currentPage > 1 && <SPaginationItem onClick={prevPage}>上一页</SPaginationItem>}
            {Array(totalPage)
                .fill('')
                .map((_, i) => (
                    <PaginationButton
                        key={`app-pagination-${i}`}
                        currentPage={currentPage}
                        onChange={onChange}
                        index={i}
                        totalPage={totalPage}
                    />
                ))}
            {currentPage < totalPage && <SPaginationItem onClick={nextPage}>下一页</SPaginationItem>}
        </SPaginationContainer>
    ) : null
}

export default Pagination
