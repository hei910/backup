import React from 'react'
import styled from 'styled-components/macro'

import ArrowLeftIcon from '@brand/assets/images/pagination/slots-left.png'
import ArrowRightIcon from '@brand/assets/images/pagination/slots-right.png'
import MoreIcon from '@brand/assets/images/pagination/slots-more.png'
import { usePagination, usePaginationButton } from './hook'
import bgImg from '@mixins/backgroundImg'
import Form from '@components/common/form'
import useTranslation from '@hooks/useTranslation'

export interface IPagination {
    currentPage: number
    totalPage: number
    onChange: (page: number) => void
    withInput?: boolean
}

export interface IPaginationButton {
    onChange: (page: number) => void
    index: number
    currentPage: number
    totalPage: number
}

interface IPaginationItem {
    active?: boolean
    onClick?: () => void
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
            ? props.theme.colors.component.desktop.pagination.activeColor
            : props.theme.colors.component.desktop.pagination.color};
    background-color: ${(props) =>
        props.active
            ? props.theme.colors.component.desktop.pagination.activeBgColor
            : props.theme.colors.component.desktop.pagination.bgColor};
    margin-right: 8px;
    border: solid 1px;
    border-radius: ${(props) => props.theme.vars.desktopPaginationBorderRadius};
    border-color: ${(props) =>
        props.active
            ? props.theme.colors.component.desktop.pagination.activeBorderColor
            : props.theme.colors.component.desktop.pagination.borderColor};
    padding: 0;
    cursor: pointer;
`

const SPrevIcon = styled.div`
    width: 6px;
    height: 12px;
    margin: 0 auto;
    ${bgImg(ArrowLeftIcon)}
`
const SNextIcon = styled.div`
    width: 6px;
    height: 12px;
    margin: 0 auto;
    ${bgImg(ArrowRightIcon)}
`
const SMoreIcon = styled.div`
    width: 20px;
    height: 4px;
    margin: 0 auto;
    ${bgImg(MoreIcon)}
`

const SInput = styled.input`
    width: 52px;
    border: none;
    background: transparent;
    padding: 0 10px;
    text-align: center;
    color: ${(props) => props.theme.colors.component.desktop.pagination.color};
    cursor: pointer;
`

const SPageUnit = styled.div`
    color: ${(props) => props.theme.colors.component.desktop.pagination.color};
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

const Pagination: React.FC<IPagination> = ({ currentPage, totalPage, onChange, withInput }) => {
    const t = useTranslation()
    const { inputPage, setInputPage, onInputPageSubmit, prevPage, nextPage } = usePagination({
        currentPage,
        totalPage,
        onChange,
    })

    return totalPage > 1 ? (
        <SPaginationContainer>
            {currentPage > 1 && (
                <SPaginationItem onClick={prevPage}>
                    <SPrevIcon />
                </SPaginationItem>
            )}
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
            {currentPage < totalPage && (
                <SPaginationItem onClick={nextPage}>
                    <SNextIcon />
                </SPaginationItem>
            )}
            {withInput && (
                <>
                    <SPaginationItem onClick={() => setInputPage(0)}>
                        <Form onSubmit={(_) => onInputPageSubmit()}>
                            <SInput
                                value={inputPage || ''}
                                onChange={(e) => setInputPage(+e.target.value)}
                                onBlur={() => setInputPage(currentPage)}
                            />
                        </Form>
                    </SPaginationItem>
                    <SPageUnit>{t('general.pageUnit')}</SPageUnit>
                </>
            )}
        </SPaginationContainer>
    ) : null
}

export default Pagination
